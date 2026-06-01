import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  'in-stock':     { label: 'In Stock',     color: 'var(--green)',  glow: 'var(--green-glow)' },
  'reorder-soon': { label: 'Reorder Soon', color: 'var(--amber)',  glow: 'var(--amber-glow)' },
  'critical':     { label: 'Critical',     color: 'var(--red)',    glow: 'var(--red-glow)'   },
  'pending':      { label: 'Pending',      color: 'var(--app-text-muted)', glow: 'transparent'   },
  'shipped':      { label: 'Shipped',      color: 'var(--blue)',   glow: 'var(--blue-glow)'  },
  'delivered':    { label: 'Delivered',     color: 'var(--green)',  glow: 'var(--green-glow)' },
  'cancelled':    { label: 'Cancelled',    color: 'var(--red)',    glow: 'var(--red-glow)'   },
  'high':         { label: 'HIGH',         color: 'var(--red)',    glow: 'var(--red-glow)'   },
  'medium':       { label: 'MEDIUM',       color: 'var(--amber)',  glow: 'var(--amber-glow)' },
  'low':          { label: 'LOW',          color: 'var(--blue)',   glow: 'var(--blue-glow)'  },
};

const StatusPill = ({ status, label }) => {
  const config = statusConfig[status] || statusConfig['pending'];
  const displayLabel = label || config.label;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={status + displayLabel}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[100px] whitespace-nowrap"
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          color: config.color,
          background: config.glow,
          border: `1px solid ${config.color}`,
          borderColor: `color-mix(in srgb, ${config.color} 30%, transparent)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {displayLabel}
      </motion.span>
    </AnimatePresence>
  );
};

export default StatusPill;
