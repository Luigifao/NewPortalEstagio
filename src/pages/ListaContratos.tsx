import { ArrowUpRight, Download, FilePlus2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { contracts } from "../data/mockData";

export function ListaContratos() {
  return (
    <div className="contracts-page">
      <div className="breadcrumb"><Link to="/">Início</Link><span>/</span><span>Meus contratos</span></div>
      <div className="page-heading contracts-heading"><div><span className="eyebrow">ÁREA DO ALUNO</span><h1>Meus contratos</h1><p>Acompanhe suas solicitações e contratos de estágio.</p></div><Link to="/solicitacao" className="button button-primary"><FilePlus2 size={17} /> Nova solicitação</Link></div>
      <div className="contract-summary"><div><span>Total de contratos</span><strong>02</strong></div><div><span>Ativos</span><strong className="green-text">01</strong></div><div><span>Em análise</span><strong className="gold-text">01</strong></div></div>
      <section className="table-card">
        <div className="table-toolbar"><div><h2>Solicitações e contratos</h2><p>Visualize os detalhes e acompanhe cada etapa.</p></div><label className="search-box"><Search size={17} /><input aria-label="Buscar contratos" placeholder="Buscar contrato" /></label></div>
        <div className="table-scroll"><table><thead><tr><th>Empresa / criado em</th><th>Período</th><th>Duração</th><th>Carga horária</th><th>Valor</th><th>Status solicitação</th><th>Status contrato</th><th>Contrato assinado</th><th>Observações</th></tr></thead><tbody>
          {contracts.map((contract) => <tr key={contract.id}><td><strong className="company-name">{contract.company}</strong><span className="cell-subtitle">{contract.createdAt} · Matrícula {contract.enrollment}</span></td><td><span>{contract.startDate}</span><span className="cell-subtitle">até {contract.endDate}</span></td><td>{contract.duration}</td><td>{contract.workload}</td><td><strong>{contract.grant}</strong></td><td><span className={`status-pill ${contract.requestStatus === "Aprovado" ? "status-approved" : "status-pending"}`}><i />{contract.requestStatus}</span></td><td><span className={`status-pill ${contract.contractStatus === "Ativo" ? "status-active" : "status-closed"}`}><i />{contract.contractStatus}</span></td><td>{contract.requestStatus === "Aprovado" ? <button className="download-link"><Download size={15} /> Baixar PDF</button> : <span className="no-document">Disponível após aprovação</span>}</td><td>{contract.observation}</td></tr>)}
        </tbody></table></div>
        <div className="table-bottom"><span>Exibindo 2 contratos</span><Link to="/rescisoes">Ver solicitações de rescisão <ArrowUpRight size={14} /></Link></div>
      </section>
      <div className="contract-action-cards"><Link to="/solicitacao"><span className="action-card-icon"><FilePlus2 size={19} /></span><span><strong>Solicitar aditivo</strong><small>Atualize informações de um contrato ativo</small></span><ArrowUpRight size={16} /></Link><Link to="/rescisoes"><span className="action-card-icon action-card-pale"><ArrowUpRight size={19} /></span><span><strong>Solicitar rescisão</strong><small>Solicite o encerramento do seu estágio</small></span><ArrowUpRight size={16} /></Link></div>
    </div>
  );
}
