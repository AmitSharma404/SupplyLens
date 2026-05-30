const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full py-2.5 px-3.5 rounded-lg outline-none transition-all duration-200"
        style={{
          background: 'var(--bg)',
          border: error ? '1px solid var(--red)' : '1px solid var(--border)',
          boxShadow: error ? '0 0 0 3px rgba(239,68,68,0.08)' : 'none',
          fontSize: '14px',
          color: 'var(--text)',
        }}
        onFocus={e => {
          if (!error) {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.08)';
          }
        }}
        onBlur={e => {
          if (!error) {
            e.target.style.borderColor = 'var(--border)';
            e.target.style.boxShadow = 'none';
          }
        }}
        {...props}
      />
      {error && <p style={{ fontSize: '13px', color: 'var(--red)', marginTop: '6px' }}>{error}</p>}
    </div>
  );
};

export default FormInput;
