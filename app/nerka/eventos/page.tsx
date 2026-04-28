import { EventCard } from "@/components/nerka/cards";
import { CategoryChips, SearchBar } from "@/components/nerka/ui";
import { events } from "@/lib/nerka-data";

export default function EventosPage() {
  return (
    <main className="px-4 py-5 pb-24 lg:px-6 lg:pb-8">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F]">Ferias y eventos</h1>
      <SearchBar placeholder="Buscá por zona o fecha" />
      <div className="mt-4">
        <CategoryChips items={["Próximos", "Berazategui", "Hudson", "Cumpleaños"]} />
      </div>
      <div className="mt-5 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
