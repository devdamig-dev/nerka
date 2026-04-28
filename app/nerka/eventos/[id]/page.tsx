import Link from "next/link";
import { EmptyState } from "@/components/nerka/ui";
import { events, getEntrepreneurById } from "@/lib/nerka-data";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    return <main className="p-4"><EmptyState title="Evento no encontrado" description="No hay información para este evento." /></main>;
  }

  return (
    <main className="pb-24 lg:px-6 lg:py-6 lg:pb-8">
      <img src={event.image} alt={event.name} className="h-56 w-full object-cover lg:rounded-3xl" />
      <div className="space-y-3 px-4 py-4 lg:px-0">
        <h1 className="text-xl font-semibold text-[#2B174F]">{event.name}</h1>
        <p className="text-sm text-[#6F6A7C]">{event.date}</p>
        <p className="text-sm text-[#6F6A7C]">{event.location}</p>
        <p className="inline-flex rounded-full bg-[#E7F9EE] px-3 py-1 text-xs text-[#197a43]">{event.registration}</p>
        <p className="text-sm text-[#433d56]">{event.description}</p>

        <section className="pt-2">
          <h2 className="mb-2 font-semibold text-[#1f1833]">Emprendedores participantes</h2>
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
            {event.participantIds.map((id) => {
              const entrepreneur = getEntrepreneurById(id);
              if (!entrepreneur) return null;
              return (
                <article key={id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-medium text-[#1f1833]">{entrepreneur.name}</p>
                      <p className="text-sm text-[#6F6A7C]">{entrepreneur.subcategory}</p>
                    </div>
                  </div>
                  <Link href={`/nerka/emprendedores/${entrepreneur.id}`} className="rounded-lg bg-[#F2ECFF] px-3 py-1.5 text-sm text-[#5B2EFF]">Ver perfil</Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
