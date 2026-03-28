import { useReveal } from '../../hooks/useReveal'
import languages from '../../data/languages'
import styles from './Languages.module.css'

export default function Languages() {
  const ref = useReveal()

  return (
    <section id="languages" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>4 Languages</span>
          <h2 className={styles.title}>Find Your Language</h2>
          <p className={styles.desc}>
            English, Spanish, German, and Ukrainian — taught by certified native speakers
            with curricula built for every level from A1 to C2.
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

      </div>
    </section>
  )
}
