import { ArrowUpRight, CalendarDays, ChevronRight, Download, FilePlus2, FileText, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotices } from "../contexts/NoticeContext";

export function Dashboard() {
  const { notices } = useNotices();

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-kicker"><span /> ÁREA DO ALUNO</span>
          <h1>Olá, Mariana <span>👋</span></h1>
          <p>Acompanhe seus estágios e fique por dentro das novidades do NPJ.</p>
          <Link className="button welcome-button" to="/solicitacao"><FilePlus2 size={17} /> Nova solicitação <ArrowUpRight size={16} /></Link>
        </div>
        <div className="welcome-art"><div className="art-circle art-circle-one" /><div className="art-circle art-circle-two" /><div className="art-doc"><span /><span /><span /></div><div className="art-seal">DH</div></div>
      </section>

      <section className="dashboard-stats" aria-label="Resumo do aluno">
        <div className="stat-card"><span className="stat-icon stat-icon-wine"><FilePlus2 size={19} /></span><div><span>Solicitações em análise</span><strong>01</strong></div><span className="stat-caption">Acompanhe o andamento</span></div>
        <div className="stat-card"><span className="stat-icon stat-icon-green"><CalendarDays size={19} /></span><div><span>Contratos ativos</span><strong>01</strong></div><span className="stat-caption">Estágios em andamento</span></div>
        <Link to="/rescisoes" className="stat-card stat-card-link"><span className="stat-icon stat-icon-gold"><Megaphone size={19} /></span><div><span>Atualizações</span><strong>03</strong></div><span className="stat-caption">Novidades do NPJ <ChevronRight size={14} /></span></Link>
      </section>

      <section className="notice-section">
        <div className="section-title-row"><div><span className="eyebrow">FIQUE POR DENTRO</span><h2>Mural de comunicados</h2><p>Notícias e informações importantes para você.</p></div><span className="notice-total">{notices.length} comunicados</span></div>
        <div className="notice-grid">
          {notices.map((notice) => (
            <article className={`notice-card notice-${notice.accent}`} key={notice.id}>
              <div className="notice-top"><span className="notice-category"><i />{notice.category}</span><span className="notice-date">{notice.date}</span></div>
              <h3>{notice.title}</h3><p>{notice.content}</p>
              {notice.documents.length > 0 && (
                <div className="notice-document-list" aria-label={`Documentos anexados a ${notice.title}`}>
                  {notice.documents.map((document) => (
                    <a className="notice-document-link" key={document.id} href={document.url} target="_blank" rel="noopener noreferrer">
                      <span className="notice-document-icon"><FileText size={15} /></span>
                      <span className="notice-document-name">{document.name}<small>Visualizar documento</small></span>
                      <Download size={15} />
                    </a>
                  ))}
                </div>
              )}
              <div className="notice-card-footer"><span>{notice.author}</span><button aria-label={`Ler ${notice.title}`}><ArrowUpRight size={17} /></button></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
