import { useState, useEffect } from 'react'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'Languages',    href: '#languages'    },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Testimonials', href: '#testimonials' },
]

const SECTION_IDS = ['features', 'languages', 'pricing', 'testimonials']

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="14" fill="#4F46E5"/>
            <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>LinguaFlow</span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`${styles.link} ${activeId === href.slice(1) ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href="#pricing" className={styles.btnOutline}>Sign In</a>
          <a href="#pricing" className={styles.btnPrimary}>Start Free</a>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </nav>
    </header>
  )
}
