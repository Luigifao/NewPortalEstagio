import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { notices as initialNotices, type Notice, type NoticeDocument } from "../data/mockData";

export type NoticeDraft = Pick<Notice, "category" | "title" | "content" | "accent">;

type NoticeContextValue = {
  notices: Notice[];
  createNotice: (draft: NoticeDraft, files: File[]) => void;
  updateNotice: (id: number, draft: NoticeDraft, files: File[], removedDocumentIds: string[]) => void;
  deleteNotice: (id: number) => void;
};

const NoticeContext = createContext<NoticeContextValue | null>(null);
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE = /\.(pdf|doc|docx|odt|rtf|jpe?g|png)$/i;

function createDocuments(files: File[]): NoticeDocument[] {
  const created: NoticeDocument[] = [];
  try {
    for (const file of files) {
      if (!ALLOWED_FILE.test(file.name)) {
        throw new Error(`O arquivo "${file.name}" não possui um formato permitido.`);
      }
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`O arquivo "${file.name}" excede o limite de 10 MB.`);
      }
      created.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    }
    return created;
  } catch (error) {
    created.forEach((document) => URL.revokeObjectURL(document.url));
    throw error;
  }
}

function revokeDocuments(documents: NoticeDocument[]) {
  documents.forEach((document) => URL.revokeObjectURL(document.url));
}

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState(initialNotices);
  const noticesRef = useRef(notices);
  const nextId = useRef(Math.max(...initialNotices.map((notice) => notice.id)) + 1);

  useEffect(() => () => {
    noticesRef.current.forEach((notice) => revokeDocuments(notice.documents));
  }, []);

  function createNotice(draft: NoticeDraft, files: File[]) {
    const documents = createDocuments(files);
    const notice: Notice = {
      ...draft,
      id: nextId.current++,
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
      author: "Núcleo de Prática Jurídica",
      documents,
    };
    const updated = [notice, ...noticesRef.current];
    noticesRef.current = updated;
    setNotices(updated);
  }

  function updateNotice(id: number, draft: NoticeDraft, files: File[], removedDocumentIds: string[]) {
    const current = noticesRef.current.find((notice) => notice.id === id);
    if (!current) {
      throw new Error("O comunicado não foi encontrado. Atualize a página e tente novamente.");
    }

    const retainedDocuments = current.documents.filter((document) => !removedDocumentIds.includes(document.id));
    const addedDocuments = createDocuments(files);
    const updatedNotice = { ...current, ...draft, documents: [...retainedDocuments, ...addedDocuments] };
    const updated = noticesRef.current.map((notice) => notice.id === id ? updatedNotice : notice);
    noticesRef.current = updated;
    setNotices(updated);
    revokeDocuments(current.documents.filter((document) => removedDocumentIds.includes(document.id)));
  }

  function deleteNotice(id: number) {
    const current = noticesRef.current.find((notice) => notice.id === id);
    if (!current) {
      throw new Error("O comunicado não foi encontrado. Atualize a página e tente novamente.");
    }
    const updated = noticesRef.current.filter((notice) => notice.id !== id);
    noticesRef.current = updated;
    setNotices(updated);
    revokeDocuments(current.documents);
  }

  return (
    <NoticeContext.Provider value={{ notices, createNotice, updateNotice, deleteNotice }}>
      {children}
    </NoticeContext.Provider>
  );
}

export function useNotices() {
  const context = useContext(NoticeContext);
  if (!context) {
    throw new Error("useNotices deve ser usado dentro de NoticeProvider.");
  }
  return context;
}
