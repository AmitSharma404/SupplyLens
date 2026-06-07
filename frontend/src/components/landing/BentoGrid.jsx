import { motion } from 'framer-motion';

/* Mini inventory table inside card */
const InventoryPreview = () => {
  const rows = [
    { product: 'Basmati Rice', category: 'Grains', stock: 72, color: '#22c55e', status: 'In Stock', statusColor: '#166534', statusBg: '#f0fdf4' },
    { product: 'Sunflower Oil', category: 'Oils', stock: 35, color: '#f59e0b', status: 'Reorder Soon', statusColor: '#92400e', statusBg: '#fffbeb' },
    { product: 'Wheat Flour', category: 'Grains', stock: 12, color: '#ef4444', status: 'Critical', statusColor: '#991b1b', statusBg: '#fef2f2' },
    { product: 'Turmeric', category: 'Spices', stock: 68, color: '#22c55e', status: 'In Stock', statusColor: '#166534', statusBg: '#f0fdf4' },
  ];

  return (
    <div className="mt-5 overflow-x-auto hide-scrollbar">
      <div className="min-w-[380px]">
        <div className="grid grid-cols-4 gap-2 mb-2 px-1">
          {['Product', 'Category', 'Stock', 'Status'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#999' }}>{h}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <motion.div key={r.product} className="grid grid-cols-4 gap-2 items-center py-2.5 px-1"
            style={{ borderTop: '1px solid #f5f5f5' }}
            initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111' }}>{r.product}</span>
            <span style={{ fontSize: '12px', color: '#888' }}>{r.category}</span>
            <div className="flex items-center gap-2">
              <div className="w-full h-[5px] rounded-full overflow-hidden" style={{ background: '#f0f0f0', maxWidth: '100px' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: r.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.stock}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                />
              </div>
            </div>
            <span className="inline-flex px-2 py-0.5 rounded" style={{ fontSize: '10px', fontWeight: 500, color: r.statusColor, background: r.statusBg, width: 'fit-content' }}>
              {r.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* Mini supplier cards */
const SupplierPreview = () => {
  const suppliers = [
    { name: 'Agarwal Foods', score: 96, color: '#22c55e' },
    { name: 'Patel Traders', score: 84, color: '#f59e0b' },
    { name: 'Spice Bazaar', score: 91, color: '#22c55e' },
    { name: 'FreshGoods Co', score: 68, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 mt-5">
      {suppliers.map((s, i) => (
        <motion.div key={s.name} className="p-3 rounded-lg" style={{ border: '1px solid #f0f0f0' }}
          initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.3 }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{s.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span style={{ fontSize: '22px', fontWeight: 700, color: s.color }}>{s.score}%</span>
            <span style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.3px' }}>accuracy</span>
          </div>
          <div className="w-full h-[3px] rounded-full mt-2" style={{ background: '#f0f0f0' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: s.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const BentoGrid = () => {
  return (
    <section id="features" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="mx-auto px-8" style={{ maxWidth: '1200px' }}>
        <motion.div className="mb-16"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#999', marginBottom: '12px' }}>Features</p>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.15, color: '#111' }}>
            Everything you need to run
            <br />
            inventory <span style={{ color: '#a3a3a3' }}>with confidence.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Inventory card */}
          <motion.div className="p-8 rounded-3xl" style={{ border: '1px solid #e5e5e5', background: '#fff' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4d4d4'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.boxShadow = 'none'; }}>
            <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>Inventory</p>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginTop: '6px', letterSpacing: '-0.3px' }}>Real-time inventory tracking</h3>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px', lineHeight: 1.5 }}>Watch stock levels move live across every SKU and warehouse.</p>
            <InventoryPreview />
          </motion.div>

          {/* Suppliers card */}
          <motion.div className="p-8 rounded-3xl" style={{ border: '1px solid #e5e5e5', background: '#fff' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4d4d4'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.boxShadow = 'none'; }}>
            <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>Suppliers</p>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginTop: '6px', letterSpacing: '-0.3px' }}>Multi-supplier management</h3>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px', lineHeight: 1.5 }}>Score every supplier on accuracy, lead time, and reliability.</p>
            <SupplierPreview />
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* Automation card */}
          <motion.div className="p-8 rounded-3xl" style={{ border: '1px solid #e5e5e5', background: '#fff' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4d4d4'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.boxShadow = 'none'; }}>
            <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>Automation</p>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginTop: '6px', letterSpacing: '-0.3px' }}>Smart reorder suggestions</h3>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px', lineHeight: 1.5 }}>System-generated reorder points with built-in safety buffers.</p>
            
            <div className="mt-8 flex flex-col gap-5">
              <div>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '12px', color: '#888' }}>Trigger</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#f59e0b' }}>70%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#f0f0f0' }}>
                  <motion.div className="h-full rounded-full" style={{ width: '70%', background: '#f59e0b' }}
                    initial={{ width: 0 }} whileInView={{ width: '70%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '12px', color: '#888' }}>Reorder Point</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>85%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#f0f0f0' }}>
                  <motion.div className="h-full rounded-full" style={{ width: '85%', background: '#22c55e' }}
                    initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '12px', color: '#888' }}>Safety Buffer</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>95%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#f0f0f0' }}>
                  <motion.div className="h-full rounded-full" style={{ width: '95%', background: '#2563eb' }}
                    initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forecasting card */}
          <motion.div className="p-8 rounded-3xl" style={{ border: '1px solid #e5e5e5', background: '#fff' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4d4d4'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.boxShadow = 'none'; }}>
            <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>Forecasting</p>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginTop: '6px', letterSpacing: '-0.3px' }}>Demand forecasting</h3>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px', lineHeight: 1.5 }}>Predict next-quarter demand with exponential smoothing and moving averages.</p>
            
            <div className="mt-8 relative h-[140px]">
              {/* Fake line chart using SVG */}
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <motion.path 
                  d="M0,80 L20,70 L40,85 L60,60 L80,50 L100,70 L120,55 L140,45 L160,35" 
                  fill="none" stroke="#111" strokeWidth="2" 
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                />
                <motion.path 
                  d="M160,35 L180,20 L200,25 L220,10 L240,0" 
                  fill="none" stroke="#888" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
                />
              </svg>
              {/* Axis lines */}
              <div className="absolute bottom-0 w-full border-t border-dashed border-[#e5e5e5]" />
              <div className="absolute bottom-1/2 w-full border-t border-dashed border-[#e5e5e5]" />
              
              <div className="absolute -bottom-8 left-0 flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#111]" />
                  <span style={{ fontSize: '10px', color: '#888' }}>Historical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-[#888] border-dashed border-t border-[#888]" style={{ background: 'transparent' }} />
                  <span style={{ fontSize: '10px', color: '#888' }}>Forecast</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
