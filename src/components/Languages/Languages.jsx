import { useReveal } from '../../hooks/useReveal'
import languages from '../../data/languages'
import styles from './Languages.module.css'

export default function Languages() {
  const ref = useReveal()

  return (
    <section id="languages" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>30+ Languages</span>
          <h2 className={styles.title}>Find Your Language</h2>
          <p className={styles.desc}>
            From the world's most spoken languages to niche gems — our expert tutors
            and curated curricula cover them all.
          </p>
        </div>

        <div className={styles.grid}>
          {languages.map((lang, i) => (
            <article
              key={lang.id}
              className={`${styles.card} reveal reveal-delay-${(i % 4) + 1}`}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <div className={styles.info}>
                <h3 className={styles.langName}>{lang.name}</h3>
                <p className={styles.langMeta}>{lang.students} students · {lang.levels} levels</p>
              </div>
              <a href="#pricing" className={styles.startLink}>
                Start →
              </a>
            </article>
          ))}
        </div>

        <p className={`${styles.more} reveal`}>
          Plus 20+ more languages including Hindi, Turkish, Dutch, Polish, Swedish, and Vietnamese.
          <a href="#pricing"> Browse all →</a>
        </p>
      </div>
    </section>
  )
}
