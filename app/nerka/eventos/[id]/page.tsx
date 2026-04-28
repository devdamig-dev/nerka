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
    <main className="pb-24">
      <img src={event.image} alt={event.name} className="h-56 w-full object-cover" />
      <div className="space-y-3 px-4 py-4">
        <h1 className="text-xl font-semibold text-[#2B174F]">{event.name}</h1>
        <p className="text-sm text-[#6F6A7C]">{event.date}</p>
        <p className="text-sm text-[#6F6A7C]">{event.location}</p>
        <p className="text-sm text-[#433d56]">{event.description}</p>

        <section className="pt-2">
          <h2 className="mb-2 font-semibold text-[#1f1833]">Emprendedores participantes</h2>
          <div className="space-y-2">
            {event.participantIds.map((id) => {
              const entrepreneur = getEntrepreneurById(id);
              if (!entrepreneur) return null;
              return (
                <article key={id} className="flex items-center justify-between rounded-xl bg-white p-3">
                  <div>
                    <p className="font-medium text-[#1f1833]">{entrepreneur.name}</p>
                    <p className="text-sm text-[#6F6A7C]">{entrepreneur.category}</p>
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
