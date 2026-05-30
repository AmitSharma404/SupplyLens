import { useTypingAnimation } from '../../hooks/useTypingAnimation';

const TypewriterHeadline = ({ lines = ['Full visibility.', 'Zero guesswork.'], charDelay = 45 }) => {
  const { displayLines, isComplete, cursorVisible } = useTypingAnimation(lines, { charDelay });

  return (
    <div>
      {displayLines.map((line, i) => (
        <div key={i} className="flex">
          <span style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 500,
            letterSpacing: '-3px',
            lineHeight: 1.05,
            color: i === 0 ? 'var(--text)' : 'var(--text-muted)',
          }}>
            {line}
          </span>
          {/* Cursor after last active line */}
          {i === displayLines.findIndex((l, idx) => idx > 0 ? l.length < lines[idx]?.length : l.length < lines[0]?.length) || (!isComplete && i === displayLines.length - 1) ? null : null}
        </div>
      ))}
      {/* Blinking cursor */}
      {cursorVisible && (
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: 'clamp(40px, 5vw, 64px)',
          background: 'var(--accent)',
          marginLeft: '4px',
          animation: 'blink 0.8s step-end infinite',
          verticalAlign: 'bottom',
        }} />
      )}
    </div>
  );
};

export default TypewriterHeadline;
