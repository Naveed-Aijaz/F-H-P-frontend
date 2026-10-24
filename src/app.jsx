 import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b px-5 py-4">
      <Link to="/" className="text-xl font-bold text-blue-700">
        CareerHub
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/jobs">Jobs</Link>

        {user ? (
          <>
            {user.role === "jobseeker" && (
              <Link to="/applications">My applications</Link>
            )}
            {user.role === "recruiter" && (
              <Link to="/recruiter/dashboard">Dashboard</Link>
            )}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Placeholder({ title }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">
        Is page ko agle implementation step mein complete karein.
      </p>
    </main>
  );
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<Placeholder title="Job details" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute roles={["jobseeker"]} />}>
          <Route path="/applications" element={<Placeholder title="My applications" />} />
        </Route>

        <Route element={<ProtectedRoute roles={["recruiter"]} />}>
          <Route path="/recruiter/dashboard" element={<Placeholder title="Recruiter dashboard" />} />
        </Route>

        <Route path="*" element={<Placeholder title="404 — Page not found" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}