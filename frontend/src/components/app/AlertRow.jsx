import { motion } from 'framer-motion';
import StatusPill from './StatusPill';

const glowSpeeds = { high: '1.2s', medium: '2s', low: '3s' };
const dotColors = { red: 'var(--red)', amber: 'var(--amber)', blue: 'var(--blue)', green: 'var(--green)' };

const AlertRow = ({ dot, message, subLabel, priority, date, onDismiss, index = 0 }) => {
  return (
    <motion.div
      className="flex items-start gap-3 py-3 px-4 group rounded-[8px] transition-colors duration-150"
      style={{ borderBottom: '1px solid var(--app-border)' }}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
      layout
      whileHover={{ background: 'var(--app-overlay)' }}
    >
      {/* Glow dot */}
      <span
        className="w-2 h-2 rounded-full mt-1.5 shrink-0 glow-dot"
        style={{
          backgroundColor: dotColors[dot] || dotColors.blue,
          color: dotColors[dot] || dotColors.blue,
          '--glow-speed': glowSpeeds[priority] || '2s',
        }}
      />

      <div className="flex-1 min-w-0">
        <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--app-text)', lineHeight: 1.5 }}>{message}</p>
        {subLabel && <p style={{ fontSize: '12px', color: 'var(--app-text-muted)', marginTop: '2px' }}>{subLabel}</p>}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {priority && <StatusPill status={priority} />}
        {date && <span style={{ fontSize: '12px', color: 'var(--app-text-muted)' }}>{date}</span>}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-0"
            style={{ color: 'var(--app-text-muted)', fontSize: '14px' }}
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AlertRow;
