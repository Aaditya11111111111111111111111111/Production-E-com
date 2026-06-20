import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Mock users ───────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, email: "customer@test.com", password: "password123", role: "customer", name: "John Doe" },
  { id: 2, email: "vendor@test.com",   password: "password123", role: "vendor",   name: "Acme Store" },
];

const STORAGE_KEY = "auth_user";

// ── Context ──────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Step 10: Rehydrate from localStorage on first load
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Step 8: Mock login — matches by email + password + role
  const login = useCallback(({ email, password, role }) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!found) {
      throw new Error("Invalid email or password");
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    role: user?.role ?? null,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ─────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
