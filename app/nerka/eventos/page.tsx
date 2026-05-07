import { EventCard } from "@/components/nerka/cards";
import { events } from "@/lib/nerka-data";

export default function EventosPage() {
  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10 lg:pb-12">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Activaciones locales
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Ferias y showrooms cerca tuyo
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--niar-ink-mute)]">
          Encuentros de emprendedores locales en tu zona. Pasá, conocelos y llevate algo lindo.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
