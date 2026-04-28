import { CalendarClock, SearchCheck, Sparkles, WandSparkles } from "lucide-react";
import { EntrepreneurCard, EventCard } from "@/components/nerka/cards";
import {
  CategoryChips,
  NerkaHeader,
  QuickActionCard,
  SearchBar,
  SectionTitle,
} from "@/components/nerka/ui";
import { categories, entrepreneurs, events } from "@/lib/nerka-data";

export default function NerkaHomePage() {
  return (
    <main>
      <NerkaHeader />
      <div className="space-y-6 px-4 py-4">
        <SearchBar />
        <CategoryChips items={[...categories.slice(0, 4), "Más"]} />

        <section>
          <SectionTitle title="Acciones rápidas" />
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard href="/nerka/explorar" title="Buscar emprendedores" description="Compará perfiles por zona" tone="bg-[#F2ECFF]" icon={<SearchCheck size={18} />} />
            <QuickActionCard href="/nerka/solicitudes/nueva" title="Publicar lo que necesito" description="Recibí propuestas" tone="bg-[#FFEFE7]" icon={<Sparkles size={18} />} />
            <QuickActionCard href="/nerka/eventos" title="Ver ferias y eventos" description="Conocé emprendimientos" tone="bg-[#E8FFF5]" icon={<CalendarClock size={18} />} />
            <QuickActionCard href="/nerka/solicitudes" title="Organizar mi evento" description="Seguí tu flujo de contratación" tone="bg-[#FFFBE7]" icon={<WandSparkles size={18} />} />
          </div>
        </section>

        <section>
          <SectionTitle title="Destacados en tu zona" cta="Ver todos" href="/nerka/explorar" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {entrepreneurs.slice(0, 5).map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} horizontal />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Ferias y eventos próximos" cta="Ver agenda" href="/nerka/eventos" />
          <EventCard event={events[0]} />
        </section>
      </div>
    </main>
  );
}
