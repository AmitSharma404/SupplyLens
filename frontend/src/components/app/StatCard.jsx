import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const StatCard = ({ label, value, suffix = '', prefix = '', decimals = 0, accentBorder, icon: Icon }) => {
  const { ref, displayValue } = useAnimatedCounter(value, { duration: 1.5, decimals, prefix, suffix });

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-[16px] transition-all duration-200"
      style={{
        background: 'var(--app-surface)',
        border: '1px solid var(--app-border)',
        borderLeftWidth: accentBorder ? '3px' : '1px',
        borderLeftColor: accentBorder || 'var(--app-border)',
        ...(accentBorder ? { boxShadow: `0 0 16px ${accentBorder}33` } : {}),
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3, borderColor: 'var(--app-border-hover)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {label}
        </p>
        {Icon && <Icon size={16} style={{ color: 'var(--app-text-muted)' }} />}
      </div>
      <p style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-1px', color: 'var(--app-text)' }}>
        {displayValue}
      </p>
    </motion.div>
  );
};

export default StatCard;
