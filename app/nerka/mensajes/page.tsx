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
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#2B174F] lg:text-2xl">Mensajes</h1>
          <p className="text-xs text-[#6F6A7C] lg:text-sm">
            Conversaciones con emprendedores y pedidos en curso.
          </p>
        </div>
      </div>

      <div className="space-y-3 lg:grid lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-5 lg:space-y-0">
        {hasAny ? (
          <>
            <div className="space-y-3 lg:rounded-2xl lg:border lg:border-[#ece8f7] lg:bg-white lg:p-3">
              {drafts.length ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9088a3]">
                    Tus mensajes enviados
                  </p>
                  {drafts.map((d) => {
                    const e = getEntrepreneurById(d.entrepreneurId);
                    if (!e) return null;
                    return (
                      <Link
                        key={d.id}
                        href={`/niar/mensajes/nuevo?to=${e.id}${d.productId ? `&product=${d.productId}` : ""}`}
                        className="block rounded-2xl border border-[#d9cef8] bg-[#F8F4FF] p-4"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#1f1833]">{e.name}</p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#5B2EFF]">
                            <Send size={11} /> Enviado
                          </span>
                        </div>
                        <p className="line-clamp-2 text-sm text-[#433d56]">{d.draftText}</p>
                        <p className="mt-1 text-[10px] text-[#9088a3]">
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
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9088a3]">
                    Conversaciones
                  </p>
                  {conversations.map((item) => {
                    const entrepreneur = getEntrepreneurById(item.entrepreneurId) ?? entrepreneurs[0];
                    return <ConversationCard key={item.id} item={item} entrepreneur={entrepreneur} />;
                  })}
                </div>
              ) : null}
            </div>
            <section className="hidden rounded-2xl border border-[#ece8f7] bg-white p-5 lg:block">
              <p className="text-xs uppercase tracking-wide text-[#8d86a2]">Vista previa</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2B174F]">
                {selectedEntrepreneur?.name ?? "Tus mensajes"}
              </h2>
              <p className="text-sm text-[#6F6A7C]">{selectedConversation?.summary ?? "Elegí una conversación para ver el detalle."}</p>
              {selectedConversation?.lastMessage ? (
                <p className="mt-4 rounded-xl bg-[#FAFAFC] p-4 text-sm text-[#433d56]">
                  {selectedConversation.lastMessage}
                </p>
              ) : null}
              <p className="mt-3 text-sm text-[#6F6A7C]">
                Seleccioná una conversación de la izquierda para responder. Los mensajes nuevos
                que iniciaste aparecen en violeta.
              </p>
            </section>
          </>
        ) : (
          <div className="lg:col-span-2">
            <EmptyState
              title="Todavía no tenés conversaciones"
              description="Entrá al perfil de un emprendedor y tocá Enviar mensaje para empezar a chatear."
              cta="Explorar emprendedores"
              href="/niar/explorar"
            />
          </div>
        )}
      </div>
    </main>
  );
}
