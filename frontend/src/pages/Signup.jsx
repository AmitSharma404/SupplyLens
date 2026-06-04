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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', businessName: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      setSuccess(true);
      toast.success('Account created!');
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 }, colors: ['#10b981', '#059669', '#34d399'] });
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      toast.error(err || 'Registration failed');
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
      toast.error(err || 'Google Login failed');
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
    </AuthLayout>
  );
};

export default Signup;
