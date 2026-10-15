import { Scale } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

export function Login() {
  const { isAuthenticated, login } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <main className="login-page">
      <section className="login-card"><div className="login-mark"><Scale size={27} /></div><span className="eyebrow">DOM HELDER · NPJ</span><h1>Portal de Estágios</h1><p>Entre para acompanhar solicitações e comunicados do seu estágio.</p><label className="field"><span>Perfil de acesso</span><select id="login-role" defaultValue="aluno"><option value="aluno">Aluno</option><option value="advogado">Advogado NPJ</option></select></label><button className="button button-primary login-submit" onClick={() => login((document.getElementById("login-role") as HTMLSelectElement).value as UserRole)}>Acessar portal</button><small>Ambiente de demonstração · sem autenticação real</small></section>
    </main>
  );
}
