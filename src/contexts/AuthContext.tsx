import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserRole = "aluno" | "advogado";

type AuthContextValue = {
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("aluno");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const value = useMemo(
    () => ({
      role,
      isAuthenticated,
      setRole,
      login: (nextRole: UserRole) => {
        setRole(nextRole);
        setIsAuthenticated(true);
      },
      logout: () => setIsAuthenticated(false),
    }),
    [role, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
}
