import { ChevronDown, LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

const pageTitles: Record<string, string> = {
  "/": "Mural",
  "/solicitacao": "Nova solicitação",
  "/contratos": "Meus contratos",
  "/rescisoes": "Rescisões",
  "/advogado/contratos": "Gerenciamento de contratos",
  "/advogado/rescisoes": "Gerenciamento de rescisões",
  "/advogado/mural": "Gerenciar mural",
};

type HeaderProps = { onMenuClick: () => void };

export function Header({ onMenuClick }: HeaderProps) {
  const { role, setRole, logout } = useAuth();
  const { pathname } = useLocation();

  function changeRole(event: React.ChangeEvent<HTMLSelectElement>) {
    setRole(event.target.value as UserRole);
  }

  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" onClick={onMenuClick} aria-label="Abrir menu">
        <Menu size={22} />
      </button>
      <div className="topbar-title">
        <span>Portal de Estágios</span>
        <strong>{pageTitles[pathname] ?? "Portal de Estágios"}</strong>
      </div>
      <div className="topbar-actions">
        <label className="role-switch">
          <span>Visualizar como</span>
          <span className="role-select-wrap">
            <select value={role} onChange={changeRole} aria-label="Trocar perfil">
              <option value="aluno">Aluno</option>
              <option value="advogado">Advogado NPJ</option>
            </select>
            <ChevronDown size={14} />
          </span>
        </label>
        <span className="topbar-divider" />
        <div className="user-summary">
          <div className="avatar">{role === "aluno" ? "MA" : "NP"}</div>
          <div className="user-summary-copy">
            <strong>{role === "aluno" ? "Mariana Alves" : "Equipe NPJ"}</strong>
            <span>{role === "aluno" ? "Matrícula 202312045" : "Núcleo de Prática Jurídica"}</span>
          </div>
        </div>
        <button className="logout-button" onClick={logout}>
          <LogOut size={17} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
