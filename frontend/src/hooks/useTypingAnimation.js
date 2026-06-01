import { useState, useEffect, useRef } from 'react';

export function useTypingAnimation(lines, { charDelay = 45, lineDelay = 600 } = {}) {
  const [displayLines, setDisplayLines] = useState(lines.map(() => ''));
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeouts = useRef([]);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let baseDelay = 400; // initial delay before typing starts

    const typeNext = () => {
      if (currentLine >= lines.length) {
        setIsComplete(true);
        // fade cursor after 500ms
        const t = setTimeout(() => setCursorVisible(false), 500);
        timeouts.current.push(t);
        return;
      }

      const line = lines[currentLine];
      if (currentChar <= line.length) {
        setDisplayLines(prev => {
          const next = [...prev];
          next[currentLine] = line.slice(0, currentChar);
          return next;
        });
        currentChar++;
        const t = setTimeout(typeNext, charDelay);
        timeouts.current.push(t);
      } else {
        // move to next line
        currentLine++;
        currentChar = 0;
        const t = setTimeout(typeNext, lineDelay);
        timeouts.current.push(t);
      }
    };

    const t = setTimeout(typeNext, baseDelay);
    timeouts.current.push(t);

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [lines, charDelay, lineDelay]);

  return { displayLines, isComplete, cursorVisible };
}
