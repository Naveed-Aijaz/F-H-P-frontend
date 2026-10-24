import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const user = await login(form);

      const defaultPath = user.role === "recruiter"
        ? "/recruiter/dashboard"
        : "/jobs";

      const requestedPath = location.state?.from?.pathname;

      const allowedPath = user.role === "recruiter"
        ? requestedPath?.startsWith("/recruiter/")
        : requestedPath?.startsWith("/applications");

      navigate(
        allowedPath ? requestedPath : defaultPath,
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to log in"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto mt-12 max-w-md px-4">
      <h1 className="mb-2 text-3xl font-bold">Welcome back</h1>
      <p className="mb-6 text-gray-500">
        Sign in to your Job Portal account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block">Email</span>
          <input
            className="w-full rounded-lg border p-3"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({
              ...form, email: e.target.value
            })}
          />
        </label>

        <label className="block">
          <span className="mb-1 block">Password</span>
          <input
            className="w-full rounded-lg border p-3"
            type="password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({
              ...form, password: e.target.value
            })}
          />
        </label>

        {error && (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={busy}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-5">
        New here? <Link className="text-blue-600" to="/signup">
          Create an account
        </Link>
      </p>
    </main>
  );
}