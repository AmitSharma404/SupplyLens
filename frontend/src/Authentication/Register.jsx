import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, registerUser } from "../redux/slices/authSlice";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (error) {
      dispatch(clearAuthError());
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = typeof err === "string" ? err : (err?.message || "Unable to register");
      toast.error(message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="login-shell relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="login-blob login-blob-one" />
        <div className="login-blob login-blob-two" />
        <div className="login-grid" />
      </div>

      <section className="login-card relative z-10 mx-auto w-full max-w-xl rounded-[28px] border border-white/70 bg-white/85 p-7 shadow-[0_20px_80px_-30px_rgba(25,35,45,0.45)] backdrop-blur-sm sm:p-10">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#486581]">Create Account</p>
          <Link
            to="/login"
            className="rounded-full border border-[#bcccdc] px-4 py-1.5 text-xs font-semibold text-[#334e68] transition hover:border-[#486581] hover:text-[#102a43]"
          >
            Login
          </Link>
        </div>

        <h1 className="text-3xl font-black text-[#102a43] sm:text-4xl">Register</h1>
        <p className="mt-3 text-sm leading-6 text-[#486581]">
          Join SupplyLens and start managing your operations dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#334e68]">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-[#d9e2ec] bg-white px-4 py-3 text-sm text-[#102a43] outline-none transition placeholder:text-[#9fb3c8] focus:border-[#f6ad55] focus:ring-4 focus:ring-[#f7d7a8]/60"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#334e68]">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
              placeholder="name@company.com"
              className="w-full rounded-xl border border-[#d9e2ec] bg-white px-4 py-3 text-sm text-[#102a43] outline-none transition placeholder:text-[#9fb3c8] focus:border-[#f6ad55] focus:ring-4 focus:ring-[#f7d7a8]/60"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#334e68]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInput}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-[#d9e2ec] bg-white px-4 py-3 pr-20 text-sm text-[#102a43] outline-none transition placeholder:text-[#9fb3c8] focus:border-[#f6ad55] focus:ring-4 focus:ring-[#f7d7a8]/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 my-auto h-9 rounded-lg px-3 text-xs font-bold uppercase tracking-wide text-[#486581] transition hover:bg-[#f0f4f8] hover:text-[#102a43]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#f08c2e] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#102a43] transition duration-200 hover:bg-[#f6ad55] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#486581]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#102a43] underline decoration-[#f6c453] underline-offset-4">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};
