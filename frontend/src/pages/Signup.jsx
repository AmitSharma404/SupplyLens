import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, googleLoginUser, clearAuthError } from '../redux/slices/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import AuthLayout from '../layouts/AuthLayout';
import AuthBox from '../components/auth/AuthBox';
import FormInput from '../components/auth/FormInput';
import PasswordStrength from '../components/auth/PasswordStrength';
import SubmitButton from '../components/auth/SubmitButton';
import { motion } from 'framer-motion';

const roles = [
  { id: 'admin', label: 'Admin', badge: 'Full access', desc: 'Full platform access: users, settings, analytics, all data', color: 'amber' },
  { id: 'manager', label: 'Manager', badge: 'Operational', desc: 'Approve orders, manage vendors, view reports, assign tasks', color: 'blue' },
  { id: 'staff', label: 'Staff', badge: 'Execution', desc: 'Log inventory, update orders, raise approval requests', color: 'emerald' }
];

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', businessName: '', email: '', password: '', role: 'staff' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ ...form, organization: form.businessName })).unwrap();
      setSuccess(true);
      toast.success('Account created!');
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 }, colors: ['#10b981', '#059669', '#34d399'] });
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error(typeof err === 'string' ? err : err?.message || 'Registration failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await dispatch(googleLoginUser(credentialResponse.credential)).unwrap();
      setSuccess(true);
      toast.success('Google login successful!');
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error(typeof err === 'string' ? err : err?.message || 'Google Login failed');
    }
  };

  const handleGoogleError = () => {
    toast.error('Google Login failed');
  };

  if (success) {
    return (
      <AuthLayout>
        <AuthBox>
          <div className="flex flex-col items-center py-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Account created</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Redirecting to login…</p>
          </div>
        </AuthBox>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full max-w-[850px] justify-center">
        <AuthBox shake={shake}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.6px', color: 'var(--text)', marginBottom: '4px' }}>
            Create account
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
            Start managing your supply chain in minutes
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormInput label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
            <FormInput label="Business name" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Acme Corp" />
            <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required error={error} />
            <div>
              <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" required />
              <div className="mt-2">
                <PasswordStrength password={form.password} />
              </div>
            </div>
            <SubmitButton loading={loading}>Create account</SubmitButton>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t" style={{ borderColor: 'var(--border)' }}></div>
            <span className="px-3" style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>or continue with</span>
            <div className="flex-1 border-t" style={{ borderColor: 'var(--border)' }}></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          <p className="text-center mt-3" style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
          <p className="text-center mt-3" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }} className="hover:opacity-80 transition-opacity">Log in</Link>
          </p>
        </AuthBox>

        <motion.div
          className="w-full lg:w-[400px] p-6 md:p-8 rounded-2xl flex flex-col"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Select Role</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Choose the access level for this account.</p>
          
          <div className="flex flex-col gap-4 mb-4">
            {roles.map((r) => {
              const selected = form.role === r.id;
              const colors = {
                amber: { border: selected ? '#f59e0b' : 'var(--border)', text: '#f59e0b', badgeBg: 'rgba(245, 158, 11, 0.15)' },
                blue: { border: selected ? '#3b82f6' : 'var(--border)', text: '#3b82f6', badgeBg: 'rgba(59, 130, 246, 0.15)' },
                emerald: { border: selected ? '#10b981' : 'var(--border)', text: '#10b981', badgeBg: 'rgba(16, 185, 129, 0.15)' }
              };
              const c = colors[r.color];

              return (
                <div
                  key={r.id}
                  onClick={() => setForm({ ...form, role: r.id })}
                  className="p-4 rounded-xl cursor-pointer transition-all duration-200 flex flex-col gap-2 hover:opacity-100"
                  style={{
                    background: selected ? 'var(--bg)' : 'transparent',
                    border: `2px solid ${c.border}`,
                    opacity: selected ? 1 : 0.5
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.label}</span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: c.badgeBg, color: c.text }}>{r.badge}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.desc}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              {form.role === 'staff' && 'Safe default selected. Role can be updated by an admin later.'}
              {form.role === 'manager' && 'Manager access requires admin approval to access all billing.'}
              {form.role === 'admin' && 'Admin role has full read/write capabilities system-wide.'}
            </p>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
