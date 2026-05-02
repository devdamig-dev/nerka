import type { Conversation, Message } from "./types";

/**
 * Mock simple de conversaciones nuevas (las creadas desde "Enviar mensaje" en
 * un perfil o producto). Vive en memoria + localStorage para simular UX.
 * En backend real esto será POST /api/conversations.
 */

export const NEW_CONVERSATION_PREFIX = "new-";

export function suggestProfileGreeting(profileName: string) {
  return `Hola ${profileName}, vi tu perfil en Nerka y quería consultarte.`;
}

export function suggestProductGreeting(profileName: string, productName: string) {
  return `Hola ${profileName}, vi este producto en tu catálogo: "${productName}". ¿Está disponible?`;
}

export type DraftConversation = {
  id: string;
  entrepreneurId: string;
  productId?: string;
  draftText: string;
  createdAt: string;
};

const STORAGE_KEY = "nerka.drafts.v1";

export function readDrafts(): DraftConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DraftConversation[]) : [];
  } catch {
    return [];
  }
}

export function saveDrafts(drafts: DraftConversation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    // ignore
  }
}

export function pushDraft(draft: Omit<DraftConversation, "id" | "createdAt">) {
  const id = `${NEW_CONVERSATION_PREFIX}${Date.now()}`;
  const drafts = readDrafts();
  drafts.unshift({ ...draft, id, createdAt: new Date().toISOString() });
  saveDrafts(drafts);
  return id;
}

// Sólo se usa para typecheck en consumidores; sin lógica todavía.
export type { Conversation, Message };
