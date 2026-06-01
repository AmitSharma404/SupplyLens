import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const DrawerPanel = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-[420px] max-w-full h-full overflow-y-auto z-10"
            style={{
              background: 'var(--app-elevated)',
              borderLeft: '1px solid var(--app-border)',
            }}
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--app-border)' }}>
              {title && <h3 style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.4px', color: 'var(--app-text)' }}>{title}</h3>}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-[8px] cursor-pointer bg-transparent transition-colors"
                style={{ border: '1px solid var(--app-border)', color: 'var(--app-text-muted)' }}
              >
                <X size={14} />
              </button>
            </div>
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DrawerPanel;
