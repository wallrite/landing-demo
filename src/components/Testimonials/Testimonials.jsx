import { useReveal } from '../../hooks/useReveal'
import testimonials from '../../data/testimonials'
import styles from './Testimonials.module.css'

function Stars({ rating }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < rating ? '#FBBF24' : '#E2E8F0'} aria-hidden="true">
          <path d="M7 1l1.5 4H13l-3.5 2.5L11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useReveal()

  return (
    <section id="testimonials" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Student Stories</span>
          <h2 className={styles.title}>Real People, Real Results</h2>
          <p className={styles.desc}>
            Thousands of learners have transformed their lives through language. Here's what they say.
          </p>
        </div>

        <div className={styles.masonry}>
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className={`${styles.card} reveal reveal-delay-${(i % 3) + 1}`}
            >
              <Stars rating={t.rating} />
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{t.name}</p>
                  <p className={styles.authorMeta}>{t.language} · {t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
