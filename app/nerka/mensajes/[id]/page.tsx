import { ChatThread, StructuredProposalCard } from "@/components/nerka/chat";
import { EmptyState, StatusPill } from "@/components/nerka/ui";
import { conversations, getRequestById } from "@/lib/nerka-data";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conversation = conversations.find((conv) => conv.id === id);

  if (!conversation) {
    return <main className="p-4"><EmptyState title="Chat no encontrado" description="Esta conversación no está disponible." /></main>;
  }

  const request = getRequestById(conversation.requestId);

  return (
    <main className="space-y-4 px-4 py-5 pb-24">
      <h1 className="text-xl font-semibold text-[#2B174F]">Chat con propuesta</h1>

      <section className="rounded-2xl border border-[#d9cef8] bg-[#F2ECFF] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-semibold text-[#2B174F]">{request?.title ?? "Solicitud"}</p>
          <StatusPill status={conversation.status} />
        </div>
        <p className="text-sm text-[#4f4768]">Fecha: {request?.date}</p>
        <p className="text-sm text-[#4f4768]">Zona: {request?.zone}</p>
        <p className="text-sm text-[#4f4768]">Necesidad: {request?.description}</p>
        <p className="text-sm text-[#4f4768]">Presupuesto estimado: {request?.budget}</p>
      </section>

      <ChatThread />
      <StructuredProposalCard />

      <div className="fixed bottom-18 left-0 right-0 mx-auto w-full max-w-md border-t border-[#ece8f7] bg-white px-4 py-3 md:bottom-6 md:rounded-b-[2rem]">
        <input placeholder="Escribí un mensaje..." className="w-full rounded-xl border border-[#ece8f7] px-4 py-2.5 text-sm outline-none" />
      </div>
    </main>
  );
}
