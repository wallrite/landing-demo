import { useState, useEffect } from 'react'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { useTranslation } from '../../context/LanguageContext'
import styles from './Navbar.module.css'

const SECTION_IDS = ['features', 'languages', 'pricing', 'testimonials']

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'uk', flag: '🇺🇦', label: 'UK' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)
  const { lang, setLang, t } = useTranslation()

  const NAV_LINKS = [
    { label: t.nav.features,     href: '#features'     },
    { label: t.nav.languages,    href: '#languages'    },
    { label: t.nav.pricing,      href: '#pricing'      },
    { label: t.nav.testimonials, href: '#testimonials' },
  ]

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
          <li className={styles.mobileLangSwitcher}>
            {LANGS.map(({ code, flag, label }) => (
              <button
                key={code}
                className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`}
                onClick={() => { setLang(code); setMenuOpen(false) }}
                aria-label={`Switch language to ${label}`}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </button>
            ))}
          </li>
        </ul>

        <div className={styles.langSwitcher} aria-label="Language selector">
          {LANGS.map(({ code, flag, label }) => (
            <button
              key={code}
              className={`${styles.langBtn} ${lang === code ? styles.langBtnActive : ''}`}
              onClick={() => setLang(code)}
              aria-label={`Switch language to ${label}`}
              aria-pressed={lang === code}
            >
              <span>{flag}</span>
              <span className={styles.langLabel}>{label}</span>
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <a href="#pricing" className={styles.btnOutline}>{t.nav.signIn}</a>
          <a href="#pricing" className={styles.btnPrimary}>{t.nav.startFree}</a>
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
