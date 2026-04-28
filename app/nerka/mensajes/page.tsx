import { ConversationCard } from "@/components/nerka/cards";
import { EmptyState } from "@/components/nerka/ui";
import { conversations, entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";

export default function MensajesPage() {
  const hasConversations = conversations.length > 0;
  const selectedConversation = conversations[0];
  const selectedEntrepreneur = selectedConversation
    ? getEntrepreneurById(selectedConversation.entrepreneurId) ?? entrepreneurs[0]
    : null;

  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F] lg:text-2xl">Mensajes</h1>
      <div className="space-y-3 lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-5 lg:space-y-0">
        {hasConversations ? (
          <>
            <div className="space-y-3 rounded-2xl lg:border lg:border-[#ece8f7] lg:bg-white lg:p-3">
              {conversations.map((item) => {
                const entrepreneur = getEntrepreneurById(item.entrepreneurId) ?? entrepreneurs[0];
                return <ConversationCard key={item.id} item={item} entrepreneur={entrepreneur} />;
              })}
            </div>
            <section className="hidden rounded-2xl border border-[#ece8f7] bg-white p-5 lg:block">
              <p className="text-xs uppercase tracking-wide text-[#8d86a2]">Vista previa</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2B174F]">{selectedEntrepreneur?.name}</h2>
              <p className="text-sm text-[#6F6A7C]">{selectedConversation?.summary}</p>
              <p className="mt-4 rounded-xl bg-[#FAFAFC] p-4 text-sm text-[#433d56]">
                {selectedConversation?.lastMessage}
              </p>
              <p className="mt-3 text-sm text-[#6F6A7C]">
                Seleccioná una conversación para ver el detalle completo y responder.
              </p>
            </section>
          </>
        ) : (
          <EmptyState
            title="Todavía no tenés conversaciones"
            description="Publicá una solicitud para empezar a recibir propuestas."
            cta="Nueva solicitud"
            href="/nerka/solicitudes/nueva"
          />
        )}
      </div>
    </main>
  );
}
