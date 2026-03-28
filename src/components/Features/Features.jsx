import { useReveal } from '../../hooks/useReveal'
import features from '../../data/features'
import styles from './Features.module.css'

const ICONS = {
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="13" height="10" rx="2"/>
      <path d="M15 9l6-3v12l-6-3V9z"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1 1 7.9V20a2 2 0 0 1-4 0v-.1A4 4 0 0 1 8 16a4 4 0 0 1-2-7.46A4 4 0 0 1 12 2z"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  certificate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <path d="M12 18h.01"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
}

export default function Features() {
  const ref = useReveal()

  return (
    <section id="features" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Why LinguaFlow</span>
          <h2 className={styles.title}>Everything You Need to Become Fluent</h2>
          <p className={styles.desc}>
            We combine the best of human teaching with cutting-edge technology so
            learning a language actually sticks — and stays fun.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <article
              key={f.id}
              className={`${styles.card} reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className={styles.iconWrap}>
                {ICONS[f.icon]}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
