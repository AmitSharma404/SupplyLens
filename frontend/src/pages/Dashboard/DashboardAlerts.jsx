import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Thermometer, 
  ArrowRight, 
  FileText, 
  Activity, 
  Clock, 
  SlidersHorizontal,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { getDashboardStats, getProducts } from "../../Instance/API";

export const DashboardAlerts = () => {
  const [activeTab, setActiveTab] = useState("All"); // All | Critical | Low Stock | Delayed Shipments | Regulatory
  const [loading, setLoading] = useState(true);
  const [dbLowStockAlerts, setDbLowStockAlerts] = useState([]);

  const fetchAlertsData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      if (res.success) {
        const lowProducts = res.products.filter(p => p.currentStock <= p.minimumStockLevel);
        const mapped = lowProducts.map(p => ({
          id: p._id,
          type: "Low Stock",
          level: "Warning", // Yellow
          title: "Safety Buffer Depleting",
          sub: `${p.name} • SKU: ${p.sku.toUpperCase()}`,
          body: `Stock quantity is at ${p.currentStock} units, well below the safety stock threshold margin of ${p.minimumStockLevel}. Replenishment lead time is currently 8 days.`,
          metrics: [
            { label: "Stock Level", val: `${p.currentStock} units`, color: "red" },
            { label: "Lead Time", val: "8 Days", color: "gray" }
          ],
          actions: [
            { text: "Audit Logs", variant: "outline", action: () => toast.info("Opening audit logs...") },
            { text: "Restock Now", variant: "dark", action: () => toast.success(`Replenishment order triggered for ${p.name}!`) }
          ]
        }));
        setDbLowStockAlerts(mapped);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load active DB alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertsData();
  }, []);

  // Static global disruption and compliance alerts to complement live data
  const staticAlerts = [
    {
      id: "shanghai-delay",
      type: "Delayed Shipments",
      level: "Critical", // Red
      title: "Route Disruption Predicted",
      sub: "Route: Shanghai (CNSHA) → Port of Long Beach (USLGB)",
      body: "Predictive engine anticipates a 14-day delay due to severe weather patterns in the North Pacific. Recommended: Reroute via Prince Rupert.",
      routeVisual: {
        from: "Shanghai (CNSHA)",
        to: "Port of Long Beach (USLGB)",
        alternative: "Prince Rupert (YPR)",
        activeDelay: "14-Day Delay"
      },
      actions: [
        { text: "View Impact", variant: "outline", action: () => toast.info("Running impact mapping matrix...") },
        { text: "Re-route Shipment", variant: "dark", action: () => toast.success("Rerouting shipment via Prince Rupert (YPR)!") }
      ]
    },
    {
      id: "cold-chain-breach",
      type: "Critical",
      level: "Critical", // Red
      title: "Cold Chain Breach Logged",
      sub: "Container: #CON-8832 • Temperature Deviation",
      body: "Sensor logged container temperature spike to 8.2°C (target limit: 2.0°C). Cargo: Biomedical Components.",
      metrics: [
        { label: "Spike Logged", val: "8.2°C", color: "red" },
        { label: "Sensor ID", val: "Temp-S4", color: "gray" }
      ],
      actions: [
        { text: "View Impact", variant: "outline", action: () => toast.info("Assessing cargo heat exposure index...") },
        { text: "Audit Logs", variant: "outline", action: () => toast.info("Downloading historical logs...") }
      ]
    },
    {
      id: "supplier-compliance",
      type: "Regulatory",
      level: "Sync", // Green
      title: "Compliance Audit Completed",
      sub: "Supplier: Industrial Tech Corp",
      body: "Quarterly supplier reliability and delivery auditing has finished. Reliability score has been updated to 94.6%.",
      actions: [
        { text: "Audit Logs", variant: "outline", action: () => toast.info("Opening supplier records...") },
        { text: "Full Report", variant: "outline", action: () => toast.info("Downloading compliance PDF report...") }
      ]
    }
  ];

  // Combine live and static alerts
  const allAlerts = [...staticAlerts, ...dbLowStockAlerts];

  // Filter alerts by active tab
  const filteredAlerts = allAlerts.filter(alert => {
    if (activeTab === "All") return true;
    if (activeTab === "Critical") return alert.level === "Critical";
    if (activeTab === "Low Stock") return alert.type === "Low Stock";
    if (activeTab === "Delayed Shipments") return alert.type === "Delayed Shipments";
    if (activeTab === "Regulatory") return alert.type === "Regulatory";
    return true;
  });

  const getLevelStyles = (level) => {
    switch (level) {
      case "Critical":
        return { border: "border-l-red-500", text: "text-red-500", bg: "bg-red-500/8" };
      case "Warning":
        return { border: "border-l-amber-500", text: "text-amber-500", bg: "bg-amber-500/8" };
      default:
        return { border: "border-l-[#1F7A4D]", text: "text-[#1F7A4D]", bg: "bg-[#1F7A4D]/8" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#1F7A4D] animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Querying active alerts stream...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#F8FAF8] min-h-screen">
      
      {/* ─── TITLE HEADER ─── */}
      <div className="mb-8">
        <span className="text-[10px] font-extrabold tracking-widest text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full uppercase">
          CENTRAL COMMAND • Real-time Monitoring
        </span>
        <h1 className="text-3xl font-black text-[#111A16] tracking-tight mt-3">Alerts Center</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          Real-time visibility into supply chain bottlenecks, compliance updates, and active exceptions.
        </p>
      </div>

      {/* ─── FILTERS BAR ─── */}
      <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {["All", "Critical", "Low Stock", "Delayed Shipments", "Regulatory"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-[#111A16] text-white shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 bg-gray-50/50'
              }`}
            >
              {tab === "All" ? "All Alerts" : tab}
            </button>
          ))}
        </div>

        <button className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer w-full md:w-auto justify-center">
          <SlidersHorizontal size={14} />
          Filters
        </button>

      </div>

      {/* ─── ALERTS LIST ─── */}
      <div className="flex flex-col gap-6 max-w-4xl">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[28px] p-12 text-center shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-[#1F7A4D] mx-auto mb-3 opacity-60" />
            <p className="text-sm text-gray-400 font-semibold">All supply legs are performing optimally. No exceptions found.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const levelStyle = getLevelStyles(alert.level);
            return (
              <div 
                key={alert.id}
                className={`bg-white border border-gray-100 border-l-4 rounded-[26px] p-6 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow ${levelStyle.border}`}
              >
                
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-md ${levelStyle.bg} ${levelStyle.text}`}>
                        {alert.level === "Sync" ? "Operational Sync" : alert.level}
                      </span>
                      <span className="text-[10px] font-bold text-gray-300">• {alert.type}</span>
                    </div>
                    <h3 className="text-base font-black text-gray-800 mt-2 leading-tight">{alert.title}</h3>
                    <p className="text-xs text-gray-400 font-bold mt-1">{alert.sub}</p>
                  </div>
                  
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Just Now</span>
                </div>

                {/* Body Content */}
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl">
                  {alert.body}
                </p>

                {/* Route Visualizer if present (上海 -> Long Beach) */}
                {alert.routeVisual && (
                  <div className="bg-gray-50 border border-gray-100/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase">
                        {alert.routeVisual.from}
                      </div>
                      <span className="text-gray-300 font-bold text-lg">→</span>
                      <div className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase">
                        {alert.routeVisual.to}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-red-500 font-extrabold text-[10px] uppercase bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      <AlertTriangle size={12} />
                      {alert.routeVisual.activeDelay}
                    </div>
                    <div className="flex items-center gap-2 text-[#1F7A4D] font-extrabold text-[10px] uppercase bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                      <CheckCircle2 size={12} />
                      Reroute: {alert.routeVisual.alternative}
                    </div>
                  </div>
                )}

                {/* Metrics Pill Grid if present */}
                {alert.metrics && (
                  <div className="flex flex-wrap gap-3">
                    {alert.metrics.map((metric, i) => (
                      <div 
                        key={i} 
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold ${
                          metric.color === "red" 
                            ? "bg-red-500/8 text-red-500 border-red-100" 
                            : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                      >
                        <span className="opacity-80">{metric.label}:</span>
                        <span className="font-extrabold">{metric.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions bottom strip */}
                <div className="flex items-center gap-3 border-t border-gray-50 pt-4 mt-2 justify-end">
                  {alert.actions.map((btn, i) => (
                    <button
                      key={i}
                      onClick={btn.action}
                      className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer ${
                        btn.variant === "dark" 
                          ? 'bg-[#111A16] hover:bg-[#1F7A4D] text-white' 
                          : 'border border-gray-200 hover:bg-gray-50 text-gray-600 bg-white'
                      }`}
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
