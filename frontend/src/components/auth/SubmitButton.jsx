import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

const SubmitButton = ({
  children,
  loading = false,
  success = false,
  disabled = false,
  onClick,
  type = 'submit',
  className = '',
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full py-2.5 px-6 rounded-lg cursor-pointer border-0 flex items-center justify-center gap-2 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        fontSize: '14px',
        fontWeight: 500,
        background: 'var(--text)',
        color: 'var(--bg)',
      }}
      whileHover={!loading && !disabled ? { opacity: 0.85 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.span key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Check size={16} strokeWidth={3} />
          </motion.span>
        ) : loading ? (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loader2 size={16} className="animate-spin" />
          </motion.span>
        ) : (
          <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SubmitButton;
