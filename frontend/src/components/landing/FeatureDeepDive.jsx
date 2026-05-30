import { motion } from 'framer-motion';

const sections = [
  {
    badge: 'Reliability',
    title: 'Automated reorder intelligence',
    desc: 'SupplyLens monitors stock velocity across products and automatically generates purchase order suggestions when inventory falls below configured thresholds. Safety stock buffers and supplier lead time are factored in — so your production line never stops.',
    points: ['Configurable reorder points', 'Supplier lead-time integration', 'Safety stock buffer calculation'],
    align: 'left',
  },
  {
    badge: 'Observability',
    title: 'Complete procurement visibility',
    desc: 'Track every purchase order from creation to delivery. The analytics dashboard surfaces delivery accuracy trends, consumption patterns, and cost breakdowns — giving your procurement team a single source of truth.',
    points: ['End-to-end order tracking', 'Delivery performance trends', 'Consumption pattern analysis'],
    align: 'right',
  },
];

const FeatureDeepDive = () => (
  <section style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}>
    <div className="container-max flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      {sections.map((s, si) => (
        <motion.div
          key={s.title}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${s.align === 'right' ? 'lg:direction-rtl' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ direction: 'ltr' }}
        >
          <div className={s.align === 'right' ? 'lg:order-2' : ''}>
            <span
              className="inline-block px-3 py-1 rounded-md mb-5"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent-text)', background: 'var(--accent-light)' }}
            >
              {s.badge}
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, letterSpacing: '-0.8px', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.2 }}>
              {s.title}
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {s.desc}
            </p>
            <ul className="flex flex-col gap-3">
              {s.points.map(p => (
                <li key={p} className="flex items-center gap-3" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="var(--accent-light)" />
                    <path d="M5 8l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual placeholder — elegant card */}
          <div className={s.align === 'right' ? 'lg:order-1' : ''}>
            <div
              className="rounded-2xl p-8 aspect-[4/3] flex items-center justify-center"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="w-full max-w-xs">
                {si === 0 ? (
                  /* Reorder flow */
                  <div className="flex flex-col gap-3">
                    {['Stock monitored', 'Threshold detected', 'Suggestion generated', 'Order confirmed'].map((step, i) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.3 }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: i === 3 ? 'var(--accent)' : 'var(--bg)', border: i === 3 ? 'none' : '1px solid var(--border)', fontSize: '11px', fontWeight: 600, color: i === 3 ? '#fff' : 'var(--text-tertiary)' }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: i === 3 ? 'var(--accent)' : 'var(--text-secondary)' }}>{step}</span>
                        {i === 3 && <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>✓</span>}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Order tracking */
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'ORD-041', status: 'Delivered', color: 'var(--green)' },
                      { id: 'ORD-040', status: 'Shipped', color: 'var(--blue)' },
                      { id: 'ORD-039', status: 'Shipped', color: 'var(--blue)' },
                      { id: 'ORD-038', status: 'Pending', color: 'var(--text-tertiary)' },
                    ].map((o, i) => (
                      <motion.div
                        key={o.id}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-lg"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--text)' }}>{o.id}</span>
                        <span
                          className="px-2 py-0.5 rounded-md"
                          style={{ fontSize: '11px', fontWeight: 500, color: o.color, background: `color-mix(in srgb, ${o.color} 10%, transparent)` }}
                        >
                          {o.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureDeepDive;
