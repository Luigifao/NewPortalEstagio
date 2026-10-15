import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormularioEstagio } from "../components/FormularioEstagio";
import { useAuth } from "../contexts/AuthContext";
import { AdvogadoPage } from "../pages/AdvogadoPage";
import { Dashboard } from "../pages/Dashboard";
import { ListaContratos } from "../pages/ListaContratos";
import { Login } from "../pages/Login";
import { Rescisoes } from "../pages/Rescisoes";

export function AppRoutes() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Login />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={role === "aluno" ? <Dashboard /> : <Navigate to="/advogado/contratos" replace />} />
        <Route path="/solicitacao" element={role === "aluno" ? <FormularioEstagio /> : <Navigate to="/advogado/contratos" replace />} />
        <Route path="/contratos" element={role === "aluno" ? <ListaContratos /> : <Navigate to="/advogado/contratos" replace />} />
        <Route path="/rescisoes" element={role === "aluno" ? <Rescisoes /> : <Navigate to="/advogado/rescisoes" replace />} />
        <Route path="/advogado/contratos" element={role === "advogado" ? <AdvogadoPage section="contratos" /> : <Navigate to="/" replace />} />
        <Route path="/advogado/rescisoes" element={role === "advogado" ? <AdvogadoPage section="rescisoes" /> : <Navigate to="/" replace />} />
        <Route path="/advogado/mural" element={role === "advogado" ? <AdvogadoPage section="mural" /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
