import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, Users, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';
import StatCard from '../components/app/StatCard';
import AlertRow from '../components/app/AlertRow';

const stockData = [
  { month: 'Jul', value: 180 }, { month: 'Aug', value: 220 },
  { month: 'Sep', value: 195 }, { month: 'Oct', value: 260 },
  { month: 'Nov', value: 240 }, { month: 'Dec', value: 310 },
];

const supplierData = [
  { month: 'Jul', agritrade: 92, foodsupply: 80, primepack: 88 },
  { month: 'Aug', agritrade: 94, foodsupply: 83, primepack: 91 },
  { month: 'Sep', agritrade: 91, foodsupply: 78, primepack: 89 },
  { month: 'Oct', agritrade: 96, foodsupply: 85, primepack: 93 },
  { month: 'Nov', agritrade: 95, foodsupply: 82, primepack: 90 },
  { month: 'Dec', agritrade: 97, foodsupply: 86, primepack: 94 },
];

const fallbackAlerts = [
  { dot: 'red', message: 'Wheat Flour 10kg stock critical — 12 units remaining', priority: 'high', date: 'Just now' },
  { dot: 'amber', message: 'Sunflower Oil 1L approaching reorder point', priority: 'medium', date: '2h ago' },
  { dot: 'green', message: 'Rice Flour 5kg restocked — 284 units received', priority: 'low', date: '4h ago' },
  { dot: 'blue', message: 'QuickShip Pvt. delivery delayed by 2 days', priority: 'medium', date: '6h ago' },
  { dot: 'amber', message: 'Sugar 50kg Bag forecast suggests 40% demand spike', priority: 'medium', date: '1d ago' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-[8px]" style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
      <p style={{ color: 'var(--app-text-muted)', marginBottom: '2px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats: dashboardData, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const stats = dashboardData?.stats || {};
  const backendAlerts = dashboardData?.alerts || [];

  const rawInventoryValue = stats.totalInventoryValue 
    ? parseFloat(stats.totalInventoryValue.replace(/[$,]/g, '')) 
    : 124500;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse" style={{ color: 'var(--app-text-muted)' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
      >
        <StatCard label="Total Products" value={stats.totalProducts || 284} icon={Package} />
        <StatCard label="Pending Orders" value={stats.pendingReordersCount || 12} icon={ShoppingCart} />
        <StatCard label="Low Stock Items" value={stats.lowStockCount || 7} accentBorder="var(--amber)" icon={AlertTriangle} />
        <StatCard label="Inventory Value" prefix="$" value={rawInventoryValue} icon={Package} />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Stock Trend */}
        <motion.div
          className="p-6 rounded-[16px]"
          style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '24px' }}>
            Stock Trend — Last 6 Months
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockData}>
              <XAxis dataKey="month" tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
              <Bar dataKey="value" name="Units" fill="var(--accent)" radius={[4, 4, 0, 0]} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Supplier Performance */}
        <motion.div
          className="p-6 rounded-[16px]"
          style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '24px' }}>
            Supplier Reliability
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={supplierData}>
              <XAxis dataKey="month" tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="agritrade" name="AgriTrade" stroke="var(--green)" strokeWidth={2} dot={{ r: 3, fill: 'var(--green)' }} />
              <Line type="monotone" dataKey="foodsupply" name="FoodSupply" stroke="var(--amber)" strokeWidth={2} dot={{ r: 3, fill: 'var(--amber)' }} />
              <Line type="monotone" dataKey="primepack" name="PrimePack" stroke="var(--blue)" strokeWidth={2} dot={{ r: 3, fill: 'var(--blue)' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <motion.div
        className="p-6 rounded-[16px]"
        style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '16px' }}>
          Recent Alerts
        </h3>
        {backendAlerts.length > 0 ? (
          backendAlerts.map((alert, i) => (
            <AlertRow
              key={i}
              index={i}
              dot={alert.dot}
              message={alert.title}
              subLabel={alert.sub}
              date={alert.time}
            />
          ))
        ) : (
          fallbackAlerts.map((alert, i) => (
            <AlertRow
              key={i}
              index={i}
              dot={alert.dot}
              message={alert.message}
              priority={alert.priority}
              date={alert.date}
            />
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
