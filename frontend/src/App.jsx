import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import FeedbackPage from "./pages/FeedbackBack";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function Layout() {
  const { user, logout } = useAuth();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const username = user?.username;

  return (
    <>
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="brand-mark">●</span>
          Feedback Management
        </div>

        <div className="nav-links">
          {user && (
            <>
              <Link to="/">My Feedback</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
            </>
          )}

          {user ? (
            <>
              <div className="user-chip">
                <span className="avatar">
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </span>
                <div>
                  <strong>{username}</strong>
                  <small>{isAdmin ? "Administrator" : "Contributor"}</small>
                </div>
              </div>

              <button className="ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="btn-nav-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="app-shell">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ✅ Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<LoginPage />} />

          {/* ✅ Protected layout */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["ROLE_ADMIN"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Route>

          {/* ✅ Fallback */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
