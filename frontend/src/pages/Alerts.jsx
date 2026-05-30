import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlertRow from '../components/app/AlertRow';

const allAlerts = [
  { id: 1, dot: 'red', message: 'Wheat Flour 10kg stock critical — 12 units', subLabel: 'Warehouse A', priority: 'high', date: 'Just now' },
  { id: 2, dot: 'amber', message: 'Sunflower Oil approaching reorder threshold', subLabel: 'Auto-reorder available', priority: 'medium', date: '2h ago' },
  { id: 3, dot: 'red', message: 'Cooking Oil 20L below safety buffer', subLabel: '8 units left', priority: 'high', date: '4h ago' },
  { id: 4, dot: 'blue', message: 'QuickShip delivery delayed — ETA June 2', subLabel: 'ORD-0038', priority: 'low', date: '6h ago' },
  { id: 5, dot: 'amber', message: 'Packaging Bags reorder needed in 3 days', subLabel: '33 units', priority: 'medium', date: '1d ago' },
  { id: 6, dot: 'amber', message: 'Sugar demand spike predicted next month', subLabel: '+40% forecast', priority: 'medium', date: '1d ago' },
  { id: 7, dot: 'blue', message: 'GrainMasters reliability improved to 89%', subLabel: 'Up from 82%', priority: 'low', date: '2d ago' },
  { id: 8, dot: 'red', message: 'MetroSupply integration sync failed', subLabel: '48h ago', priority: 'high', date: '2d ago' },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Low' },
];

const Alerts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [alerts, setAlerts] = useState(allAlerts);

  const filtered = activeTab === 'all' ? alerts : alerts.filter(a => a.priority === activeTab);
  const counts = { all: alerts.length, high: alerts.filter(a => a.priority === 'high').length, medium: alerts.filter(a => a.priority === 'medium').length, low: alerts.filter(a => a.priority === 'low').length };

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="mb-8" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px' }}>Alerts</h1>

      <div className="flex gap-1 mb-6 relative" style={{ borderBottom: '1px solid var(--app-border)' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="relative px-4 py-2.5 cursor-pointer bg-transparent border-0"
            style={{ fontSize: '13px', fontWeight: 500, color: activeTab === tab.key ? 'var(--text)' : 'var(--app-text-muted)' }}>
            {tab.label}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-[4px]"
              style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: activeTab === tab.key ? 'var(--accent-glow)' : 'var(--app-overlay)', color: activeTab === tab.key ? 'var(--accent)' : 'var(--app-text-muted)' }}>
              {counts[tab.key]}
            </span>
            {activeTab === tab.key && (
              <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'var(--accent)' }}
                layoutId="tab-indicator" transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
            )}
          </button>
        ))}
      </div>

      <div className="rounded-[12px]" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? filtered.map((a, i) => (
            <AlertRow key={a.id} {...a} index={i} onDismiss={() => setAlerts(p => p.filter(x => x.id !== a.id))} />
          )) : (
            <motion.div key="empty" className="py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ fontSize: '14px', color: 'var(--app-text-muted)' }}>No alerts</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Alerts;
