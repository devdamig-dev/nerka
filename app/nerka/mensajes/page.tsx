import { ConversationCard } from "@/components/nerka/cards";
import { EmptyState } from "@/components/nerka/ui";
import { conversations, entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";

export default function MensajesPage() {
  const hasConversations = conversations.length > 0;

  return (
    <main className="px-4 py-5 lg:px-6">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F]">Mensajes</h1>
      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {hasConversations ? (
          conversations.map((item) => {
            const entrepreneur = getEntrepreneurById(item.entrepreneurId) ?? entrepreneurs[0];
            return <ConversationCard key={item.id} item={item} entrepreneur={entrepreneur} />;
          })
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
