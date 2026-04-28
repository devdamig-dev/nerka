"use client";

import { useMemo, useState } from "react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { CategoryChips, EmptyState, LoadingCard, SearchBar } from "@/components/nerka/ui";
import { categories, categorySubcategories, entrepreneurs } from "@/lib/nerka-data";

export default function ExplorarPage() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("Todos");
  const [zone, setZone] = useState("Ver todo");
  const [type, setType] = useState("Ambos");

  const filtered = useMemo(
    () =>
      entrepreneurs.filter((e) => {
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
      }),
    [active, type, zone],
  );

  const onSelect = (item: string) => {
    setLoading(true);
    setActive(item);
    setTimeout(() => setLoading(false), 250);
  };

  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F] lg:text-2xl">Explorar emprendedores</h1>
      <SearchBar placeholder="Buscá por rubro, nombre o servicio" />

      <div className="mt-5 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit lg:rounded-2xl lg:border lg:border-[#ece8f7] lg:bg-white lg:p-4">
          <CategoryChips items={["Todos", ...categories]} active={active} onSelect={onSelect} />
          {active !== "Todos" ? (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Subcategorías</p>
              <div className="flex flex-wrap gap-2">
                {categorySubcategories[active as keyof typeof categorySubcategories]?.map((item) => (
                  <span key={item} className="rounded-full border border-[#ece8f7] bg-white px-3 py-1 text-xs text-[#6F6A7C]">{item}</span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-2 lg:mt-0">
            {["En Berazategui", "Zonas cercanas", "Ver todo"].map((item) => (
              <button key={item} onClick={() => setZone(item)} className={`rounded-full px-3 py-1.5 text-xs lg:border ${zone === item ? "bg-[#F2ECFF] text-[#5B2EFF] border-[#d9cef8]" : "bg-white text-[#6F6A7C] border-[#ece8f7]"}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Tipo</p>
            <div className="flex gap-2">
              {["Ambos", "Productos", "Servicios"].map((item) => (
                <button key={item} onClick={() => setType(item)} className={`rounded-full px-3 py-1.5 text-xs lg:border ${type === item ? "bg-[#F2ECFF] text-[#5B2EFF] border-[#d9cef8]" : "bg-white text-[#6F6A7C] border-[#ece8f7]"}`}>{item}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Modalidad</p>
            <div className="flex flex-wrap gap-2">
              {["retiro", "envío", "atención a domicilio", "online"].map((item) => (
                <span key={item} className="rounded-full border border-[#ece8f7] bg-white px-3 py-1 text-xs text-[#6F6A7C]">{item}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Orden</p>
            <div className="flex flex-wrap gap-2">
              {["destacados", "mejor valorados", "más cercanos", "nuevos"].map((item) => (
                <span key={item} className="rounded-full border border-[#ece8f7] bg-white px-3 py-1 text-xs text-[#6F6A7C]">{item}</span>
              ))}
            </div>
          </div>
        </aside>

        <section className="mt-5 space-y-3 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3">
          {loading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : filtered.length ? (
            filtered.map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)
          ) : (
            <div className="lg:col-span-3">
              <EmptyState
                title="No encontramos resultados"
                description="Probá con otra categoría o ampliá la zona."
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
