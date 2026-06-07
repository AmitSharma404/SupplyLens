import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers } from '../redux/slices/supplierSlice';
import RoleGuard from '../components/RoleGuard';
import { Link } from 'react-router-dom';

const getSupplierColor = (score) => {
  if (score >= 90) return 'var(--green)';
  if (score >= 70) return 'var(--amber)';
  return 'var(--red)';
};

const ScoreRing = ({ score, color, delay = 0 }) => {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - score / 100);
  const { ref, displayValue } = useAnimatedCounter(score, { duration: 1.2, suffix: '%' });

  return (
    <div className="relative flex items-center justify-center" ref={ref}>
      <svg width="48" height="48" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="var(--app-overlay)" strokeWidth="2.5" />
        <motion.circle
          cx="20" cy="20" r="18"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay }}
        />
      </svg>
      <span className="absolute" style={{ fontSize: '11px', fontWeight: 600, color }}>{displayValue}</span>
    </div>
  );
};

const Suppliers = () => {
  const dispatch = useDispatch();
  const { items: suppliers, loading } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse" style={{ color: 'var(--app-text-muted)' }}>Loading suppliers...</div>
      </div>
    );
  }

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px' }}>Suppliers</h1>
        <RoleGuard allowedRoles={['admin', 'manager']}>
          <button className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-[10px] cursor-pointer border-0" style={{ background: 'var(--accent)', color: '#000', fontSize: '13px', fontWeight: 500 }}>
            + Add Supplier
          </button>
        </RoleGuard>
      </div>

      {suppliers?.length === 0 ? (
          <div className="py-16 text-center w-full" style={{ border: '1px dashed var(--app-border)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--app-text-muted)', fontSize: '14px' }}>No suppliers found. Create your first supplier.</p>
              <RoleGuard allowedRoles={['admin', 'manager']}>
                <button className="mt-4 inline-block text-[13px] font-medium border-0 cursor-pointer" style={{ color: 'var(--accent)', background: 'transparent' }}>+ Add Supplier</button>
              </RoleGuard>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers && suppliers.map((s, i) => {
          const score = s.reliabilityScore || 100;
          const color = getSupplierColor(score);
          return (
            <motion.div
              key={s._id || s.id}
              className="p-5 rounded-2xl flex items-center gap-4 transition-all duration-200 group"
              style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, borderColor: 'var(--app-border-hover)' }}
            >
              <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}>
                <ScoreRing score={score} color={color} delay={i * 0.2} />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--app-text)' }}>{s.name}</p>
                <p style={{ fontSize: '13px', color: 'var(--app-text-muted)' }}>{s.contactPerson || s.contact}</p>
                <p style={{ fontSize: '12px', color: 'var(--app-text-muted)' }}>{s.email}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}
    </motion.div>
  );
};

export default Suppliers;
