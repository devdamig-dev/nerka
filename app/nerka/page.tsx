import { CalendarClock, SearchCheck, Sparkles, WandSparkles } from "lucide-react";
import { EntrepreneurCard, EventCard } from "@/components/nerka/cards";
import {
  CategoryChips,
  NerkaHeader,
  QuickActionCard,
  SearchBar,
  SectionTitle,
} from "@/components/nerka/ui";
import { entrepreneurs, events, subcategories } from "@/lib/nerka-data";

export default function NerkaHomePage() {
  return (
    <main className="lg:px-0 lg:py-6">
      <NerkaHeader />
      <div className="space-y-6 px-4 py-4 lg:space-y-8 lg:px-6">
        <SearchBar />
        <CategoryChips items={["Cumpleaños", "Decoración", "Fotografía", "Belleza", "Más"]} />

        <section>
          <SectionTitle title="Acciones rápidas" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <QuickActionCard href="/nerka/explorar" title="Buscar emprendedores" description="Compará perfiles por zona" tone="bg-[#F2ECFF]" icon={<SearchCheck size={18} />} />
            <QuickActionCard href="/nerka/solicitudes/nueva" title="Publicar lo que necesito" description="Recibí propuestas" tone="bg-[#FFEFE7]" icon={<Sparkles size={18} />} />
            <QuickActionCard href="/nerka/eventos" title="Ver ferias y eventos" description="Conocé emprendimientos" tone="bg-[#E8FFF5]" icon={<CalendarClock size={18} />} />
            <QuickActionCard href="/nerka/solicitudes" title="Organizar mi evento" description="Seguí tu flujo de contratación" tone="bg-[#FFFBE7]" icon={<WandSparkles size={18} />} />
          </div>
        </section>

        <section>
          <SectionTitle title="Destacados en tu zona" cta="Ver todos" href="/nerka/explorar" />
          <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {entrepreneurs.slice(0, 6).map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} horizontal />
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionTitle title="Ferias y eventos próximos" cta="Ver agenda" href="/nerka/eventos" />
            <div className="grid gap-3 lg:grid-cols-2">
              {events.slice(0, 2).map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#2B174F]">Rubros en expansión</p>
            <ul className="mt-2 space-y-2 text-sm text-[#6F6A7C]">
              {Object.entries(subcategories).slice(0, 5).map(([cat, subs]) => (
                <li key={cat}><strong className="text-[#312b47]">{cat}:</strong> {subs.slice(0, 2).join(", ")}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
