import { useMemo } from 'react';

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['var(--red)', 'var(--amber)', 'var(--amber)', 'var(--green)'];

const PasswordStrength = ({ password = '' }) => {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    return score;
  }, [password]);

  if (!password) return null;

  return (
    <div>
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < strength ? strengthColors[strength - 1] : 'var(--border)' }}
          />
        ))}
      </div>
      {strength > 0 && (
        <p style={{ fontSize: '12px', color: strengthColors[strength - 1], transition: 'color 200ms ease' }}>
          {strengthLabels[strength - 1]}
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
