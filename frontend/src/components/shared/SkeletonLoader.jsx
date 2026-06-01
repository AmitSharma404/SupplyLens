const SkeletonLoader = ({ variant = 'card', count = 1, className = '' }) => {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return items.map((_, i) => (
      <div key={i} className={`p-6 rounded-[16px] ${className}`} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
        <div className="skeleton h-3 w-20 mb-3 rounded" />
        <div className="skeleton h-7 w-16 mb-2 rounded" />
        <div className="skeleton h-2 w-full rounded" />
      </div>
    ));
  }

  if (variant === 'row') {
    return items.map((_, i) => (
      <div key={i} className={`flex items-center gap-4 py-3 px-4 ${className}`}>
        <div className="skeleton h-4 w-4 rounded-full shrink-0" />
        <div className="skeleton h-3 flex-1 rounded" style={{ maxWidth: `${60 + Math.random() * 30}%` }} />
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
    ));
  }

  if (variant === 'chart') {
    return (
      <div className={`p-6 rounded-[16px] ${className}`} style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
        <div className="skeleton h-3 w-32 mb-6 rounded" />
        <div className="flex items-end gap-2" style={{ height: '160px' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton flex-1 rounded-t" style={{ height: `${30 + Math.random() * 70}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
