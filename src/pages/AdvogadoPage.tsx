import { useState, type ChangeEvent, type FormEvent } from "react";
import { Check, FileText, Newspaper, Paperclip, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { contracts } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { useNotices, type NoticeDraft } from "../contexts/NoticeContext";

type Section = "contratos" | "rescisoes" | "mural";
const defaultDraft: NoticeDraft = { category: "Comunicado", title: "", content: "", accent: "wine" };
const acceptedFiles = /\.(pdf|doc|docx|odt|rtf|jpe?g|png)$/i;
const maxFileSize = 10 * 1024 * 1024;

function formatFileSize(size: number) {
  return size < 1024 * 1024
    ? `${Math.max(1, Math.round(size / 1024))} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível salvar o comunicado. Tente novamente.";
}

export function AdvogadoPage({ section }: { section: Section }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<NoticeDraft>(defaultDraft);
  const [files, setFiles] = useState<File[]>([]);
  const [removedDocumentIds, setRemovedDocumentIds] = useState<string[]>([]);
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  const { role } = useAuth();
  const { notices, createNotice, updateNotice, deleteNotice } = useNotices();
  const titles = {
    contratos: ["Gerenciamento de contratos", "Revise, aprove ou solicite ajustes nos contratos de estágio."],
    rescisoes: ["Gerenciamento de rescisões", "Analise os pedidos de encerramento enviados pelos alunos."],
    mural: ["Gerenciar mural", "Publique comunicados e documentos para os alunos do portal."],
  } as const;
  const [title, description] = titles[section];

  function openNewNotice() {
    setEditingId(null);
    setDraft(defaultDraft);
    setFiles([]);
    setRemovedDocumentIds([]);
    setFormError("");
    setEditorOpen(true);
  }

  function openEditNotice(id: number) {
    const notice = notices.find((item) => item.id === id);
    if (!notice) {
      setMessage("O comunicado não foi encontrado. Atualize a página e tente novamente.");
      setMessageIsError(true);
      return;
    }
    setEditingId(id);
    setDraft({ category: notice.category, title: notice.title, content: notice.content, accent: notice.accent });
    setFiles([]);
    setRemovedDocumentIds([]);
    setFormError("");
    setEditorOpen(true);
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    const invalidFile = selectedFiles.find((file) => !acceptedFiles.test(file.name));
    if (invalidFile) {
      setFormError(`O arquivo "${invalidFile.name}" não possui um formato permitido.`);
      return;
    }
    const oversizedFile = selectedFiles.find((file) => file.size > maxFileSize);
    if (oversizedFile) {
      setFormError(`O arquivo "${oversizedFile.name}" excede o limite de 10 MB.`);
      return;
    }
    setFiles((current) => [...current, ...selectedFiles]);
    setFormError("");
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (editingId === null) {
        createNotice(draft, files);
        setMessage("Comunicado publicado para os alunos.");
      } else {
        updateNotice(editingId, draft, files, removedDocumentIds);
        setMessage("Comunicado atualizado para os alunos.");
      }
      setMessageIsError(false);
      setEditorOpen(false);
      setFiles([]);
      setRemovedDocumentIds([]);
      setFormError("");
    } catch (error) {
      setFormError(errorMessage(error));
    }
  }

  function handleDeleteNotice(id: number) {
    if (!window.confirm("Deseja excluir este comunicado e os documentos anexados?")) return;
    try {
      deleteNotice(id);
      setMessage("Comunicado excluído.");
      setMessageIsError(false);
    } catch (error) {
      setMessage(errorMessage(error));
      setMessageIsError(true);
    }
  }

  return (
    <div className="management-page">
      <div className="breadcrumb"><span>NPJ</span><span>/</span><span>{title}</span></div>
      <div className="page-heading">
        <div><span className="eyebrow">ÁREA DO ADVOGADO · {role.toUpperCase()}</span><h1>{title}</h1><p>{description}</p></div>
        {section === "mural" && <button className="button button-primary" onClick={openNewNotice}><Plus size={17} /> Novo comunicado</button>}
      </div>
      {section === "contratos" && <div className="management-list">{contracts.map((item) => <article className="management-card" key={item.id}><div><span className="status-pill status-pending"><i />{item.requestStatus}</span><h2>{item.company}</h2><p>Solicitado por Mariana Alves · Matrícula 202312045</p><div className="management-meta"><span>Início: {item.startDate}</span><span>{item.duration}</span><span>{item.workload}</span></div></div><div className="management-actions"><button className="button button-secondary" onClick={() => setSelected(item.id)}><Pencil size={16} /> Analisar / editar</button><button className="button button-primary" onClick={() => setSelected(item.id)}><Check size={16} /> Aprovar</button></div></article>)}</div>}
      {section === "rescisoes" && <div className="management-list"><article className="management-card"><div><span className="status-pill status-pending"><i />Pendente</span><h2>Almeida & Torres Advogados</h2><p>Mariana Alves · Matrícula 202312045 · Solicitada em 11 jun, 2025</p><div className="rescission-detail"><strong>Motivo informado</strong><p>Encerramento do vínculo de estágio a pedido do estudante.</p></div><label className="field"><span>Observação para o aluno</span><textarea rows={3} placeholder="Escreva uma observação sobre a solicitação..." /></label></div><div className="management-actions"><button className="button button-secondary" onClick={() => setSelected(1)}><X size={16} /> Manter pendente</button><button className="button button-primary" onClick={() => setSelected(1)}><Check size={16} /> Aprovar</button></div></article></div>}
      {section === "mural" && (
        <div className="management-list">
          {notices.map((item) => (
            <article className="management-card notice-management-card" key={item.id}>
              <span className="management-news-icon"><Newspaper size={20} /></span>
              <div className="notice-management-copy">
                <span className="notice-category"><i />{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <span className="cell-subtitle">{item.date} · {item.author}</span>
                {item.documents.length > 0 && (
                  <div className="management-document-list" aria-label={`Documentos de ${item.title}`}>
                    {item.documents.map((document) => (
                      <span className="management-document" key={document.id}>
                        <FileText size={15} />
                        <span>{document.name}<small>{formatFileSize(document.size)}</small></span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="management-actions">
                <button className="icon-button" aria-label={`Editar ${item.title}`} onClick={() => openEditNotice(item.id)}><Pencil size={17} /></button>
                <button className="icon-button delete-button" aria-label={`Excluir ${item.title}`} onClick={() => handleDeleteNotice(item.id)}><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          {notices.length === 0 && <div className="empty-notices"><Newspaper size={25} /><strong>Nenhum comunicado publicado</strong><span>Crie um comunicado e compartilhe documentos com os alunos.</span></div>}
        </div>
      )}

      {editorOpen && section === "mural" && (
        <div className="notice-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditorOpen(false); }}>
          <section className="notice-editor" role="dialog" aria-modal="true" aria-labelledby="notice-editor-title">
            <div className="notice-editor-header">
              <div><span className="eyebrow">MURAL DO ALUNO</span><h2 id="notice-editor-title">{editingId === null ? "Novo comunicado" : "Editar comunicado"}</h2><p>Inclua os documentos que os alunos poderão visualizar.</p></div>
              <button className="icon-button" onClick={() => setEditorOpen(false)} aria-label="Fechar formulário"><X size={19} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="notice-editor-fields">
                <label className="field"><span>Categoria <b>*</b></span><select required value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}><option>Comunicado</option><option>Oportunidade</option><option>Prazo importante</option><option>Documentos</option></select></label>
                <label className="field"><span>Cor do comunicado</span><select value={draft.accent} onChange={(event) => setDraft((current) => ({ ...current, accent: event.target.value as NoticeDraft["accent"] }))}><option value="wine">Vermelho institucional</option><option value="gold">Dourado</option><option value="green">Verde</option></select></label>
                <label className="field notice-editor-full"><span>Título <b>*</b></span><input required maxLength={100} value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Título do comunicado" /></label>
                <label className="field notice-editor-full"><span>Mensagem <b>*</b></span><textarea required rows={4} maxLength={1000} value={draft.content} onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))} placeholder="Escreva a mensagem que será exibida aos alunos..." /></label>
              </div>

              <div className="notice-attachments">
                <div className="notice-attachments-heading"><div><strong>Documentos para os alunos</strong><span>Anexe PDFs, documentos ou imagens para visualização.</span></div><span className="attachment-count">{files.length + (notices.find((item) => item.id === editingId)?.documents.filter((doc) => !removedDocumentIds.includes(doc.id)).length ?? 0)}</span></div>
                <input id="notice-documents" className="notice-file-input" type="file" multiple accept=".pdf,.doc,.docx,.odt,.rtf,.jpg,.jpeg,.png" onChange={handleFilesChange} />
                <label htmlFor="notice-documents" className="notice-upload-button"><Paperclip size={16} /> Anexar documentos <small>Máx. 10 MB por arquivo</small></label>
                <div className="notice-editor-file-list">
                  {notices.find((item) => item.id === editingId)?.documents.map((document) => {
                    const removed = removedDocumentIds.includes(document.id);
                    return <div className={`notice-editor-file${removed ? " notice-editor-file-removed" : ""}`} key={document.id}><FileText size={16} /><span>{document.name}<small>{formatFileSize(document.size)}</small></span><button type="button" className="file-remove-button" onClick={() => setRemovedDocumentIds((current) => removed ? current.filter((id) => id !== document.id) : [...current, document.id])}>{removed ? "Restaurar" : "Remover"}</button></div>;
                  })}
                  {files.map((file, index) => <div className="notice-editor-file" key={`${file.name}-${file.size}-${index}`}><FileText size={16} /><span>{file.name}<small>{formatFileSize(file.size)} · Novo documento</small></span><button type="button" className="file-remove-button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remover ${file.name}`}>Remover</button></div>)}
                </div>
                <p className="notice-attachment-hint">Formatos aceitos: PDF, DOC, DOCX, ODT, RTF, JPG e PNG.</p>
              </div>

              {formError && <p className="notice-form-error" role="alert">{formError}</p>}
              <div className="notice-editor-actions"><button type="button" className="button button-secondary" onClick={() => setEditorOpen(false)}>Cancelar</button><button type="submit" className="button button-primary"><Save size={16} /> {editingId === null ? "Publicar comunicado" : "Salvar alterações"}</button></div>
            </form>
          </section>
        </div>
      )}
      {selected !== null && <div className="toast-message" role="status" onAnimationEnd={() => setSelected(null)}><Check size={17} /> Ação registrada para análise (demonstração).</div>}
      {message && <div className={`toast-message${messageIsError ? " toast-error" : ""}`} role={messageIsError ? "alert" : "status"} onAnimationEnd={() => setMessage("")}>{messageIsError ? <X size={17} /> : <Check size={17} />} {message}</div>}
    </div>
  );
}
