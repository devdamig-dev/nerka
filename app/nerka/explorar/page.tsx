"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, MapPin, Sparkles, Star } from "lucide-react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { CategoryChips, EmptyState, LoadingCard, SearchBar } from "@/components/nerka/ui";
import { categories, categorySubcategories, entrepreneurs } from "@/lib/nerka-data";

export default function ExplorarPage() {
  return (
    <Suspense fallback={<ExplorarFallback />}>
      <ExplorarContent />
    </Suspense>
  );
}

function ExplorarFallback() {
  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <div className="mb-3 h-7 w-48 animate-pulse rounded-lg bg-white" />
      <div className="h-12 animate-pulse rounded-2xl bg-white" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </main>
  );
}

function ExplorarContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "Ambos";
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("Todos");
  const [zone, setZone] = useState("Ver todo");
  const [type, setType] = useState(initialType);

  const filtered = entrepreneurs.filter((e) => {
    const byCategory = active === "Todos" ? true : e.category === active;
    const byZone =
      zone === "Ver todo"
        ? true
        : zone === "En Berazategui"
          ? e.zone === "Berazategui"
          : e.coverage.includes("Zona Sur") || e.coverage.includes("cercanas");
    const byType =
      type === "Ambos"
        ? true
        : type === "Productos"
          ? e.catalog.some((item) => item.type === "product")
          : e.catalog.some((item) => item.type === "service");
    return byCategory && byZone && byType;
  });

  const onSelect = (item: string) => {
    setLoading(true);
    setActive(item);
    setTimeout(() => setLoading(false), 250);
  };

  // Hero data: top-rated for visual punch.
  const top = [...entrepreneurs].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <section className="mb-6 hidden overflow-hidden rounded-[2rem] border border-[#E6DDD0] bg-[#F7F2EA] lg:block">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-8 p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7F8C72]">Explorar</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#1f241f]">
              {filtered.length} lugares para descubrir cerca tuyo
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666C60]">
              Un recorrido visual por comercios, productos y servicios locales. Menos ruido, más intención de compra.
            </p>
          </div>
          <div className="hidden gap-3 xl:flex">
            {top.map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-2xl bg-white/85 px-3 py-2 shadow-sm ring-1 ring-[#E1D8CB]">
                <img src={e.avatar} alt="" className="h-10 w-10 rounded-xl object-cover" />
                <div>
                  <p className="text-xs font-semibold text-[#1f241f]">{e.name}</p>
                  <p className="inline-flex items-center gap-1 text-[10px] text-[#666C60]">
                    <Star size={10} className="fill-[#C9984A] text-[#C9984A]" /> {e.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <h1 className="mb-3 text-xl font-semibold text-[#1f241f] lg:hidden">Explorar Niar</h1>
      <SearchBar placeholder="¿Qué estás buscando? Producto, servicio o comercio" />

      <div className="mt-5 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit lg:space-y-5 lg:rounded-[1.75rem] lg:border lg:border-[#E6DDD0] lg:bg-white/86 lg:p-5 lg:shadow-sm">
          <div>
            <p className="hidden text-xs font-medium uppercase tracking-wide text-[#7F8C72] lg:mb-2 lg:block">
              Categorías
            </p>
            <CategoryChips items={["Todos", ...categories]} active={active} onSelect={onSelect} />
          </div>

          {active !== "Todos" ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[#7F8C72]">Subcategorías</p>
              <div className="flex flex-wrap gap-2">
                {categorySubcategories[active as keyof typeof categorySubcategories]?.map((item) => (
                  <span key={item} className="rounded-full border border-[#E6DDD0] bg-white px-3 py-1 text-xs text-[#666C60]">{item}</span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#7F8C72]">Zona</p>
            <div className="flex flex-wrap gap-2">
              {["En Berazategui", "Zonas cercanas", "Ver todo"].map((item) => (
                <button
                  key={item}
                  onClick={() => setZone(item)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs lg:border ${
                    zone === item
                      ? "bg-[#EEF3EA] text-[#5F6F55] border-[#C8D4BF]"
                      : "bg-white text-[#666C60] border-[#E6DDD0]"
                  }`}
                >
                  <MapPin size={10} /> {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#7F8C72]">Tipo</p>
            <div className="flex gap-2">
              {["Ambos", "Productos", "Servicios"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`rounded-full px-3 py-1.5 text-xs lg:border ${
                    type === item
                      ? "bg-[#EEF3EA] text-[#5F6F55] border-[#C8D4BF]"
                      : "bg-white text-[#666C60] border-[#E6DDD0]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#7F8C72]">Modalidad</p>
            <div className="flex flex-wrap gap-2">
              {["retiro", "envío", "atención a domicilio", "online"].map((item) => (
                <span key={item} className="rounded-full border border-[#E6DDD0] bg-white px-3 py-1 text-xs text-[#666C60]">{item}</span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#7F8C72]">Orden</p>
            <div className="flex flex-wrap gap-2">
              {["destacados", "verificados", "responde rápido", "top en tu zona", "más cercanos", "nuevos"].map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs lg:border ${
                    i === 0
                      ? "bg-[#EEF3EA] text-[#5F6F55] border-[#C8D4BF]"
                      : "bg-white text-[#666C60] border-[#E6DDD0]"
                  }`}
                >
                  {i === 0 ? <Sparkles size={10} /> : null} {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="mt-5 space-y-3 lg:mt-0">
          <div className="hidden items-center justify-between lg:flex">
            <p className="text-sm text-[#666C60]">
              <strong className="text-[#1f241f]">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "tienda" : "tiendas"}
              {active !== "Todos" ? ` · ${active}` : ""}
            </p>
            <div className="flex items-center gap-1 rounded-xl border border-[#E6DDD0] bg-white p-1">
              <button className="rounded-lg bg-[#EEF3EA] p-1.5 text-[#5F6F55]" aria-label="Vista grilla">
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : filtered.length ? (
              filtered.map((entrepreneur) => (
                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-2 xl:col-span-3">
                <EmptyState
                  title="No encontramos resultados"
                  description="Probá con otra categoría o ampliá la zona."
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
