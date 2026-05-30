import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import StatusPill from '../components/app/StatusPill';
import DrawerPanel from '../components/app/DrawerPanel';

const initialOrders = [
  { id: 'ORD-0041', product: 'Rice Flour', supplier: 'AgriTrade', quantity: 200, total: '₹24,000', date: 'May 28', status: 'delivered' },
  { id: 'ORD-0040', product: 'Packaging', supplier: 'PrimePack', quantity: 500, total: '₹8,500', date: 'May 27', status: 'shipped' },
  { id: 'ORD-0039', product: 'Sugar', supplier: 'GrainMasters', quantity: 100, total: '₹45,000', date: 'May 26', status: 'shipped' },
  { id: 'ORD-0038', product: 'Cooking Oil', supplier: 'Metro Supply', quantity: 50, total: '₹18,000', date: 'May 25', status: 'pending' },
  { id: 'ORD-0037', product: 'Salt', supplier: 'AgriTrade', quantity: 300, total: '₹9,000', date: 'May 24', status: 'pending' },
  { id: 'ORD-0036', product: 'Wheat Flour', supplier: 'FoodSupply', quantity: 150, total: '₹21,000', date: 'May 23', status: 'cancelled' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [drawerOrder, setDrawerOrder] = useState(null);
  const [flashRow, setFlashRow] = useState(null);

  // Live status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => {
        const pendingIdx = prev.findIndex(o => o.status === 'pending');
        const shippedIdx = prev.findIndex(o => o.status === 'shipped');
        const target = Math.random() > 0.5 && pendingIdx >= 0 ? pendingIdx : shippedIdx;
        if (target < 0) return prev;

        const next = [...prev];
        const order = { ...next[target] };
        const oldStatus = order.status;

        if (oldStatus === 'pending') order.status = 'shipped';
        else if (oldStatus === 'shipped') {
          order.status = 'delivered';
          // Micro confetti
          confetti({ particleCount: 15, spread: 40, origin: { y: 0.5, x: 0.7 }, colors: ['#10b981', '#059669'] });
        }

        next[target] = order;
        setFlashRow(order.id);
        setTimeout(() => setFlashRow(null), 600);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const glowColor = (status) => {
    if (status === 'delivered') return 'var(--green-glow)';
    if (status === 'shipped') return 'var(--blue-glow)';
    return 'transparent';
  };

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px', marginBottom: '32px' }}>Orders</h1>

      <div className="rounded-[12px] overflow-hidden" style={{ border: '1px solid var(--app-border)' }}>
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--app-border)', background: 'var(--app-surface)' }}>
              {['Order ID', 'Product', 'Supplier', 'Qty', 'Total', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left py-3 px-4" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--app-text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <motion.tr
                key={o.id}
                className="cursor-pointer transition-all duration-200"
                style={{
                  borderBottom: '1px solid var(--app-border)',
                  background: flashRow === o.id ? glowColor(o.status) : 'transparent',
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => setDrawerOrder(o)}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--app-overlay)'; e.currentTarget.style.borderLeft = '2px solid var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = flashRow === o.id ? glowColor(o.status) : 'transparent'; e.currentTarget.style.borderLeft = '2px solid transparent'; }}
              >
                <td className="py-3 px-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)' }}>{o.id}</td>
                <td className="py-3 px-4" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>{o.product}</td>
                <td className="py-3 px-4" style={{ fontSize: '13px', color: 'var(--app-text-muted)' }}>{o.supplier}</td>
                <td className="py-3 px-4" style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', color: 'var(--app-text)' }}>{o.quantity}</td>
                <td className="py-3 px-4" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>{o.total}</td>
                <td className="py-3 px-4" style={{ fontSize: '13px', color: 'var(--app-text-muted)' }}>{o.date}</td>
                <td className="py-3 px-4"><StatusPill status={o.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <DrawerPanel isOpen={!!drawerOrder} onClose={() => setDrawerOrder(null)} title={`Order ${drawerOrder?.id || ''}`}>
        {drawerOrder && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Product', value: drawerOrder.product },
                { label: 'Supplier', value: drawerOrder.supplier },
                { label: 'Quantity', value: drawerOrder.quantity },
                { label: 'Total', value: drawerOrder.total },
                { label: 'Date', value: drawerOrder.date },
                { label: 'Status', value: <StatusPill status={drawerOrder.status} /> },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)', marginBottom: '4px' }}>{label}</p>
                  <div style={{ fontSize: '14px', color: 'var(--app-text)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DrawerPanel>
    </motion.div>
  );
};

export default Orders;
