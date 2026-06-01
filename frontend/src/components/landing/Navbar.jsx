import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(248,249,250,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
      }}
    >
      <div
        className="flex items-center justify-between mx-auto px-6 md:px-12"
        style={{ maxWidth: '1200px', height: '56px' }}
      >
        <Link to="/" style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.3px' }}>
          SupplyLens
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Compare', 'Docs'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              style={{ fontSize: '13px', color: '#64748b', fontWeight: 450 }}
              className="hover:text-[#0f172a] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
            Log in
          </Link>
          <Link to="/signup">
            <button
              className="px-4 py-2 rounded-[10px] cursor-pointer border-0"
              style={{ background: '#0f172a', color: '#fff', fontSize: '13px', fontWeight: 500 }}
            >
              Get started free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
