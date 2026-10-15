import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-column">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-content">{children}</main>
        <footer className="page-footer">
          <span>Dom Helder · Centro Universitário</span>
          <span>Em caso de dúvidas, entre em contato com o NPJ.</span>
        </footer>
      </div>
    </div>
  );
}
