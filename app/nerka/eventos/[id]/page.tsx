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
    <main className="pb-24 lg:px-8 lg:py-8 lg:pb-8">
      <img src={event.image} alt={event.name} className="h-56 w-full object-cover lg:h-72 lg:rounded-3xl" />
      <div className="space-y-3 px-4 py-4 lg:px-0">
        <h1 className="text-xl font-semibold text-[#2F3A2B]">{event.name}</h1>
        <p className="text-sm text-[#666C60]">{event.date}</p>
        <p className="text-sm text-[#666C60]">{event.location}</p>
        <p className="text-sm text-[#4F554B]">{event.description}</p>

        <section className="pt-2">
          <h2 className="mb-2 font-semibold text-[#1f241f]">Emprendedores participantes</h2>
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 xl:grid-cols-3">
            {event.participantIds.map((id) => {
              const entrepreneur = getEntrepreneurById(id);
              if (!entrepreneur) return null;
              return (
                <article key={id} className="flex items-center justify-between rounded-xl bg-white p-3">
                  <div>
                    <p className="font-medium text-[#1f241f]">{entrepreneur.name}</p>
                    <p className="text-sm text-[#666C60]">{entrepreneur.category}</p>
                  </div>
                  <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="rounded-lg bg-[#EEF3EA] px-3 py-1.5 text-sm text-[#6E7F63]">Ver perfil</Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
