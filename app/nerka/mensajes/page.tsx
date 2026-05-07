"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { ConversationCard } from "@/components/nerka/cards";
import { EmptyState } from "@/components/nerka/ui";
import { conversations, entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { readDrafts, type DraftConversation } from "@/lib/messages-mock";

export default function MensajesPage() {
  const [drafts, setDrafts] = useState<DraftConversation[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrafts(readDrafts());
  }, []);

  const hasAny = conversations.length + drafts.length > 0;
  const selectedConversation = conversations[0];
  const selectedEntrepreneur = selectedConversation
    ? getEntrepreneurById(selectedConversation.entrepreneurId) ?? entrepreneurs[0]
    : null;

  return (
    <main className="px-5 py-8 lg:px-2 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Conversaciones
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Mensajes
        </h1>
        <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
          Conversaciones con emprendedores y pedidos en curso.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        {hasAny ? (
          <>
            <div className="space-y-5 lg:rounded-3xl lg:border lg:border-[var(--niar-border)] lg:bg-[var(--niar-surface)] lg:p-4">
              {drafts.length ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--niar-ink-soft)]">
                    Tus mensajes enviados
                  </p>
                  {drafts.map((d) => {
                    const e = getEntrepreneurById(d.entrepreneurId);
                    if (!e) return null;
                    return (
                      <Link
                        key={d.id}
                        href={`/nerka/mensajes/nuevo?to=${e.id}${d.productId ? `&product=${d.productId}` : ""}`}
                        className="block rounded-3xl border border-[var(--niar-lila)] bg-[var(--niar-lila-soft)] p-4 hover:border-[var(--niar-lila-deep)]"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm font-semibold text-[var(--niar-ink)]">{e.name}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-lila-deep)]">
                            <Send size={11} /> Enviado
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm text-[var(--niar-ink-mute)]">
                          {d.draftText}
                        </p>
                        <p className="mt-1 text-[10px] text-[var(--niar-ink-soft)]">
                          {new Date(d.createdAt).toLocaleString("es-AR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              {conversations.length ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--niar-ink-soft)]">
                    Conversaciones
                  </p>
                  {conversations.map((item) => {
                    const entrepreneur =
                      getEntrepreneurById(item.entrepreneurId) ?? entrepreneurs[0];
                    return <ConversationCard key={item.id} item={item} entrepreneur={entrepreneur} />;
                  })}
                </div>
              ) : null}
            </div>

            <section className="hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-7 lg:block">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
                Vista previa
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--niar-ink)]">
                {selectedEntrepreneur?.name ?? "Tus mensajes"}
              </h2>
              <p className="mt-1 text-sm text-[var(--niar-ink-mute)]">
                {selectedConversation?.summary ?? "Elegí una conversación para ver el detalle."}
              </p>
              {selectedConversation?.lastMessage ? (
                <p className="mt-5 rounded-2xl bg-[var(--niar-bg)] p-5 text-sm text-[var(--niar-ink)]">
                  {selectedConversation.lastMessage}
                </p>
              ) : null}
              <p className="mt-4 text-sm text-[var(--niar-ink-mute)]">
                Seleccioná una conversación de la izquierda para responder. Los mensajes nuevos
                que iniciaste aparecen en lila.
              </p>
            </section>
          </>
        ) : (
          <div className="lg:col-span-2">
            <EmptyState
              title="Todavía no tenés conversaciones"
              description="Entrá al perfil de un emprendedor y tocá Enviar mensaje para empezar a chatear."
              cta="Descubrir tiendas"
              href="/nerka/explorar"
            />
          </div>
        )}
      </div>
    </main>
  );
}
