import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import pricingData from '../../data/pricing'
import styles from './Pricing.module.css'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.12"/>
      <path d="M4.5 8l2.5 2.5L11.5 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const ref = useReveal()

  const price = (p) => {
    if (p.monthlyPrice === 0) return 'Free'
    const amt = annual ? Math.round(p.monthlyPrice * 0.8) : p.monthlyPrice
    return `$${amt}`
  }

  return (
    <section id="pricing" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2 className={styles.title}>Simple, Transparent Pricing</h2>
          <p className={styles.desc}>
            No hidden fees. Cancel anytime. Start free — upgrade when you're ready.
          </p>

          <div className={styles.toggle}>
            <span className={!annual ? styles.toggleLabelActive : styles.toggleLabel}>Monthly</span>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.toggleBtnOn : ''}`}
              onClick={() => setAnnual(a => !a)}
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
            >
              <span className={styles.toggleThumb} />
            </button>
            <span className={annual ? styles.toggleLabelActive : styles.toggleLabel}>
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {pricingData.map((plan, i) => (
            <article
              key={plan.id}
              className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''} reveal reveal-delay-${i + 1}`}
            >
              {plan.highlighted && (
                <span className={styles.popularBadge}>Most Popular</span>
              )}

              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.tier}</h3>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceAmount}>{price(plan)}</span>
                {plan.monthlyPrice > 0 && (
                  <span className={styles.pricePeriod}>/month</span>
                )}
              </div>

              {annual && plan.monthlyPrice > 0 && (
                <p className={styles.billedAnnually}>
                  Billed annually (${Math.round(plan.monthlyPrice * 0.8 * 12)}/yr)
                </p>
              )}

              <ul className={styles.featureList}>
                {plan.features.map(f => (
                  <li key={f} className={styles.featureItem}>
                    <span className={plan.highlighted ? styles.checkHighlighted : styles.check}>
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={plan.highlighted ? styles.ctaPrimary : styles.ctaOutline}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className={`${styles.guarantee} reveal`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1.5L2 4v4c0 3.3 2.7 6.4 6 7 3.3-.6 6-3.7 6-7V4L8 1.5z" fill="#059669" fillOpacity="0.15" stroke="#059669" strokeWidth="1.25"/>
            <path d="M5.5 8l1.75 1.75L10.5 6.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          30-day money-back guarantee · No credit card required for free plan
        </p>
      </div>
    </section>
  )
}
