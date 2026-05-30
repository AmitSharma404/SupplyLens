import { motion } from 'framer-motion';

const steps = [
  { num: '1', title: 'Sign up', desc: 'Create your account and set up your business profile.' },
  { num: '2', title: 'Add inventory & suppliers', desc: 'Import or enter products, suppliers, and stock levels.' },
  { num: '3', title: 'Monitor in real time', desc: 'Track stock, supplier performance, and receive automated alerts.' },
  { num: '4', title: 'Forecast & reorder', desc: 'View demand predictions and approve generated reorders.' },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="mx-auto px-8" style={{ maxWidth: '1200px' }}>
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#999', marginBottom: '12px' }}>How it works</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: 1.15, color: '#111', maxWidth: '440px' }}>
            From signup to forecast in under two minutes.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-4"
                style={{ border: '1px solid #e5e5e5', fontSize: '16px', fontWeight: 600, color: '#111' }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.55, color: '#64748b' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
