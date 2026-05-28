import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Download, 
  Search, 
  SlidersHorizontal, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Trash2, 
  Edit3, 
  RefreshCcw,
  Boxes,
  AlertOctagon,
  Truck,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import { 
  getProducts, 
  createProduct, 
  deleteProduct, 
  getSuppliers, 
  stockIn, 
  stockOut 
} from "../../Instance/API";

export const DashboardInventory = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // All | Low Stock | In Transit
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add Product Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    unitPrice: "",
    currentStock: "",
    minimumStockLevel: "",
    safetyStock: "0",
    supplierId: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Quick Adjustment Form state
  const [adjustment, setAdjustment] = useState({
    type: "IN", // IN | OUT
    quantity: "",
    reason: ""
  });
  const [adjusting, setAdjusting] = useState(false);

  // Dropdown menu state
  const [activeMenuId, setActiveMenuId] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const [prodRes, supRes] = await Promise.all([
        getProducts(),
        getSuppliers()
      ]);

      if (prodRes.success) {
        setProducts(prodRes.products || []);
      }
      if (supRes.success) {
        setSuppliers(supRes.suppliers || []);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load inventory logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.supplierId) {
      toast.error("Please select a supplier");
      return;
    }

    try {
      setSubmitting(true);
      const res = await createProduct({
        ...newProduct,
        unitPrice: Number(newProduct.unitPrice),
        currentStock: Number(newProduct.currentStock),
        minimumStockLevel: Number(newProduct.minimumStockLevel),
        safetyStock: Number(newProduct.safetyStock)
      });

      if (res.success) {
        toast.success("Product created successfully");
        setShowAddModal(false);
        setNewProduct({
          name: "",
          sku: "",
          category: "",
          description: "",
          unitPrice: "",
          currentStock: "",
          minimumStockLevel: "",
          safetyStock: "0",
          supplierId: ""
        });
        fetchInventory();
      }
    } catch (error) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickAdjustment = async (e) => {
    e.preventDefault();
    if (!adjustment.quantity || !adjustment.reason) {
      toast.error("Please fill in all adjustment fields");
      return;
    }

    try {
      setAdjusting(true);
      const payload = {
        productId: selectedProduct._id,
        quantity: Number(adjustment.quantity),
        reason: adjustment.reason
      };

      const res = adjustment.type === "IN" 
        ? await stockIn(payload) 
        : await stockOut(payload);

      if (res.success) {
        toast.success(`Inventory updated successfully! New Stock: ${res.data.currentStock}`);
        setShowAdjustModal(false);
        setAdjustment({ type: "IN", quantity: "", reason: "" });
        fetchInventory();
      }
    } catch (error) {
      toast.error(error.message || "Adjustment failed");
    } finally {
      setAdjusting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await deleteProduct(productId);
      if (res.success) {
        toast.success("Product deleted successfully");
        fetchInventory();
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  // Derive inventory summary metrics dynamically
  const totalSkus = products.length;
  const lowStockCount = products.filter(p => p.currentStock <= p.minimumStockLevel).length;
  const inTransitCount = 842; // Mocked context
  const totalValue = products.reduce((acc, p) => acc + (Number(p.unitPrice || p.price || 0) * Number(p.currentStock || p.stockQuantity || 0)), 0);

  // Filter products based on search term & active tab
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "Low Stock") {
      return matchesSearch && (p.currentStock <= p.minimumStockLevel);
    }
    if (activeTab === "Incoming") {
      return matchesSearch && (p.currentStock < p.minimumStockLevel * 2);
    }
    return matchesSearch;
  });

  // Paginated products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getStockStatus = (stock, min, safety) => {
    if (stock === 0) return { pct: 0, text: "CRITICAL", color: "red" };
    if (stock <= min) return { pct: 20, text: "CRITICAL", color: "red" };
    if (stock <= min * 1.5) return { pct: 45, text: "RESTOCKING", color: "yellow" };
    if (stock >= min * 3) return { pct: 90, text: "OPTIMAL", color: "green" };
    return { pct: 70, text: "HEALTHY", color: "green" };
  };

  const getRandomAvatarChar = (category) => {
    return category ? category.charAt(0).toUpperCase() : "P";
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#1F7A4D] animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Loading catalog logs...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#F8FAF8] min-h-screen relative">
      
      {/* ─── TITLE HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-[#1F7A4D] bg-[#1F7A4D]/8 px-2.5 py-1 rounded-full uppercase">
            WAREHOUSE A-12 • Updated Just Now
          </span>
          <h1 className="text-3xl font-black text-[#111A16] tracking-tight mt-3">Inventory Control</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Real-time supply chain monitoring and asset management across global hubs.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.success("Exporting catalog CSV...")}
            className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-[#1F7A4D] hover:bg-[#19633E] text-white px-5 py-3 rounded-xl text-xs font-extrabold shadow-sm shadow-[#1F7A4D]/15 active:scale-97 transition-all cursor-pointer"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* ─── KPI SUMMARY CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* TOTAL SKUS */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1F7A4D]/8 rounded-2xl flex items-center justify-center text-[#1F7A4D] shrink-0">
            <Boxes size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">TOTAL SKUS</p>
            <p className="text-2xl font-black text-[#111A16] mt-1.5">{totalSkus}</p>
            <span className="text-[9px] font-bold text-[#1F7A4D] bg-[#1F7A4D]/8 px-1.5 py-0.5 rounded-full mt-1.5 inline-block">+12.5%</span>
          </div>
        </div>

        {/* LOW STOCK */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/8 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
            <AlertOctagon size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">LOW STOCK</p>
            <p className="text-2xl font-black text-red-500 mt-1.5">{lowStockCount}</p>
            <span className="text-[9px] font-bold text-red-500 bg-red-500/8 px-1.5 py-0.5 rounded-full mt-1.5 inline-block">Reorder suggestion</span>
          </div>
        </div>

        {/* IN TRANSIT */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/8 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">IN TRANSIT</p>
            <p className="text-2xl font-black text-[#111A16] mt-1.5">{inTransitCount}</p>
            <span className="text-[9px] font-bold text-indigo-500 bg-indigo-500/8 px-1.5 py-0.5 rounded-full mt-1.5 inline-block">Global transit feed</span>
          </div>
        </div>

        {/* INVENTORY VALUE */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/8 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">INVENTORY VALUE</p>
            <p className="text-2xl font-black text-[#111A16] mt-1.5">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <span className="text-[9px] font-bold text-amber-500 bg-amber-500/8 px-1.5 py-0.5 rounded-full mt-1.5 inline-block">Real asset value</span>
          </div>
        </div>

      </div>

      {/* ─── FILTERS & SEARCH ROW ─── */}
      <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        
        {/* Tab Pills */}
        <div className="flex gap-1.5 bg-gray-50 p-1 rounded-2xl w-full md:w-auto">
          {["All", "Low Stock", "Incoming"].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`flex-1 md:flex-initial text-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-[#1F7A4D] shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === "All" ? "All Inventory" : tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={14} className="absolute left-3.5 inset-y-0 my-auto text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search SKU, name, or tags..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border-0 outline-none text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]/40"
            />
          </div>
          
          <button className="w-10 h-10 border border-gray-100 hover:bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 cursor-pointer">
            <SlidersHorizontal size={14} />
          </button>
        </div>

      </div>

      {/* ─── DATA TABLE ─── */}
      <div className="bg-white border border-gray-100 rounded-[28px] shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/10">
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">PRODUCT DETAILS</th>
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">SKU / BATCH</th>
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">STOCK STATUS</th>
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">WAREHOUSE</th>
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">UNIT PRICE</th>
                <th className="py-4 px-6 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-20">
                    <Boxes className="w-12 h-12 text-gray-300 mx-auto mb-3 opacity-60" />
                    <p className="text-sm text-gray-400 font-semibold">No items matched your search filter.</p>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => {
                  const status = getStockStatus(item.currentStock, item.minimumStockLevel, item.safetyStock);
                  return (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/20 transition-colors relative">
                      
                      {/* PRODUCT DETAILS */}
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center font-black text-sm shrink-0">
                          {getRandomAvatarChar(item.category)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-gray-800 leading-tight">{item.name}</p>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                            {item.category || "General"}
                          </span>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-4 px-6 text-xs font-bold text-[#1F7A4D] whitespace-nowrap">
                        {item.sku.toUpperCase()}
                      </td>

                      {/* STOCK STATUS */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                status.color === 'green' ? 'bg-[#1F7A4D]' :
                                status.color === 'red' ? 'bg-red-500' : 'bg-amber-500'
                              }`} 
                              style={{ width: `${status.pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 whitespace-nowrap">
                            {item.currentStock} / {item.minimumStockLevel * 3} UNITS
                          </span>
                          <span className={`text-[8px] font-black tracking-wider px-2 py-0.5 rounded-md ${
                            status.color === 'green' ? 'bg-[#1F7A4D]/8 text-[#1F7A4D]' :
                            status.color === 'red' ? 'bg-red-500/8 text-red-500 animate-pulse' : 'bg-amber-500/8 text-amber-500'
                          }`}>
                            {status.text}
                          </span>
                        </div>
                      </td>

                      {/* WAREHOUSE */}
                      <td className="py-4 px-6 text-xs font-semibold text-gray-500 whitespace-nowrap">
                        Global Hub North
                      </td>

                      {/* PRICE */}
                      <td className="py-4 px-6 text-xs font-bold text-gray-800 whitespace-nowrap">
                        ${Number(item.unitPrice || item.price).toFixed(2)}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-6 text-right relative">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === item._id ? null : item._id)}
                          className="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer inline-flex"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {/* Floating Action Menu dropdown */}
                        {activeMenuId === item._id && (
                          <div className="absolute right-6 top-14 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-30 w-44 text-left">
                            <button 
                              onClick={() => {
                                setSelectedProduct(item);
                                setAdjustment({ type: "IN", quantity: "", reason: "" });
                                setShowAdjustModal(true);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-[11px] font-bold text-gray-600 hover:text-[#1F7A4D] hover:bg-[#1F7A4D]/8 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <RefreshCcw size={12} />
                              Quick Adjust
                            </button>
                            <button 
                              onClick={() => {
                                handleDelete(item._id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-500/8 rounded-lg flex items-center gap-2 cursor-pointer transition-colors border-t border-gray-50 mt-1"
                            >
                              <Trash2 size={12} />
                              Delete Product
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── PAGINATION ─── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-[22px] shadow-sm">
          <p className="text-xs font-semibold text-gray-400">
            Showing <span className="text-gray-700 font-bold">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)}</span> of <span className="text-gray-700 font-bold">{filteredProducts.length}</span> items
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1F7A4D] hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1F7A4D] hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ─── ADD PRODUCT MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#111A16]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-gray-50 p-6 sm:p-8 w-full max-w-xl shadow-2xl relative">
            <h3 className="text-xl font-black text-[#111A16] tracking-tight">Add New Catalog Product</h3>
            <p className="text-xs text-gray-400 font-semibold mt-1">Populate details and allocate safety boundaries.</p>

            <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4 mt-6">
              
              <div className="col-span-2">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Runner v4"
                  value={newProduct.name}
                  onChange={e => setNewProduct(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">SKU Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. APX-4922-RD"
                  value={newProduct.sku}
                  onChange={e => setNewProduct(prev => ({...prev, sku: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Footwear"
                  value={newProduct.category}
                  onChange={e => setNewProduct(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Description</label>
                <textarea
                  placeholder="Brief warehouse notes..."
                  value={newProduct.description}
                  onChange={e => setNewProduct(prev => ({...prev, description: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white h-20 resize-none focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Unit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="124.50"
                  value={newProduct.unitPrice}
                  onChange={e => setNewProduct(prev => ({...prev, unitPrice: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Current Stock</label>
                <input
                  type="number"
                  required
                  placeholder="840"
                  value={newProduct.currentStock}
                  onChange={e => setNewProduct(prev => ({...prev, currentStock: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Minimum Level</label>
                <input
                  type="number"
                  required
                  placeholder="100"
                  value={newProduct.minimumStockLevel}
                  onChange={e => setNewProduct(prev => ({...prev, minimumStockLevel: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Safety Stock</label>
                <input
                  type="number"
                  required
                  placeholder="20"
                  value={newProduct.safetyStock}
                  onChange={e => setNewProduct(prev => ({...prev, safetyStock: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Allocated Supplier</label>
                <select
                  required
                  value={newProduct.supplierId}
                  onChange={e => setNewProduct(prev => ({...prev, supplierId: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D] cursor-pointer"
                >
                  <option value="">Select an operating supplier...</option>
                  {suppliers.map(sup => (
                    <option key={sup._id} value={sup._id}>{sup.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3 mt-4 border-t border-gray-50 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 rounded-xl text-xs font-extrabold bg-[#1F7A4D] hover:bg-[#19633E] text-white flex items-center gap-1.5 active:scale-97 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Create Product"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ─── QUICK ADJUSTMENT MODAL ─── */}
      {showAdjustModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#111A16]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-gray-50 p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-black text-[#111A16] tracking-tight">Quick Stock Adjustment</h3>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              Adjusting: <span className="text-[#1F7A4D] font-bold">{selectedProduct.name}</span> (Current Stock: {selectedProduct.currentStock})
            </p>

            <form onSubmit={handleQuickAdjustment} className="flex flex-col gap-4 mt-6">
              
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Adjustment Mode</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setAdjustment(prev => ({...prev, type: "IN"}))}
                    className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      adjustment.type === "IN" 
                        ? 'bg-white text-[#1F7A4D] shadow-sm' 
                        : 'text-gray-400'
                    }`}
                  >
                    Receive Stock (IN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustment(prev => ({...prev, type: "OUT"}))}
                    className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      adjustment.type === "OUT" 
                        ? 'bg-white text-red-500 shadow-sm' 
                        : 'text-gray-400'
                    }`}
                  >
                    Ship Stock (OUT)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Adjustment Quantity</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 50"
                  value={adjustment.quantity}
                  onChange={e => setAdjustment(prev => ({...prev, quantity: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">Reason / Note</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supplier Bulk Delivery / Customer sale"
                  value={adjustment.reason}
                  onChange={e => setAdjustment(prev => ({...prev, reason: e.target.value}))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-50 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-5 py-3 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adjusting}
                  className={`px-5 py-3 rounded-xl text-xs font-extrabold text-white flex items-center gap-1.5 active:scale-97 cursor-pointer ${
                    adjustment.type === "IN" ? 'bg-[#1F7A4D] hover:bg-[#19633E]' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {adjusting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Save Adjustment"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
