export type NoticeDocument = {
  id: string;
  name: string;
  size: number;
  url: string;
};

export type Notice = {
  id: number;
  category: string;
  title: string;
  content: string;
  date: string;
  author: string;
  accent: "wine" | "gold" | "green";
  documents: NoticeDocument[];
};

export type Contract = {
  id: number;
  createdAt: string;
  enrollment: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  workload: string;
  grant: string;
  requestStatus: "Em análise" | "Aprovado" | "Documentação pendente";
  contractStatus: "Ativo" | "Encerrado";
  observation: string;
};

export const notices: Notice[] = [
  {
    id: 1,
    category: "Oportunidade",
    title: "Novas oportunidades de estágio",
    content: "O NPJ está recebendo vagas em escritórios parceiros. Confira os requisitos e envie sua solicitação pelo portal.",
    date: "12 jun, 2025",
    author: "Núcleo de Prática Jurídica",
    accent: "wine",
    documents: [],
  },
  {
    id: 2,
    category: "Prazo importante",
    title: "Atenção ao envio dos documentos",
    content: "Para iniciar o estágio no próximo semestre, envie o termo de compromisso com antecedência mínima de 10 dias úteis.",
    date: "10 jun, 2025",
    author: "Coordenação de Estágios",
    accent: "gold",
    documents: [],
  },
  {
    id: 3,
    category: "Comunicado",
    title: "Atendimento do NPJ",
    content: "O atendimento para dúvidas sobre contratos acontece de segunda a sexta, das 9h às 18h, pelo canal institucional.",
    date: "06 jun, 2025",
    author: "Núcleo de Prática Jurídica",
    accent: "green",
    documents: [],
  },
];

export const contracts: Contract[] = [
  {
    id: 1,
    createdAt: "03 jun, 2025",
    enrollment: "202312045",
    company: "Almeida & Torres Advogados",
    startDate: "01 jul, 2025",
    endDate: "30 jun, 2026",
    duration: "12 meses",
    workload: "6h/dia · 30h/sem",
    grant: "R$ 1.500,00",
    requestStatus: "Aprovado",
    contractStatus: "Ativo",
    observation: "Termo assinado pelas partes.",
  },
  {
    id: 2,
    createdAt: "10 jun, 2025",
    enrollment: "202312045",
    company: "Defensoria Pública de Minas Gerais",
    startDate: "01 ago, 2025",
    endDate: "31 jul, 2026",
    duration: "12 meses",
    workload: "5h/dia · 25h/sem",
    grant: "R$ 1.200,00",
    requestStatus: "Em análise",
    contractStatus: "Ativo",
    observation: "Aguardando análise do NPJ.",
  },
];
