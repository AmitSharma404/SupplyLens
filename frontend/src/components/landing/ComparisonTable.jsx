import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const features = ['Real-time stock tracking', 'Supplier performance scoring', 'Demand forecasting', 'Automated reorder suggestions', 'SME-friendly pricing', 'Setup in < 1 day'];
const columns = ['SupplyLens', 'Spreadsheets', 'Basic Tools', 'ERP'];
const data = [
  [true, false, true, true],
  [true, false, false, true],
  [true, false, false, true],
  [true, false, false, true],
  [true, true, true, false],
  [true, true, true, false],
];

const ComparisonTable = () => (
  <section id="compare" className="py-16 md:py-[120px]">
    <div className="mx-auto px-6 md:px-8" style={{ maxWidth: '1200px' }}>
      <motion.div className="mb-10"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#999', marginBottom: '12px' }}>Why SupplyLens</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: 1.15, color: '#111' }}>
          Built for SMEs, priced for SMEs.
        </h2>
      </motion.div>

      <motion.div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e5e5e5' }}
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <th className="text-left py-4 px-6" style={{ fontSize: '13px', fontWeight: 500, color: '#999', width: '35%' }}>Feature</th>
                {columns.map((col, ci) => (
                  <th key={col} className="text-center py-4 px-6"
                    style={{ fontSize: '14px', fontWeight: ci === 0 ? 600 : 450, color: ci === 0 ? '#22c55e' : '#666', background: ci === 0 ? '#f0fdf4' : 'transparent' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, ri) => (
                <tr key={feat} style={{ borderBottom: ri < features.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <td className="py-4 px-6" style={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>{feat}</td>
                  {data[ri].map((v, ci) => (
                    <td key={ci} className="text-center py-4 px-6"
                      style={{ background: ci === 0 ? '#f0fdf4' : 'transparent' }}>
                      {v
                        ? <Check size={16} style={{ color: '#22c55e', display: 'inline' }} />
                        : <X size={16} style={{ color: '#ef4444', display: 'inline' }} />
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
