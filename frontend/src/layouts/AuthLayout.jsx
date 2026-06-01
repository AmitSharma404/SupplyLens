import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 md:pt-28 px-5" style={{ background: 'var(--bg)' }}>
      <Toaster position="top-right" duration={3000} />

      <div className="w-full max-w-[400px] mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.4px', color: 'var(--text)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          SupplyLens
        </Link>
      </div>

      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
