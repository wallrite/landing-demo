import { useTranslation } from '../../context/LanguageContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useTranslation()
  const { badge, headline, gradient, sub, ctaPrimary, ctaGhost, stats } = t.hero

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {badge}
        </div>

        <h1 className={styles.headline}>
          {headline}<br />
          <span className={styles.gradient}>{gradient}</span>
        </h1>

        <p className={styles.sub}>{sub}</p>

        <div className={styles.ctas}>
          <a href="#pricing" className={styles.btnPrimary}>
            {ctaPrimary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#features" className={styles.btnGhost}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 6l5 3-5 3V6z" fill="currentColor"/>
            </svg>
            {ctaGhost}
          </a>
        </div>

        <div className={styles.statsBar}>
          {stats.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
