import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, BarChart, Bar, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const historicalData = [
  { month: 'Jul', actual: 180 }, { month: 'Aug', actual: 195 }, { month: 'Sep', actual: 210 },
  { month: 'Oct', actual: 245 }, { month: 'Nov', actual: 230 }, { month: 'Dec', actual: 260 },
];

const forecastData = [
  { month: 'Jan', predicted: 280, upper: 310, lower: 250 },
  { month: 'Feb', predicted: 310, upper: 345, lower: 275 },
  { month: 'Mar', predicted: 295, upper: 330, lower: 260 },
];

const combinedData = [
  ...historicalData.map(d => ({ ...d, predicted: null, upper: null, lower: null })),
  { month: 'Dec', actual: 260, predicted: 260, upper: 260, lower: 260 },
  ...forecastData.map(d => ({ ...d, actual: null })),
];

const consumptionData = [
  { product: 'Rice Flour', consumption: 340, change: 12 },
  { product: 'Sunflower Oil', consumption: 180, change: -8 },
  { product: 'Wheat Flour', consumption: 290, change: 22 },
  { product: 'Sugar', consumption: 150, change: 5 },
  { product: 'Mustard Oil', consumption: 110, change: -15 },
];

const forecastTable = [
  { product: 'Rice Flour 5kg', current: 284, predicted: 340, change: '+19.7%', direction: 'up' },
  { product: 'Sunflower Oil 1L', current: 47, predicted: 62, change: '+31.9%', direction: 'up' },
  { product: 'Wheat Flour 10kg', current: 12, predicted: 45, change: '+275%', direction: 'up' },
  { product: 'Sugar 50kg', current: 156, predicted: 130, change: '-16.7%', direction: 'down' },
  { product: 'Mustard Oil 5L', current: 89, predicted: 72, change: '-19.1%', direction: 'down' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-[8px]" style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
      <p style={{ color: 'var(--app-text-muted)', marginBottom: '2px' }}>{label}</p>
      {payload.filter(p => p.value != null).map((p, i) => (
        <p key={i} style={{ color: p.color || p.stroke }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const periods = ['30d', '60d', '90d'];

const Forecast = () => {
  const [period, setPeriod] = useState('90d');

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px' }}>Demand Forecast</h1>
        <div className="flex gap-1">
          {periods.map(p => (
            <motion.button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1.5 rounded-[100px] cursor-pointer border-0 transition-all duration-200"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                background: period === p ? 'var(--accent)' : 'transparent',
                color: period === p ? '#000' : 'var(--app-text-muted)',
                border: period === p ? 'none' : '1px solid var(--app-border)',
              }}
              whileHover={{ scale: period === p ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Forecast Chart */}
      <motion.div
        className="p-6 rounded-[16px] mb-6"
        style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)', marginBottom: '24px' }}>
          Demand Prediction — {period}
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={combinedData}>
            <XAxis dataKey="month" tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey="upper" fill="var(--accent)" fillOpacity={0.06} stroke="none" />
            <Area dataKey="lower" fill="var(--app-surface)" stroke="none" />
            <Line type="monotone" dataKey="actual" name="Historical" stroke="var(--text)" strokeWidth={2} dot={{ r: 3, fill: 'var(--text)' }} connectNulls={false} />
            <Line type="monotone" dataKey="predicted" name="Forecast" stroke="var(--accent)" strokeWidth={2} strokeDasharray="8 4" dot={{ r: 3, fill: 'var(--accent)' }} connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Consumption + Forecast Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          className="p-6 rounded-[16px]"
          style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)', marginBottom: '24px' }}>
            Consumption Rate
          </h3>
          <div className="flex flex-col gap-4">
            {consumptionData.map((item, i) => (
              <motion.div
                key={item.product}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span style={{ fontSize: '13px', color: 'var(--app-text-muted)', width: '100px', flexShrink: 0 }}>{item.product}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--app-overlay)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.change > 0 ? 'var(--accent)' : 'var(--amber)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.consumption / 400) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                  />
                </div>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: item.change > 0 ? 'var(--green)' : 'var(--amber)' }}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p-6 rounded-[16px]"
          style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)', marginBottom: '16px' }}>
            Forecast Summary
          </h3>
          <div className="flex flex-col">
            {forecastTable.map((row, i) => (
              <motion.div
                key={row.product}
                className="flex items-center py-3 gap-3"
                style={{ borderBottom: '1px solid var(--app-border)' }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                <span className="flex-1 min-w-0 truncate" style={{ fontSize: '14px', color: 'var(--app-text)' }}>{row.product}</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--app-text-muted)' }}>{row.current} → {row.predicted}</span>
                <motion.span
                  className="flex items-center gap-1"
                  style={{ fontSize: '12px', fontWeight: 500, color: row.direction === 'up' ? 'var(--green)' : 'var(--amber)' }}
                  initial={{ y: row.direction === 'up' ? 4 : -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 + i * 0.06 }}
                >
                  {row.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {row.change}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Forecast;
