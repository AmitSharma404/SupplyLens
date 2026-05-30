import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AppSidebar from '../components/app/AppSidebar';
import AppNavbar from '../components/app/AppNavbar';
import { Toaster } from 'sonner';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ background: 'var(--app-bg)', color: 'var(--app-text)' }}>
      <Toaster position="top-right" duration={3000} theme="dark" />
      <AppSidebar />

      <div className="flex flex-col min-h-screen" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <AppNavbar />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
