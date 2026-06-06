import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, ComposedChart, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getProducts, getForecast } from '../Instance/API';

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

const Forecast = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const productList = res.data || res.products || [];
      setProducts(productList);
      if (productList.length > 0) {
        setSelectedProduct(productList[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchForecast(selectedProduct);
    }
  }, [selectedProduct]);

  const fetchForecast = async (productId) => {
    try {
      setLoading(true);
      const res = await getForecast(productId);
      setForecastData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mock historical data for visual consistency since we don't have historical chart endpoint,
  // we just use the predicted data from backend to show the trend line.
  const chartData = [];
  if (forecastData) {
      // Create a mock past trend leading up to prediction
      const base = forecastData.methods.exponentialSmoothing.predictedWeeklyDemand;
      chartData.push({ week: 'Week -3', actual: Math.max(0, base - 10) });
      chartData.push({ week: 'Week -2', actual: Math.max(0, base + 5) });
      chartData.push({ week: 'Week -1', actual: Math.max(0, base - 2) });
      chartData.push({ week: 'Current', actual: base, predicted: base, upper: base, lower: base });
      chartData.push({ week: 'Week +1', predicted: base + 2, upper: base + 10, lower: Math.max(0, base - 6) });
      chartData.push({ week: 'Week +2', predicted: base + 5, upper: base + 15, lower: Math.max(0, base - 10) });
  }

  const selectedProductObj = products.find(p => p._id === selectedProduct);

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px' }}>Demand Forecast</h1>
        <div className="flex items-center gap-4">
            <span style={{ fontSize: '13px', color: 'var(--app-text-muted)' }}>Select Product:</span>
            <select
                value={selectedProduct}
                onChange={e => setSelectedProduct(e.target.value)}
                className="px-3 py-2 rounded-[8px] outline-none"
                style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)', color: 'var(--app-text)', fontSize: '13px' }}
            >
                {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
                ))}
            </select>
        </div>
      </div>

      <div className="mb-8 p-4 rounded-[12px] bg-[var(--app-overlay)] border border-[var(--app-border)] flex items-center justify-center shadow-sm">
        <p className="text-[var(--accent)] font-medium text-sm">⚠️ This feature is not ready yet</p>
      </div>

      {loading ? (
        <div className="p-8 flex items-center justify-center min-h-[40vh]">
            <div className="animate-pulse" style={{ color: 'var(--app-text-muted)' }}>Calculating forecast...</div>
        </div>
      ) : forecastData ? (
          <>
            {/* Forecast Chart */}
            <motion.div
                className="p-6 rounded-[16px] mb-6"
                style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)' }}>
                        Predicted Weekly Demand
                    </h3>
                    <span style={{ fontSize: '12px', background: 'var(--accent-glow)', color: 'var(--accent)', padding: '4px 8px', borderRadius: '4px' }}>
                        Confidence: {forecastData.confidenceScore * 100}%
                    </span>
                </div>
                
                {forecastData.warning && (
                    <div className="mb-4 p-3 rounded-[8px]" style={{ background: 'rgba(255,165,0,0.1)', border: '1px solid var(--amber)', color: 'var(--amber)', fontSize: '13px' }}>
                        ⚠️ {forecastData.warning}
                    </div>
                )}

                <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--app-border)" />
                    <XAxis dataKey="week" tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--app-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Area type="monotone" dataKey="upper" fill="var(--accent)" fillOpacity={0.1} stroke="none" />
                    <Area type="monotone" dataKey="lower" fill="var(--app-surface)" stroke="none" />
                    <Line type="monotone" dataKey="actual" name="Historical" stroke="var(--text)" strokeWidth={2} dot={{ r: 4, fill: 'var(--text)' }} connectNulls={false} />
                    <Line type="monotone" dataKey="predicted" name="Forecast" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--accent)' }} connectNulls={false} />
                </ComposedChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div
                className="p-6 rounded-[16px]"
                style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                <h3 style={{ fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--app-text-muted)', marginBottom: '24px' }}>
                    Algorithm Outputs
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center p-4 rounded-[8px]" style={{ background: 'var(--app-overlay)' }}>
                        <span style={{ fontSize: '14px', color: 'var(--app-text)' }}>Exponential Smoothing (Default)</span>
                        <span style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{forecastData.methods.exponentialSmoothing.predictedWeeklyDemand} units/wk</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-[8px]" style={{ background: 'var(--app-overlay)' }}>
                        <span style={{ fontSize: '14px', color: 'var(--app-text)' }}>Moving Average (4-Week)</span>
                        <span style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{forecastData.methods.movingAverage.predictedWeeklyDemand} units/wk</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-[8px]" style={{ background: 'var(--app-overlay)' }}>
                        <span style={{ fontSize: '14px', color: 'var(--app-text)' }}>Data Points Used</span>
                        <span style={{ fontSize: '14px', color: 'var(--app-text-muted)' }}>{forecastData.dataPointsUsed} sales records</span>
                    </div>
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
                    Reorder Recommendations
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center p-4 rounded-[8px]" style={{ border: '1px solid var(--app-border)' }}>
                        <span style={{ fontSize: '14px', color: 'var(--app-text)' }}>Current Stock</span>
                        <span style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'var(--font-mono)', color: selectedProductObj?.currentStock < forecastData.methods.exponentialSmoothing.predictedWeeklyDemand ? 'var(--amber)' : 'var(--green)' }}>
                            {selectedProductObj?.currentStock || 0} units
                        </span>
                    </div>
                    
                    <div className="p-4 rounded-[8px]" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}>
                        <p style={{ fontSize: '13px', color: 'var(--app-text)', lineHeight: 1.5 }}>
                            Based on predicted demand of <strong>{forecastData.methods.exponentialSmoothing.predictedWeeklyDemand} units/week</strong>, 
                            your current stock will last approximately <strong>{Math.max(0, Math.round((selectedProductObj?.currentStock || 0) / Math.max(1, forecastData.methods.exponentialSmoothing.predictedWeeklyDemand)))} weeks</strong>.
                        </p>
                    </div>
                </div>
                </motion.div>
            </div>
          </>
      ) : (
          <div className="p-8 text-center text-[14px]" style={{ color: 'var(--app-text-muted)' }}>
              No forecast data available. Select a product.
          </div>
      )}
    </motion.div>
  );
};

export default Forecast;
