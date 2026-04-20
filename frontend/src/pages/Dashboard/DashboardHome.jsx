import { useState } from 'react';
import { Download, DownloadIcon } from "lucide-react";
import { createOrder } from '../../Instance/API.js';

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-2xl border border-gray-100 drop-shadow-xs ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = 'green' }) => {
  const styles = {
    green: 'bg-status-healthy/10 text-status-healthy',
    red: 'bg-status-critical/10 text-status-critical',
    yellow: 'bg-status-warning/10 text-status-warning',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const borderColors = {
  red: 'border-l-status-critical',
  yellow: 'border-l-status-warning',
  green: 'border-l-status-healthy',
};

const Dot = ({ color = 'green' }) => {
  const colors = {
    green: 'bg-status-healthy',
    red: 'bg-status-critical',
    yellow: 'bg-status-warning',
  };
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[color]}`} />
  );
};

const Button = ({ children, variant = 'outline', className = '', onClick }) => {
  const base =
    'text-[11px] font-semibold rounded-lg px-3.5 py-1.5 cursor-pointer transition-all';
  const variants = {
    outline: 'border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 border-0 flex items-center gap-2',
    ghost: 'border border-white/25 text-white hover:bg-white/10 bg-white/10',
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const RiskBar = ({ pct, color }) => {
  const fill = {
    green: 'bg-status-healthy',
    yellow: 'bg-status-warning',
    red: 'bg-status-critical',
  };
  return (
    <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${fill[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

const STATS = [
  {
    label: 'Total Products',
    value: '12,482',
    badge: '+12% vs LY',
    badgeVariant: 'green',
    dotColor: 'green',
    valueColor: 'text-gray-900',
  },
  {
    label: 'Low Stock',
    value: '42',
    badge: 'Alert active',
    badgeVariant: 'green',
    dotColor: 'green',
    valueColor: 'text-status-healthy',
  },
  {
    label: 'Pending Reorders',
    value: '08',
    badge: 'Action needed',
    badgeVariant: 'red',
    dotColor: 'red',
    valueColor: 'text-status-critical',
  },
  {
    label: 'Success Rate',
    value: '98.2%',
    badge: 'Optimal',
    badgeVariant: 'green',
    dotColor: 'green',
    valueColor: 'text-gray-900',
  },
];

const ALERTS = [
  {
    dot: 'red',
    title: 'Critical Stock Depletion',
    sub: 'Nvidia RTX 4090 · SKU-9921',
    time: '2M AGO',
  },
  {
    dot: 'yellow',
    title: 'Shipment Delay Predicted',
    sub: 'Route: Shanghai → Long Beach',
    time: '46M AGO',
  },
  {
    dot: 'green',
    title: 'Inventory Reconciled',
    sub: 'Warehouse Zone B-12 status: Clear',
    time: '9H AGO',
  },
  {
    dot: 'red',
    title: 'Critical Stock Depletion',
    sub: 'Nvidia RTX 4090 · SKU-9921',
    time: '2M AGO',
  },
  {
    dot: 'yellow',
    title: 'Shipment Delay Predicted',
    sub: 'Route: Shanghai → Long Beach',
    time: '46M AGO',
  },
  {
    dot: 'green',
    title: 'Inventory Reconciled',
    sub: 'Warehouse Zone B-12 status: Clear',
    time: '9H AGO',
  },
];

const REORDERS = [
  {
    id: '#LENS-2981',
    name: 'Industrial Hub X1',
    cat: 'ELECTRONICS',
    stock: 12,
    stockVariant: 'red',
    optimal: 150,
    riskPct: 92,
    riskColor: 'green',
  },
  {
    id: '#LENS-4432',
    name: 'Thermal Coupling A4',
    cat: 'HARDWARE',
    stock: 88,
    stockVariant: 'red',
    optimal: 120,
    riskPct: 58,
    riskColor: 'yellow',
  },
  {
    id: '#LENS-8821',
    name: 'Fiber Optic Coil',
    cat: 'CONNECTIVITY',
    stock: 4,
    stockVariant: 'red',
    optimal: 40,
    riskPct: 18,
    riskColor: 'red',
  },
  {
    id: '#LENS-1184',
    name: 'Relay Module Gen-4',
    cat: 'ELECTRONICS',
    stock: 215,
    stockVariant: 'green',
    optimal: 300,
    riskPct: 72,
    riskColor: 'green',
  },
];

const StatCard = ({
  label,
  value,
  badge,
  badgeVariant,
  dotColor,
  valueColor,
}) => (
  <Card className="p-5  transform transition hover:scale-102 ">
    <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2 ">
      {label}
    </p>
    <p className={`text-3xl font-bold leading-none mb-3 ${valueColor}`}>
      {value}
    </p>
    <Badge variant={badgeVariant}>
      <Dot color={dotColor} />
      {badge}
    </Badge>
  </Card>
);

const AlertItem = ({ dot, title, sub, time }) => (
  <div
    className={`flex items-start gap-3 py-3 px-3 border-3  border-gray-50 border-l-3 ${borderColors[dot]} rounded-2xl cursor-pointer transform transition hover:scale-102 `}
  >
    <span className="mt-1 shrink-0">   
      <Dot color={dot} />
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-[12px] font-semibold text-gray-800 leading-tight">
        {title}
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5 truncate">{sub}</p>
    </div>
    <span className="text-[10px] text-gray-300 font-medium whitespace-nowrap mt-0.5">
      {time}
    </span>
  </div>
);

const StockBadge = ({ value, variant }) => {
  const s =
    variant === 'red'
      ? 'bg-status-critical/10 text-status-critical border border-red-100'
      : 'bg-status-healthy/10 text-status-healthy border border-green-100';
  return (
    <span
      className={`inline-block text-center text-[11px] font-bold px-2.5 py-1 rounded-md leading-tight ${s}`}
    >
      {value}
      <br />
      <span className="text-[9px] font-semibold opacity-70">UNITS</span>
    </span>
  );
};

const ReorderRow = ({
  id,
  name,
  cat,
  stock,
  stockVariant,
  optimal,
  riskPct,
  riskColor,
}) => (
  <tr className="border-b border-gray-50 last:border-0 cursor-pointer ">
    <td className="py-3.5 px-3 text-[11px] font-semibold text-primary whitespace-nowrap">
      {id}
    </td>
    <td className="py-3.5 px-3">
      <p className="text-[13px] font-bold text-gray-800 leading-tight">
        {name}
      </p>
      <p className="text-[10px] text-gray-400 tracking-wider mt-0.5">{cat}</p>
    </td>
    <td className="py-3.5 px-3">
      <StockBadge value={stock} variant={stockVariant} />
    </td>
    <td className="py-3.5 px-3 text-[12px] text-gray-500 whitespace-nowrap">
      {optimal} units
    </td>
    <td className="py-3.5 px-3">
      <RiskBar pct={riskPct} color={riskColor} />
    </td>
    <td className="py-3.5 px-3">
      <Button variant="outline">ORDER</Button>
    </td>
  </tr>
);


export const DashboardHome = () => {
  const [form, setForm] = useState({
    orderNumber: '',
    supplierId: '',
    productId: '',
    quantityOrdered: '',
    unitPrice: '',
    expectedDeliveryDate: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    const quantity = Number(form.quantityOrdered);
    const price = Number(form.unitPrice);

    try {
      const response = await createOrder({
        ...form,
        quantityOrdered: quantity,
        unitPrice: price,
        totalCost: quantity * price,
      });

      setMessage(response?.msg || 'Order created successfully');
      setForm({
        orderNumber: '',
        supplierId: '',
        productId: '',
        quantityOrdered: '',
        unitPrice: '',
        expectedDeliveryDate: '',
      });
    } catch (submitError) {
      setError(submitError.message || 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCost = Number(form.quantityOrdered || 0) * Number(form.unitPrice || 0);

  return (
    <div className=" p-5 font-sans ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Card className="p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Create Order</h2>
            <p className="text-[12px] text-gray-400 mt-1">Send a new purchase order to the backend.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="orderNumber" value={form.orderNumber} onChange={handleChange} placeholder="Order Number" className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />
          <input name="supplierId" value={form.supplierId} onChange={handleChange} placeholder="Supplier ID" className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />
          <input name="productId" value={form.productId} onChange={handleChange} placeholder="Product ID" className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />
          <input name="expectedDeliveryDate" type="date" value={form.expectedDeliveryDate} onChange={handleChange} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />
          <input name="quantityOrdered" type="number" min="1" value={form.quantityOrdered} onChange={handleChange} placeholder="Quantity" className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />
          <input name="unitPrice" type="number" min="0" step="0.01" value={form.unitPrice} onChange={handleChange} placeholder="Unit Price" className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" required />

          <div className="md:col-span-2 flex items-center justify-between gap-3 pt-1">
            <p className="text-sm text-gray-500">Total Cost: <span className="font-bold text-gray-900">{totalCost.toFixed(2)}</span></p>
            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {isSubmitting ? 'Creating...' : 'Create Order'}
            </button>
          </div>

          {message && <p className="md:col-span-2 text-sm text-status-healthy font-medium">{message}</p>}
          {error && <p className="md:col-span-2 text-sm text-status-critical font-medium">{error}</p>}
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-800">
                Priority Alerts
              </h2>
              <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                LIVE
              </span>
            </div>
            <div className="flex flex-col gap-4 ">
              {ALERTS.map((a) => (
                <AlertItem key={a.title} {...a} />
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Reorder Suggestions
              </h2>
            </div>
            <div className="flex gap-2">
             
                <button
                
                  className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <DownloadIcon size={14}/>
                </button>
              
            </div>
          </div>
          <p className="text-[12px] text-gray-400 mb-4">
            Automated replenishment insights based on velocity.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-135">
              <thead>
                <tr>
                  {['ID', 'Product', 'Stock', 'Optimal', 'Risk', 'Action'].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-semibold tracking-widest text-gray-400 uppercase px-3 py-2 border-b border-gray-50"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {REORDERS.map((r) => (
                  <ReorderRow key={r.id} {...r} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-50">
            <button className="text-[11px] font-bold tracking-widest text-gray-600 hover:text-gray-900 transition-colors">
              FULL INVENTORY REPORT →
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
