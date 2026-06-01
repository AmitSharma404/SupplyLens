import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Database, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { getUsers, updateUserRole } from '../../Instance/API';
import RoleGuard from '../../components/RoleGuard';

export const DashboardSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const [threshold, setThreshold] = useState(25);
  const [usersList, setUsersList] = useState([]);

  const handleSave = (e) => { e.preventDefault(); toast.success('Settings saved'); };

  const fetchAllUsers = async () => {
    try {
      const res = await getUsers();
      if (Array.isArray(res)) {
        setUsersList(res);
      } else if (res && res.users) {
        setUsersList(res.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success('User role updated');
      fetchAllUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllUsers();
    }
  }, [user]);

  return (
    <motion.div className="p-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="mb-8" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500, letterSpacing: '-1px' }}>Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">
        {/* Account */}
        <div className="p-6 rounded-[16px] flex flex-col gap-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--app-overlay)', color: 'var(--app-text)' }}><Shield size={16} /></div>
            <div><h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>Account</h3><p style={{ fontSize: '12px', color: 'var(--app-text-muted)' }}>Login details</p></div>
          </div>
          {[{ label: 'Name', value: user?.name || 'User' }, { label: 'Email', value: user?.email || 'user@co.com' }, { label: 'Role', value: user?.role?.toUpperCase() || 'ADMIN' }].map(f => (
            <div key={f.label}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--app-text-muted)', marginBottom: '6px' }}>{f.label}</p>
              <p className="px-4 py-2.5 rounded-[10px]" style={{ fontSize: '14px', color: f.label === 'Role' ? 'var(--accent)' : 'var(--app-text)', background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}>{f.value}</p>
            </div>
          ))}
        </div>
        {/* Inventory Params */}
        <div className="p-6 rounded-[16px] flex flex-col gap-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--app-overlay)', color: 'var(--app-text)' }}><Settings size={16} /></div>
            <div><h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>Inventory Parameters</h3><p style={{ fontSize: '12px', color: 'var(--app-text-muted)' }}>Thresholds</p></div>
          </div>
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--app-text-muted)', marginBottom: '8px' }}>Safety Threshold</label>
              <div className="flex items-center gap-4">
                <input type="range" min="10" max="50" value={threshold} onChange={e => setThreshold(Number(e.target.value))} className="flex-1" style={{ accentColor: 'var(--accent)' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, fontFamily: 'var(--font-mono)', color: 'var(--app-text)' }}>{threshold}%</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--app-text-muted)', marginBottom: '8px' }}>Lead Days Buffer</label>
              <input type="number" defaultValue={3} className="w-full py-[10px] px-[14px] rounded-[10px] outline-none" style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)', fontSize: '14px', color: 'var(--app-text)' }} />
            </div>
            <button type="submit" className="btn-shimmer w-full py-[11px] rounded-[10px] cursor-pointer border-0" style={{ background: 'var(--accent)', color: '#000', fontSize: '14px', fontWeight: 500 }}>Save Settings</button>
          </form>
        </div>
        {/* Notifications */}
        <div className="p-6 rounded-[16px] flex flex-col gap-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--app-overlay)', color: 'var(--app-text)' }}><Bell size={16} /></div>
            <div><h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>Notifications</h3></div>
          </div>
          {[{ label: 'Low stock alerts', on: true }, { label: 'Supplier delay notifications', on: true }, { label: 'Reorder suggestions', on: false }, { label: 'Weekly digest', on: false }].map(item => (
            <label key={item.label} className="flex items-center justify-between py-1 cursor-pointer">
              <span style={{ fontSize: '13px', color: 'var(--app-text)' }}>{item.label}</span>
              <input type="checkbox" defaultChecked={item.on} style={{ accentColor: 'var(--accent)' }} />
            </label>
          ))}
        </div>
        {/* Data */}
        <div className="p-6 rounded-[16px] flex flex-col gap-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--app-overlay)', color: 'var(--app-text)' }}><Database size={16} /></div>
            <div><h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>Data & Integrations</h3></div>
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--app-text-muted)', marginBottom: '6px' }}>API Key</p>
            <input type="password" value="sk-••••••••••••" readOnly className="w-full py-[10px] px-[14px] rounded-[10px] outline-none" style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--app-text-muted)' }} />
          </div>
          <button className="w-full py-[10px] rounded-[10px] cursor-pointer bg-transparent transition-colors" style={{ border: '1px solid var(--app-border)', fontSize: '13px', fontWeight: 500, color: 'var(--app-text-muted)' }}>Export All Data (CSV)</button>
        </div>

        {/* User Management (Admin Only) */}
        <RoleGuard allowedRoles={['admin']}>
          <div className="p-6 rounded-[16px] flex flex-col gap-5 lg:col-span-2" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--app-overlay)', color: 'var(--app-text)' }}><Users size={16} /></div>
              <div><h3 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--app-text)' }}>User Management</h3><p style={{ fontSize: '12px', color: 'var(--app-text-muted)' }}>Manage user roles and access</p></div>
            </div>
            
            <div className="rounded-[8px] overflow-hidden" style={{ border: '1px solid var(--app-border)' }}>
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--app-overlay)', borderBottom: '1px solid var(--app-border)' }}>
                    <th className="py-3 px-4" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--app-text-muted)' }}>Name</th>
                    <th className="py-3 px-4" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--app-text-muted)' }}>Email</th>
                    <th className="py-3 px-4" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', color: 'var(--app-text-muted)' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.length === 0 ? (
                    <tr><td colSpan="3" className="py-4 px-4 text-center text-[13px] text-[var(--app-text-muted)]">Loading users...</td></tr>
                  ) : (
                    usersList.map(u => (
                      <tr key={u._id} style={{ borderBottom: '1px solid var(--app-border)' }}>
                        <td className="py-3 px-4 text-[14px]" style={{ color: 'var(--app-text)' }}>{u.name} {u._id === user?._id && '(You)'}</td>
                        <td className="py-3 px-4 text-[13px]" style={{ color: 'var(--app-text-muted)' }}>{u.email}</td>
                        <td className="py-3 px-4">
                          <select 
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            disabled={u._id === user?._id}
                            className="px-2 py-1.5 rounded-[6px] text-[12px] font-medium outline-none cursor-pointer"
                            style={{ 
                              background: 'var(--app-elevated)', 
                              border: '1px solid var(--app-border)', 
                              color: u.role === 'admin' ? 'var(--accent)' : 'var(--app-text)' 
                            }}
                          >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="warehouse_staff">Staff</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </RoleGuard>
      </div>
    </motion.div>
  );
};
