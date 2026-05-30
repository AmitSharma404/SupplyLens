import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';
import { fetchSuppliers } from '../redux/slices/supplierSlice';
import FormInput from '../components/auth/FormInput';
import SubmitButton from '../components/auth/SubmitButton';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: suppliers } = useSelector(state => state.suppliers);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', sku: '', category: '', quantity: '', reorderPoint: '', supplier: '', price: '' });

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!form.supplier) {
      toast.error("Please select a supplier");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        name: form.name,
        sku: form.sku,
        category: form.category,
        currentStock: Number(form.quantity),
        lowStockThreshold: Number(form.reorderPoint),
        price: Number(form.price),
        supplierId: form.supplier,
      };
      
      await dispatch(addProduct(productData)).unwrap();
      toast.success(`${form.name} added to inventory`);
      navigate('/dashboard/inventory');
    } catch (err) {
      toast.error(err || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="p-8 max-w-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 style={{ fontSize: '28px', fontWeight: 500, letterSpacing: '-0.8px', marginBottom: '32px' }}>Add Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormInput label="Product Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rice Flour 5kg" required />
        <FormInput label="SKU" name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. SKU-0285" required />
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Raw Materials" />
          <FormInput label="Price (Unit)" type="number" name="price" value={form.price} onChange={handleChange} placeholder="0.00" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Quantity" type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="0" required />
          <FormInput label="Reorder Point" type="number" name="reorderPoint" value={form.reorderPoint} onChange={handleChange} placeholder="50" />
        </div>
        
        <div className="flex flex-col gap-2">
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text)' }}>Supplier</label>
          <select 
            name="supplier" 
            value={form.supplier} 
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-[8px] outline-none transition-colors"
            style={{ background: 'var(--app-bg)', border: '1px solid var(--border)', color: 'var(--app-text)', fontSize: '14px' }}
            required
          >
            <option value="">Select a supplier</option>
            {suppliers && suppliers.map(s => (
              <option key={s._id || s.id} value={s._id || s.id}>{s.name || s.companyName}</option>
            ))}
          </select>
        </div>
        <SubmitButton loading={loading}>Add Product</SubmitButton>
      </form>
    </motion.div>
  );
};

export default AddProduct;
