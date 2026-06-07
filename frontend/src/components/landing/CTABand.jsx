import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTABand = () => (
  <section className="py-16 md:pt-20 md:pb-[100px]">
    <div className="mx-auto px-6 md:px-8" style={{ maxWidth: '1200px' }}>
      <motion.div
        className="rounded-3xl px-8 py-16 md:px-16 md:py-24 text-center relative overflow-hidden"
        style={{ background: '#09090b' }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute top-[-60px] left-[-40px] w-[220px] h-[220px] rounded-full pointer-events-none" style={{ background: '#1a1a1e' }} />
        <div className="absolute bottom-[-60px] right-[10%] w-[120px] h-[120px] rounded-full pointer-events-none" style={{ background: '#141416' }} />
        <div className="absolute top-[30%] right-[12%] w-[80px] h-[80px] rounded-full pointer-events-none" style={{ background: '#141416' }} />

        <div className="relative z-10">
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#666', marginBottom: '24px' }}>
            Get Started
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, letterSpacing: '-1px', lineHeight: 1.2, color: '#fff', maxWidth: '500px', margin: '0 auto 16px' }}>
            Stop guessing. Start dispatching orders with data.
          </h2>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '28px' }}>
            Free tier available. No credit card required.
          </p>
          <Link to="/signup">
            <button className="px-7 py-3 rounded-[10px] cursor-pointer"
              style={{ background: '#fff', border: 'none', color: '#111', fontSize: '14px', fontWeight: 500 }}>
              Start for free
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABand;
