import Link from "next/link";
import { EmptyState, StatusPill } from "@/components/nerka/ui";
import { getEntrepreneurById, getRequestById, requestComparisons } from "@/lib/nerka-data";

export default async function SolicitudDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = getRequestById(id);
  const proposals = requestComparisons[id as keyof typeof requestComparisons] ?? [];

  if (!request) {
    return <main className="p-4"><EmptyState title="Solicitud no encontrada" description="No encontramos esta solicitud." href="/nerka/solicitudes" cta="Volver" /></main>;
  }

  return (
    <main className="space-y-4 px-4 py-5 lg:px-6">
      <section className="rounded-2xl border border-[#ece8f7] bg-white p-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold text-[#2B174F]">{request.title}</h1>
          <StatusPill status={request.status} />
        </div>
        <p className="mt-1 text-sm text-[#6F6A7C]">{request.date} · {request.zone} · {request.budget}</p>
        <p className="mt-2 text-sm text-[#433d56]">{request.description}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-[#2B174F]">Comparar propuestas</h2>
        <div className="space-y-2 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
          {proposals.map((proposal) => {
            const entrepreneur = getEntrepreneurById(proposal.entrepreneurId);
            if (!entrepreneur) return null;
            return (
              <article key={proposal.entrepreneurId} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                <p className="font-medium text-[#1f1833]">{entrepreneur.name}</p>
                <p className="text-xs text-[#6F6A7C]">{entrepreneur.zone}</p>
                <p className="mt-2 text-lg font-semibold text-[#5B2EFF]">{proposal.price}</p>
                <p className="text-sm text-[#433d56]">{proposal.includes}</p>
                <p className="mt-1 text-xs text-[#6F6A7C]">Disponibilidad: {proposal.eta}</p>
                <div className="mt-2"><StatusPill status={proposal.status} /></div>
                <Link href="/nerka/mensajes" className="mt-3 inline-flex rounded-lg bg-[#F2ECFF] px-3 py-2 text-sm text-[#5B2EFF]">Abrir chat</Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
