import React, { useEffect, useState } from "react";
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  RefreshCcw
} from "lucide-react";
import { toast } from "sonner";
import { getOrders } from "../../Instance/API";

export const DashboardDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      if (res.success) {
        setOrders(res.purchaseOrders || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load purchase orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return { text: "Delivered", bg: "bg-[#1F7A4D]/8 text-[#1F7A4D]", border: "border-green-100" };
      case "shipped":
        return { text: "In Transit", bg: "bg-indigo-500/8 text-indigo-500", border: "border-indigo-100" };
      case "cancelled":
        return { text: "Cancelled", bg: "bg-red-500/8 text-red-500", border: "border-red-100" };
      default:
        return { text: "Pending Approval", bg: "bg-amber-500/8 text-amber-500", border: "border-amber-100" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3 bg-[#F8FAF8]">
        <Loader2 className="w-10 h-10 text-[#1F7A4D] animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Connecting shipments ledger...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#F8FAF8] min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-[#1F7A4D] bg-[#1F7A4D]/8 px-2.5 py-1 rounded-full uppercase">
            LOGISTICS CENTRAL • Fleet Operations
          </span>
          <h1 className="text-3xl font-black text-[#111A16] tracking-tight mt-3">Shipment Tracking</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Real-time delivery progress, estimated arrival times, and carrier allocation indices.
          </p>
        </div>

        <button 
          onClick={fetchOrders}
          className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#1F7A4D] hover:bg-gray-50 transition-all cursor-pointer"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {/* SHIPMENTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[28px] p-12 text-center shadow-sm col-span-2">
            <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3 opacity-60" />
            <p className="text-sm text-gray-400 font-semibold">No active shipments logged in system.</p>
          </div>
        ) : (
          orders.map((order) => {
            const status = getStatusStyle(order.status);
            return (
              <div 
                key={order._id}
                className="bg-white border border-gray-100 rounded-[26px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-5"
              >
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      ORDER #{order._id.substring(18).toUpperCase()}
                    </span>
                    <h3 className="text-base font-black text-gray-800 mt-1 leading-snug">
                      {order.supplier?.name || "Global Distributor"}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">
                      {order.supplier?.contactPerson || "B2B Logistics Operations"}
                    </p>
                  </div>
                  
                  <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${status.bg} ${status.border}`}>
                    {status.text}
                  </span>
                </div>

                {/* Items preview */}
                <div className="bg-gray-50 border border-gray-100/50 rounded-2xl p-4 flex flex-col gap-2">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">ITEMS CONSOLIDATED</span>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-700">{item.product?.name || "Catalog Product"}</span>
                      <span className="font-extrabold text-[#1F7A4D] bg-[#1F7A4D]/8 px-2 py-0.5 rounded-md text-[10px]">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-xs font-bold text-gray-500">
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} className="text-gray-400" />
                    <span>${order.totalAmount?.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />
                    <span>ETA: {new Date(order.expectedDeliveryDate || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
