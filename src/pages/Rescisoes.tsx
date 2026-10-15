import { ArrowRight, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

export function Rescisoes() {
  return (
    <div className="rescission-page">
      <div className="breadcrumb"><Link to="/">Início</Link><span>/</span><span>Rescisões</span></div>
      <div className="page-heading"><div><span className="eyebrow">ÁREA DO ALUNO</span><h1>Rescisões</h1><p>Acompanhe suas solicitações de encerramento de contrato.</p></div></div>
      <section className="rescission-card">
        <div className="rescission-card-heading"><span className="rescission-icon"><ClipboardList size={21} /></span><div><span className="status-pill status-pending"><i />Pendente</span><h2>Almeida & Torres Advogados</h2><p>Solicitada em 11 jun, 2025 · Contrato de estágio</p></div></div>
        <div className="rescission-detail"><strong>Motivo informado</strong><p>Encerramento do vínculo de estágio a pedido do estudante.</p></div>
        <div className="rescission-detail lawyer-note"><strong>Observação do NPJ</strong><p>Sua solicitação está em análise. Aguarde a validação da documentação pela equipe do NPJ.</p></div>
      </section>
      <Link className="button button-primary" to="/solicitacao">Solicitar rescisão <ArrowRight size={17} /></Link>
    </div>
  );
}
