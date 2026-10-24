import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await signup(form);
      navigate("/jobs", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign up"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto mt-12 max-w-md px-4">
      <h1 className="mb-2 text-3xl font-bold">Create account</h1>
      <p className="mb-6 text-gray-500">
        Start your job search today.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Full name"
          autoComplete="name"
          minLength={2}
          maxLength={80}
          required
          value={form.name}
          onChange={(e) => setForm({
            ...form, name: e.target.value
          })}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setForm({
            ...form, email: e.target.value
          })}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="password"
          placeholder="Password (at least 8 characters)"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          required
          value={form.password}
          onChange={(e) => setForm({
            ...form, password: e.target.value
          })}
        />

        {error && (
          <p role="alert" className="text-red-600">{error}</p>
        )}

        <button
          disabled={busy}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-5">
        Already registered? <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </main>
  );
}