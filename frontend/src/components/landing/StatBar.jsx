import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const stats = [
  { value: 500, suffix: '+', label: 'SMEs onboarded' },
  { value: 98, suffix: '%', label: 'Forecast accuracy' },
  { value: 3, suffix: 'x', label: 'Faster reorder decisions' },
  { value: 2, prefix: '<', suffix: ' min', label: 'Setup time' },
];

const StatItem = ({ value, suffix = '', prefix = '', label, index }) => {
  const { ref, displayValue } = useAnimatedCounter(value, { duration: 1.2, prefix, suffix });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ ...(index !== 0 && { borderLeft: '1px solid #e5e5e5', paddingLeft: '24px' }) }}>
      <p style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 500, letterSpacing: '-2px', color: '#111' }}>{displayValue}</p>
      <p style={{ fontSize: '14px', color: '#999', marginTop: '2px' }}>{label}</p>
    </motion.div>
  );
};

const StatBar = () => (
  <section style={{ paddingTop: '60px', paddingBottom: '60px', borderBottom: '1px solid #f0f0f0' }}>
    <div className="mx-auto px-8" style={{ maxWidth: '1200px' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
      </div>
    </div>
  </section>
);

export default StatBar;
