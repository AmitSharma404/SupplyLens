import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const feedItems = [
  { color: 'var(--green)', product: 'Rice Flour 5kg', delta: '+240 units', status: 'In Stock' },
  { color: 'var(--amber)', product: 'Sunflower Oil 1L', delta: '-18 units', status: 'Reorder Soon' },
  { color: 'var(--red)', product: 'Wheat Flour 10kg', delta: '-92 units', status: 'Critical' },
  { color: 'var(--blue)', product: 'Sugar 50kg Bag', delta: 'Forecasted', status: 'Order Placed' },
  { color: 'var(--green)', product: 'Mustard Oil 5L', delta: '+60 units', status: 'In Stock' },
  { color: 'var(--amber)', product: 'Packaging Bags', delta: '-12 units', status: 'Reorder Soon' },
];

const LiveFeed = () => {
  const [visibleItems, setVisibleItems] = useState(feedItems.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % feedItems.length;
        setVisibleItems(items => {
          const newItems = [...items.slice(1), feedItems[next]];
          return newItems;
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-0">
      <p className="mb-2" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Live Feed</p>
      <AnimatePresence mode="popLayout">
        {visibleItems.map((item, i) => (
          <motion.div
            key={item.product + i + currentIndex}
            className="flex items-center gap-3 py-2 px-3 rounded-[6px]"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            layout
          >
            <span className="w-2 h-2 rounded-full shrink-0 glow-dot" style={{ backgroundColor: item.color, color: item.color, '--glow-speed': '2s' }} />
            <span style={{ fontSize: '12px', color: 'var(--text)', flex: 1 }}>{item.product}</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.delta}</span>
            <span className="px-2 py-0.5 rounded-[4px]" style={{ fontSize: '10px', fontWeight: 500, color: item.color, background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LiveFeed;
