import { useReveal } from '../../hooks/useReveal'
import { useTranslation } from '../../context/LanguageContext'
import languages from '../../data/languages'
import styles from './Languages.module.css'

export default function Languages() {
  const ref = useReveal()
  const { t } = useTranslation()
  const { eyebrow, title, desc, students, levels, startLink, names } = t.languages

  return (
    <section id="languages" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>{desc}</p>
        </div>

        <div className={styles.grid}>
          {languages.map((lang, i) => (
            <article
              key={lang.id}
              className={`${styles.card} reveal reveal-delay-${(i % 4) + 1}`}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <div className={styles.info}>
                <h3 className={styles.langName}>{names[lang.id]}</h3>
                <p className={styles.langMeta}>{lang.students} {students} · {lang.levels} {levels}</p>
              </div>
              <a href="#pricing" className={styles.startLink}>
                {startLink}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
