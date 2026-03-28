#!/usr/bin/env python3
"""
LinguaFlow landing page deployment helper.

Builds the Vite project and deploys the dist/ folder to the gh-pages branch,
or triggers the GitHub Actions deploy workflow via API dispatch.

Usage:
    python3 deploy.py                 # build + push dist/ to gh-pages branch
    python3 deploy.py --preview       # build + run local preview server
    python3 deploy.py --trigger       # trigger workflow_dispatch via GitHub API
    python3 deploy.py --build-only    # build without deploying
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import urllib.error
import json
from pathlib import Path

ROOT = Path(__file__).parent.resolve()
DIST = ROOT / "dist"


def run(cmd: list[str], **kwargs) -> subprocess.CompletedProcess:
    """Run a command, streaming output. Exit on failure."""
    print(f"\n$ {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=ROOT, **kwargs)
    if result.returncode != 0:
        print(f"\nError: command failed with exit code {result.returncode}", file=sys.stderr)
        sys.exit(result.returncode)
    return result


def check_prerequisites():
    if not shutil.which("npm"):
        print("Error: npm not found. Install Node.js from https://nodejs.org/", file=sys.stderr)
        sys.exit(1)
    if not shutil.which("git"):
        print("Error: git not found.", file=sys.stderr)
        sys.exit(1)


def install_deps():
    if not (ROOT / "node_modules").exists():
        print("node_modules/ not found, running npm ci...")
        run(["npm", "ci"])
    else:
        print("node_modules/ found, skipping install.")


def build():
    print("\n--- Building production bundle ---")
    run(["npm", "run", "build"])
    print(f"\nBuild complete: {DIST}")


def preview():
    print("\n--- Starting preview server ---")
    print("Press Ctrl+C to stop.")
    try:
        subprocess.run(["npm", "run", "preview"], cwd=ROOT)
    except KeyboardInterrupt:
        pass


def get_remote_url() -> str:
    result = subprocess.run(
        ["git", "remote", "get-url", "origin"],
        cwd=ROOT, capture_output=True, text=True
    )
    if result.returncode != 0:
        print("Error: no git remote 'origin' found.", file=sys.stderr)
        sys.exit(1)
    return result.stdout.strip()


def deploy_to_gh_pages():
    """Copy dist/ into a gh-pages worktree and push."""
    print("\n--- Deploying to gh-pages branch ---")

    remote_url = get_remote_url()

    # Check if gh-pages branch exists on remote
    check = subprocess.run(
        ["git", "ls-remote", "--heads", "origin", "gh-pages"],
        cwd=ROOT, capture_output=True, text=True
    )
    branch_exists = bool(check.stdout.strip())

    with tempfile.TemporaryDirectory(prefix="linguaflow-deploy-") as tmpdir:
        worktree_path = Path(tmpdir) / "gh-pages"

        if branch_exists:
            # Check out existing gh-pages branch into a temporary worktree
            run(["git", "worktree", "add", str(worktree_path), "gh-pages"])
        else:
            # Create orphan branch in a temporary worktree
            run(["git", "worktree", "add", "--orphan", "-b", "gh-pages", str(worktree_path)])

        try:
            # Clear the worktree content (keep .git)
            for item in worktree_path.iterdir():
                if item.name == ".git":
                    continue
                if item.is_dir():
                    shutil.rmtree(item)
                else:
                    item.unlink()

            # Copy dist/ contents into the worktree
            for item in DIST.iterdir():
                dest = worktree_path / item.name
                if item.is_dir():
                    shutil.copytree(item, dest)
                else:
                    shutil.copy2(item, dest)

            # Add a .nojekyll file so GitHub Pages doesn't process the files
            (worktree_path / ".nojekyll").touch()

            # Commit and push
            run(["git", "add", "-A"], cwd=str(worktree_path))

            commit_result = subprocess.run(
                ["git", "diff", "--cached", "--quiet"],
                cwd=str(worktree_path)
            )
            if commit_result.returncode == 0:
                print("\nNo changes to deploy.")
            else:
                run(
                    ["git", "commit", "-m", "deploy: update landing page"],
                    cwd=str(worktree_path)
                )
                run(["git", "push", "origin", "gh-pages"], cwd=str(worktree_path))
                print("\nDeployed successfully to gh-pages branch.")
                print("Visit: Settings > Pages > Source > Deploy from branch > gh-pages")

        finally:
            # Always remove the worktree
            subprocess.run(
                ["git", "worktree", "remove", "--force", str(worktree_path)],
                cwd=ROOT, capture_output=True
            )


def trigger_workflow():
    """Trigger the GitHub Actions deploy workflow via API."""
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("Error: GITHUB_TOKEN environment variable not set.", file=sys.stderr)
        sys.exit(1)

    remote_url = get_remote_url()

    # Parse owner/repo from remote URL
    # Supports: https://github.com/owner/repo.git  and  git@github.com:owner/repo.git
    import re
    match = re.search(r"github\.com[:/](.+?/[^/]+?)(?:\.git)?$", remote_url)
    if not match:
        print(f"Error: could not parse GitHub owner/repo from remote URL: {remote_url}", file=sys.stderr)
        sys.exit(1)

    repo_path = match.group(1)
    api_url = f"https://api.github.com/repos/{repo_path}/actions/workflows/deploy.yml/dispatches"

    payload = json.dumps({"ref": "main"}).encode()
    req = urllib.request.Request(
        api_url,
        data=payload,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            print(f"\nWorkflow triggered (HTTP {resp.status}).")
            print(f"Check progress at: https://github.com/{repo_path}/actions")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"Error: GitHub API returned {e.code}: {body}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="LinguaFlow deployment helper")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--preview",    action="store_true", help="Build and run local preview")
    group.add_argument("--trigger",    action="store_true", help="Trigger GitHub Actions workflow")
    group.add_argument("--build-only", action="store_true", help="Build without deploying")
    args = parser.parse_args()

    check_prerequisites()
    install_deps()

    if args.preview:
        build()
        preview()
    elif args.trigger:
        trigger_workflow()
    elif args.build_only:
        build()
    else:
        build()
        deploy_to_gh_pages()


if __name__ == "__main__":
    main()
