import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, suffix = '', prefix = '', decimals = 0, accentBorder, icon: Icon, link, trend }) => {
  const { ref, displayValue } = useAnimatedCounter(value, { duration: 1.5, decimals, prefix, suffix });

  const CardContent = (
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
      <div className="flex items-end justify-between">
        <p style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-1px', color: 'var(--app-text)' }}>
          {displayValue}
        </p>
        {trend && (
          <div className="flex items-center gap-1 mb-1" style={{ color: trend > 0 ? 'var(--green)' : 'var(--red)', fontSize: '12px', fontWeight: 500 }}>
            {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </motion.div>
  );

  if (link) {
    return <Link to={link} style={{ textDecoration: 'none' }}>{CardContent}</Link>;
  }
  return CardContent;
};

export default StatCard;
