import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, FileUp, Info, Paperclip } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type FormValues = {
  company: string;
  phone: string;
  email: string;
  type: string;
  startDate: string;
  endDate: string;
  duration: string;
  dailyHours: string;
  weeklyHours: string;
  startTime: string;
  endTime: string;
  grant: string;
  policy: string;
  insurer: string;
  observation: string;
};

const initialValues: FormValues = {
  company: "",
  phone: "",
  email: "",
  type: "",
  startDate: "",
  endDate: "",
  duration: "",
  dailyHours: "",
  weeklyHours: "",
  startTime: "",
  endTime: "",
  grant: "",
  policy: "",
  insurer: "",
  observation: "",
};

export function FormularioEstagio() {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const unsupportedFile = selectedFiles.find((file) => !/\.(pdf|doc|docx|jpe?g|png)$/i.test(file.name));
    if (unsupportedFile) {
      setError(`O arquivo "${unsupportedFile.name}" não está em um formato permitido.`);
      event.target.value = "";
      return;
    }
    const oversizedFile = selectedFiles.find((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFile) {
      setError(`O arquivo "${oversizedFile.name}" excede o limite de 10 MB.`);
      event.target.value = "";
      return;
    }
    setFiles(selectedFiles);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (values.startDate && values.endDate && values.endDate <= values.startDate) {
      setError("A data de término deve ser posterior à data de início.");
      return;
    }
    if (values.startTime && values.endTime && values.endTime <= values.startTime) {
      setError("O horário de saída deve ser posterior ao horário de entrada.");
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="success-card">
        <div className="success-icon"><Check size={28} /></div>
        <span className="eyebrow">SOLICITAÇÃO REGISTRADA</span>
        <h1>Recebemos seus dados!</h1>
        <p>Sua solicitação de estágio foi enviada para análise do NPJ. Você poderá acompanhar o andamento em Meus contratos.</p>
        <div className="success-actions">
          <button className="button button-primary" onClick={() => navigate("/contratos")}>Acompanhar solicitação</button>
          <button className="button button-secondary" onClick={() => { setSubmitted(false); setValues(initialValues); setFiles([]); }}>Enviar outra solicitação</button>
        </div>
      </section>
    );
  }

  return (
    <div className="form-page">
      <div className="breadcrumb"><Link to="/">Início</Link><span>/</span><span>Nova solicitação</span></div>
      <div className="page-heading form-heading">
        <div>
          <span className="eyebrow">PORTAL DO ALUNO</span>
          <h1>Solicitação de estágio</h1>
          <p>Preencha os dados do estágio e envie a documentação para análise do NPJ.</p>
        </div>
        <div className="step-indicator"><span className="step-number">1</span><span>Dados do estágio</span><i /><span className="step-muted">2</span><span className="step-muted">Análise</span></div>
      </div>

      <div className="form-notice"><Info size={19} /><p>Os campos marcados com <b>*</b> são obrigatórios. Confira os dados antes de enviar.</p></div>
      <form className="application-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="section-heading">
            <span className="section-index">01</span>
            <div><h2>Dados da concedente</h2><p>Informações da empresa ou instituição onde você estagiará.</p></div>
          </div>
          <div className="form-grid">
            <label className="field field-full"><span>Nome da empresa ou instituição <b>*</b></span><input required value={values.company} onChange={(e) => update("company", e.target.value)} placeholder="Ex.: Almeida & Torres Advogados" /></label>
            <label className="field"><span>Telefone de contato <b>*</b></span><input required type="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(31) 99999-9999" /></label>
            <label className="field"><span>E-mail de contato <b>*</b></span><input required type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="contato@empresa.com.br" /></label>
            <label className="field field-full"><span>Tipo de estágio <b>*</b></span><select required value={values.type} onChange={(e) => update("type", e.target.value)}><option value="" disabled>Selecione o tipo de estágio</option><option>Estágio obrigatório</option><option>Estágio não obrigatório</option></select></label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-index">02</span>
            <div><h2>Período e jornada</h2><p>Informe as datas previstas e a carga horária do estágio.</p></div>
          </div>
          <div className="form-grid">
            <label className="field"><span>Data de início <b>*</b></span><input required type="date" value={values.startDate} onChange={(e) => update("startDate", e.target.value)} /></label>
            <label className="field"><span>Data de término <b>*</b></span><input required type="date" min={values.startDate || undefined} value={values.endDate} onChange={(e) => update("endDate", e.target.value)} /></label>
            <label className="field"><span>Duração do contrato <b>*</b></span><div className="input-suffix"><input required type="number" min="1" max="24" value={values.duration} onChange={(e) => update("duration", e.target.value)} placeholder="Ex.: 12" /><span>meses</span></div></label>
            <label className="field"><span>Carga horária diária <b>*</b></span><div className="input-suffix"><input required type="number" min="1" max="8" step="0.5" value={values.dailyHours} onChange={(e) => update("dailyHours", e.target.value)} placeholder="Ex.: 6" /><span>horas</span></div></label>
            <label className="field"><span>Carga horária semanal <b>*</b></span><div className="input-suffix"><input required type="number" min="1" max="30" step="0.5" value={values.weeklyHours} onChange={(e) => update("weeklyHours", e.target.value)} placeholder="Ex.: 30" /><span>horas</span></div></label>
            <div className="field-time-pair">
              <label className="field"><span>Horário de entrada <b>*</b></span><input required type="time" value={values.startTime} onChange={(e) => update("startTime", e.target.value)} /></label>
              <label className="field"><span>Horário de saída <b>*</b></span><input required type="time" value={values.endTime} onChange={(e) => update("endTime", e.target.value)} /></label>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-index">03</span>
            <div><h2>Bolsa e seguro</h2><p>Dados financeiros e da apólice de seguro contra acidentes pessoais.</p></div>
          </div>
          <div className="form-grid">
            <label className="field"><span>Valor da bolsa <b>*</b></span><div className="input-prefix"><span>R$</span><input required type="number" min="0" step="0.01" value={values.grant} onChange={(e) => update("grant", e.target.value)} placeholder="0,00" /></div></label>
            <label className="field"><span>Número da apólice <b>*</b></span><input required value={values.policy} onChange={(e) => update("policy", e.target.value)} placeholder="Número da apólice" /></label>
            <label className="field field-full"><span>Seguradora <b>*</b></span><input required value={values.insurer} onChange={(e) => update("insurer", e.target.value)} placeholder="Nome da companhia seguradora" /></label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading">
            <span className="section-index">04</span>
            <div><h2>Documentos e observações</h2><p>Anexe o termo de compromisso e outros documentos necessários.</p></div>
          </div>
          <div className="upload-area">
            <input id="documents" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFilesChange} />
            <label htmlFor="documents" className="upload-content">
              <span className="upload-icon"><FileUp size={22} /></span>
              <span><strong>Clique para anexar</strong> ou arraste seus arquivos aqui</span>
              <small>PDF, DOC, DOCX ou imagem · até 10 MB por arquivo</small>
            </label>
          </div>
          {files.length > 0 && <div className="selected-files" aria-live="polite">{files.map((file) => <span key={`${file.name}-${file.size}`}><Paperclip size={14} />{file.name}<small>{(file.size / 1024 / 1024).toFixed(1)} MB</small></span>)}</div>}
          <label className="field observation-field"><span>Observação ou justificativa</span><textarea rows={4} maxLength={1000} value={values.observation} onChange={(e) => update("observation", e.target.value)} placeholder="Inclua alguma informação adicional que considere importante..." /><small className="char-count">{values.observation.length}/1000</small></label>
        </section>

        {error && <div className="form-error" role="alert">{error}</div>}
        <div className="form-actions">
          <Link className="button button-ghost" to="/"><ArrowLeft size={17} /> Voltar</Link>
          <button className="button button-primary" type="submit">Enviar solicitação <ArrowRight size={17} /></button>
        </div>
        <p className="form-privacy">Ao enviar, seus dados serão encaminhados ao Núcleo de Prática Jurídica para análise.</p>
      </form>
    </div>
  );
}
