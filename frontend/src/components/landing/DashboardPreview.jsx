import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Products', value: '284' },
  { label: 'Active Suppliers', value: '18' },
  { label: 'Low Stock', value: '7', color: '#f59e0b' },
  { label: 'Pending Orders', value: '3' },
];

const barData = [42, 58, 35, 72, 48, 65, 82, 55, 90, 68, 75, 45, 60, 78, 52, 88, 62, 95, 70, 85, 60, 78, 92, 65, 80, 72, 88, 58, 94, 76];

const liveFeed = [
  { name: 'Basmati Rice 25kg', qty: '142 units', status: '✓ In Stock', color: '#10b981' },
  { name: 'Sunflower Oil 15L', qty: '18 units', status: '▲ Reorder Soon', color: '#f59e0b' },
  { name: 'Wheat Flour 50kg', qty: '4 units', status: '✕ Critical', color: '#ef4444' },
];

const DashboardPreview = () => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div className="ml-3" style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>
          dashboard.jsx
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-6" style={{ background: '#111' }}>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {stats.map(s => (
            <div key={s.label} className="p-4 rounded-lg" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
              <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#888', marginBottom: '4px' }}>
                {s.label}
              </p>
              <p style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.5px', color: s.color || '#f5f5f5' }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart label */}
        <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#888', marginBottom: '8px' }}>
          Stock Trend — Last 30 Days
        </p>

        {/* Bar chart */}
        <div className="flex items-end gap-[2px] mb-6" style={{ height: '100px' }}>
          {barData.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[1px]"
              style={{ background: 'rgba(255,255,255,0.4)' }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.015, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Live Feed */}
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '16px' }}>
          <p style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>
            LIVE FEED
          </p>
          <motion.div
            className="flex flex-col gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
            }}
          >
            {liveFeed.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  <span style={{ fontSize: '11px', color: '#e5e5e5', fontFamily: 'var(--font-mono)' }}>{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>{item.qty}</span>
                  <span style={{ fontSize: '11px', color: item.color, fontFamily: 'var(--font-mono)' }}>{item.status}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
