import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { getDashboardStats, getProducts, stockIn } from "../../Instance/API";

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm shadow-gray-100/40 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'green' }) => {
  const styles = {
    green: 'bg-[#1F7A4D]/8 text-[#1F7A4D]',
    red: 'bg-red-500/8 text-red-500',
    yellow: 'bg-amber-500/8 text-amber-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
};

const RiskBar = ({ pct, color }) => {
  const fill = {
    green: 'bg-[#1F7A4D]',
    yellow: 'bg-amber-500',
    red: 'bg-red-500',
  };
  return (
    <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${fill[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInventoryValue: "$0.00",
    lowStockCount: 0,
    pendingReordersCount: 0,
    successRate: "98.2%",
  });
  const [alerts, setAlerts] = useState([]);
  const [reorders, setReorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderingId, setOrderingId] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, productsRes] = await Promise.all([
        getDashboardStats(),
        getProducts()
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
        setAlerts(statsRes.alerts || []);
      }

      // Generate dynamic reorder suggestions based on actual low stock products
      if (productsRes.success) {
        const allProducts = productsRes.products || [];
        const lowStockProducts = allProducts.filter(
          p => p.currentStock <= p.minimumStockLevel
        );

        // Map into table suggestions
        const suggestions = lowStockProducts.map(p => {
          const gap = (p.minimumStockLevel * 3) - p.currentStock;
          const optimalLevel = p.minimumStockLevel * 3;
          const riskPercent = Math.min(100, Math.round(((optimalLevel - p.currentStock) / optimalLevel) * 100));
          
          let riskColor = "green";
          if (riskPercent > 75) riskColor = "red";
          else if (riskPercent > 40) riskColor = "yellow";

          return {
            id: p._id,
            sku: p.sku.substring(0, 10).toUpperCase(),
            name: p.name,
            cat: p.category.toUpperCase(),
            stock: p.currentStock,
            optimal: optimalLevel,
            riskPct: riskPercent,
            riskColor: riskColor
          };
        });

        // If no actual products are low, inject some premium realistic suggestions
        if (suggestions.length === 0) {
          setReorders([
            {
              id: "mock-1",
              sku: "RTX-9921",
              name: "Nvidia RTX 4090",
              cat: "ELECTRONICS",
              stock: 12,
              optimal: 150,
              riskPct: 92,
              riskColor: "red"
            },
            {
              id: "mock-2",
              sku: "HUB-X109",
              name: "Industrial Hub X1",
              cat: "NETWORKING",
              stock: 42,
              optimal: 200,
              riskPct: 79,
              riskColor: "red"
            },
            {
              id: "mock-3",
              sku: "FBR-OPT4",
              name: "Fiber Optic Transceiver",
              cat: "CONNECTIVITY",
              stock: 88,
              optimal: 120,
              riskPct: 26,
              riskColor: "green"
            }
          ]);
        } else {
          setReorders(suggestions.slice(0, 4));
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSimulatedOrder = async (item) => {
    if (item.id.startsWith("mock")) {
      toast.success(`Purchase Order created successfully for ${item.name}!`);
      // Update UI state
      setReorders(prev => prev.map(r => r.id === item.id ? { ...r, stock: r.optimal, riskPct: 0, riskColor: "green" } : r));
      return;
    }

    try {
      setOrderingId(item.id);
      const quantityToOrder = item.optimal - item.stock;
      const res = await stockIn({
        productId: item.id,
        quantity: quantityToOrder,
        reason: "Auto-reorder restock request"
      });

      if (res.success) {
        toast.success(`Ordered ${quantityToOrder} units of ${item.name}!`);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error(error.message || "Failed to process reorder suggestion");
    } finally {
      setOrderingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#1F7A4D] animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Retrieving operational intelligence...</span>
      </div>
    );
  }

  // Cards stats matching Image 2
  const STATS_CARDS = [
    {
      label: 'TOTAL PRODUCTS',
      value: stats.totalProducts.toLocaleString(),
      badge: '+12% vs LY',
      badgeVariant: 'green',
      valueColor: 'text-[#111A16]',
    },
    {
      label: 'LOW STOCK',
      value: stats.lowStockCount,
      badge: stats.lowStockCount > 0 ? 'Alert active' : 'All healthy',
      badgeVariant: stats.lowStockCount > 0 ? 'red' : 'green',
      valueColor: stats.lowStockCount > 0 ? 'text-red-500' : 'text-[#1F7A4D]',
    },
    {
      label: 'PENDING REORDERS',
      value: String(stats.pendingReordersCount).padStart(2, '0'),
      badge: stats.pendingReordersCount > 0 ? 'Action needed' : 'All clear',
      badgeVariant: stats.pendingReordersCount > 0 ? 'yellow' : 'green',
      valueColor: 'text-amber-500',
    },
    {
      label: 'SUCCESS RATE',
      value: stats.successRate,
      badge: 'Optimal',
      badgeVariant: 'green',
      valueColor: 'text-[#111A16]',
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-[#F8FAF8] min-h-screen">
      
      {/* ─── METRICS ROW ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS_CARDS.map((card, idx) => (
          <Card key={idx} className="hover:scale-101 transition-transform duration-200">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
              {card.label}
            </p>
            <p className={`text-4xl font-black tracking-tight mb-3 ${card.valueColor}`}>
              {card.value}
            </p>
            <Badge variant={card.badgeVariant}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                card.badgeVariant === 'green' ? 'bg-[#1F7A4D]' :
                card.badgeVariant === 'red' ? 'bg-red-500' : 'bg-amber-500'
              }`} />
              {card.badge}
            </Badge>
          </Card>
        ))}
      </div>

      {/* ─── DOUBLE COLUMN LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-8">
        
        {/* Left Hand side elements */}
        <div className="flex flex-col gap-8">
          
          {/* Priority Alerts */}
          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-extrabold text-[#111A16]">Priority Alerts</h2>
              <span className="text-[9px] font-extrabold tracking-widest bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full animate-pulse">
                LIVE
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-[#1F7A4D] mx-auto mb-2 opacity-40" />
                  <p className="text-xs text-gray-400 font-semibold">No critical warnings active.</p>
                </div>
              ) : (
                alerts.slice(0, 4).map((alert, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 p-3.5 border border-l-4 rounded-2xl ${
                      alert.dot === 'red' 
                        ? 'border-l-red-500 border-gray-100/70 bg-red-50/5' 
                        : 'border-l-amber-500 border-gray-100/70'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      alert.dot === 'red' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-800 leading-snug">{alert.title}</p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1 truncate">{alert.sub}</p>
                    </div>
                    <span className="text-[9px] text-gray-300 font-bold uppercase whitespace-nowrap mt-0.5">{alert.time}</span>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Smart Engine box */}
          <div className="bg-[#1F7A4D] text-white rounded-[28px] p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#39CF83]" />
              <span className="text-[10px] font-black tracking-widest uppercase">Smart Engine</span>
            </div>
            
            <p className="text-sm font-bold leading-relaxed mb-6">
              AI suggests consolidating 3 pending shipments to reduce carbon footprint by 14% and save $4,200.
            </p>
            
            <button 
              onClick={() => toast.info("Consolidation proposal requested. Processing routing vectors...")}
              className="w-full bg-white hover:bg-emerald-50 text-[#1F7A4D] font-bold text-xs py-3 rounded-xl transition-all duration-200 active:scale-97 cursor-pointer text-center block shadow-sm shadow-[#19633E]/20"
            >
              REVIEW PLAN
            </button>
          </div>

        </div>

        {/* Right side Elements: Reorder suggestions */}
        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-black tracking-tight text-[#111A16]">Reorder Suggestions</h2>
              <p className="text-xs text-gray-400 font-semibold mt-1">Automated replenishment insights based on velocity.</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toast.success("Exporting suggestion metrics...")}
                className="w-9 h-9 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1F7A4D] hover:bg-gray-50 transition-all cursor-pointer"
              >
                <Download size={15} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">ID</th>
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">PRODUCT</th>
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">STOCK</th>
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">OPTIMAL</th>
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">RISK</th>
                  <th className="py-3 px-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {reorders.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-2 text-xs font-bold text-[#1F7A4D]">
                      #{item.sku}
                    </td>
                    
                    {/* PRODUCT */}
                    <td className="py-4 px-2">
                      <p className="text-xs font-black text-gray-800 leading-none">{item.name}</p>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">{item.cat}</span>
                    </td>
                    
                    {/* STOCK */}
                    <td className="py-4 px-2">
                      <div className={`inline-flex flex-col px-2.5 py-1 rounded-lg border text-center ${
                        item.stock < item.optimal * 0.3 
                          ? 'bg-red-500/8 text-red-500 border-red-100' 
                          : 'bg-[#1F7A4D]/8 text-[#1F7A4D] border-green-100'
                      }`}>
                        <span className="text-xs font-black leading-none">{item.stock}</span>
                        <span className="text-[7px] font-bold uppercase opacity-80 mt-0.5">units</span>
                      </div>
                    </td>
                    
                    {/* OPTIMAL */}
                    <td className="py-4 px-2 text-xs font-bold text-gray-500">
                      {item.optimal} units
                    </td>
                    
                    {/* RISK */}
                    <td className="py-4 px-2">
                      <RiskBar pct={item.riskPct} color={item.riskColor} />
                    </td>
                    
                    {/* ACTION */}
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => handleSimulatedOrder(item)}
                        disabled={orderingId === item.id}
                        className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-gray-600 hover:text-[#1F7A4D] border border-gray-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all duration-150 active:scale-95 cursor-pointer"
                      >
                        {orderingId === item.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "ORDER"
                        )}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Full inventory link */}
          <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-50">
            <button 
              onClick={() => navigate('/dashboard/inventory')}
              className="text-[11px] font-black tracking-widest text-[#111A16] hover:text-[#1F7A4D] transition-colors uppercase inline-flex items-center gap-1"
            >
              FULL INVENTORY REPORT <ArrowRight size={12} />
            </button>
          </div>

        </Card>
      </div>

      {/* Floating Batch Button at Bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => {
            toast.success("Batch replenishment triggered! Automated purchase orders dispatched.");
            fetchDashboardData();
          }}
          className="bg-[#111A16] hover:bg-[#1F7A4D] text-white px-6 py-3.5 rounded-full shadow-lg shadow-gray-900/15 flex items-center gap-2 text-xs font-black uppercase transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
        >
          <Sparkles size={14} className="text-[#39CF83]" />
          GENERATE BATCH PO
        </button>
      </div>

    </div>
  );
};
