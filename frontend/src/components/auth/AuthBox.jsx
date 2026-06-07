import { motion } from 'framer-motion';

const AuthBox = ({ children, shake = false }) => {
  return (
    <motion.div
      className="w-full max-w-[400px] p-6 md:p-8 rounded-2xl"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={shake
        ? { x: [0, -10, 10, -8, 8, -4, 4, 0], opacity: 1, y: 0 }
        : { opacity: 1, y: 0 }
      }
      transition={shake
        ? { duration: 0.5, ease: 'easeInOut' }
        : { duration: 0.4, ease: 'easeOut' }
      }
    >
      {children}
    </motion.div>
  );
};

export default AuthBox;
