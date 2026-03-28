import styles from './Hero.module.css'

const STATS = [
  { value: '50K+',  label: 'Active Students'  },
  { value: '30+',   label: 'Languages'         },
  { value: '4.9★',  label: 'Average Rating'    },
  { value: '95%',   label: 'Success Rate'      },
]

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Now with AI conversation practice
        </div>

        <h1 className={styles.headline}>
          Speak a New Language<br />
          <span className={styles.gradient}>With Confidence</span>
        </h1>

        <p className={styles.sub}>
          Live tutors, AI-powered drills, and a global community — everything you need
          to go from zero to fluent in record time. 30+ languages, any level.
        </p>

        <div className={styles.ctas}>
          <a href="#pricing" className={styles.btnPrimary}>
            Start Learning Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#features" className={styles.btnGhost}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 6l5 3-5 3V6z" fill="currentColor"/>
            </svg>
            See how it works
          </a>
        </div>

        <div className={styles.statsBar}>
          {STATS.map(({ value, label }) => (
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
