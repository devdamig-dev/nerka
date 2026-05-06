import Link from "next/link";
import { RequestCard } from "@/components/nerka/cards";
import { EmptyState } from "@/components/nerka/ui";
import { requests } from "@/lib/nerka-data";

export default function SolicitudesPage() {
  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#2B174F] lg:text-2xl">Mis solicitudes</h1>
        <Link href="/niar/solicitudes/nueva" className="rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm text-white">Nueva</Link>
      </div>

      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {requests.length ? (
          requests.map((request) => <RequestCard key={request.id} request={request} />)
        ) : (
          <EmptyState
            title="Todavía no creaste solicitudes"
            description="Cuando publiques una necesidad vas a recibir propuestas acá."
            cta="Crear solicitud"
            href="/niar/solicitudes/nueva"
          />
        )}
      </div>
    </main>
  );
}
