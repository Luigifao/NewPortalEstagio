import { NavLink } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  FilePlus2,
  FileText,
  LayoutDashboard,
  Newspaper,
  Scale,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const { role } = useAuth();
  const studentLinks = [
    { to: "/", label: "Mural", icon: LayoutDashboard, end: true },
    { to: "/solicitacao", label: "Nova solicitação", icon: FilePlus2 },
    { to: "/contratos", label: "Meus contratos", icon: BriefcaseBusiness },
    { to: "/rescisoes", label: "Rescisões", icon: ClipboardList },
  ];
  const lawyerLinks = [
    { to: "/advogado/contratos", label: "Contratos", icon: BriefcaseBusiness },
    { to: "/advogado/rescisoes", label: "Rescisões", icon: ClipboardList },
    { to: "/advogado/mural", label: "Gerenciar mural", icon: Newspaper },
  ];

  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Fechar menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark"><Scale size={22} strokeWidth={2.2} /></div>
          <div className="brand-copy">
            <strong>DOM HELDER</strong>
            <span>PORTAL DE ESTÁGIOS</span>
          </div>
          <button className="sidebar-close icon-button" onClick={onClose} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-profile">
          <div className="avatar avatar-sidebar">{role === "aluno" ? "MA" : "NP"}</div>
          <div>
            <strong>{role === "aluno" ? "Mariana Alves" : "Equipe NPJ"}</strong>
            <span>{role === "aluno" ? "Aluna · Direito" : "Advogado · NPJ"}</span>
          </div>
        </div>

        <div className="nav-section-label">MENU PRINCIPAL</div>
        <nav className="side-nav" aria-label="Navegação principal">
          {(role === "aluno" ? studentLinks : lawyerLinks).map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>
              {label === "Rescisões" && role === "aluno" && <span className="nav-count">1</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help-icon"><FileText size={18} /></div>
          <div>
            <strong>Precisa de ajuda?</strong>
            <span>Fale com o atendimento do NPJ.</span>
          </div>
          <Bell className="help-bell" size={16} />
        </div>
        <div className="sidebar-footnote">© 2025 Dom Helder · NPJ</div>
      </aside>
    </>
  );
}
