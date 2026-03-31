import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      const message = typeof err === "string" ? err : (err?.message || "Unable to logout");
      toast.error(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f4f8] p-6 sm:p-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#d9e2ec] bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#627d98]">
              Protected Area
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#102a43]">Dashboard</h1>
            <p className="mt-2 text-[#486581]">
              Welcome {user?.name || "User"}. You are logged in successfully.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#f08c2e] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#102a43] transition hover:bg-[#f6ad55]"
          >
            Logout
          </button>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#d9e2ec] bg-[#fffaf1] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#627d98]">Profile</p>
            <p className="mt-2 text-sm text-[#334e68]">{user?.email}</p>
          </article>
          <article className="rounded-2xl border border-[#d9e2ec] bg-[#f7fbff] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#627d98]">Status</p>
            <p className="mt-2 text-sm text-[#334e68]">Session Active</p>
          </article>
          <article className="rounded-2xl border border-[#d9e2ec] bg-[#f2fff8] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#627d98]">Access</p>
            <p className="mt-2 text-sm text-[#334e68]">Authenticated Route</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
