import { useReveal } from '../../hooks/useReveal'
import { useTranslation } from '../../context/LanguageContext'
import testimonialsData from '../../data/testimonials'
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
  const { t } = useTranslation()
  const { eyebrow, title, desc, items } = t.testimonials

  return (
    <section id="testimonials" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>{desc}</p>
        </div>

        <div className={styles.masonry}>
          {testimonialsData.map((item, i) => {
            const tt = items[i]
            return (
              <article
                key={item.id}
                className={`${styles.card} reveal reveal-delay-${(i % 3) + 1}`}
              >
                <Stars rating={item.rating} />
                <blockquote className={styles.quote}>"{tt.quote}"</blockquote>
                <div className={styles.author}>
                  <div
                    className={styles.avatar}
                    style={{ background: item.color }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{item.name}</p>
                    <p className={styles.authorMeta}>{tt.language} · {tt.location}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
