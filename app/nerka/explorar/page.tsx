"use client";

import { useMemo, useState } from "react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { CategoryChips, EmptyState, LoadingCard, SearchBar } from "@/components/nerka/ui";
import { categories, entrepreneurs } from "@/lib/nerka-data";

export default function ExplorarPage() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("Todos");
  const [zone, setZone] = useState<string>("En mi zona");

  const filtered = useMemo(() => {
    const byCategory = active === "Todos" ? entrepreneurs : entrepreneurs.filter((e) => e.category === active);
    if (zone === "En mi zona") return byCategory.filter((e) => e.zone === "Berazategui");
    if (zone === "Zonas cercanas") return byCategory.filter((e) => ["Quilmes", "Hudson", "Berazategui"].includes(e.zone));
    return byCategory;
  }, [active, zone]);

  const onSelect = (item: string) => {
    setLoading(true);
    setActive(item);
    setTimeout(() => setLoading(false), 220);
  };

  return (
    <main className="px-4 py-5 lg:px-6">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F]">Explorar emprendedores</h1>
      <SearchBar placeholder="Buscá por rubro, nombre o servicio" />

      <div className="mt-4 lg:hidden">
        <CategoryChips items={["Todos", ...categories.slice(0, 6)]} active={active} onSelect={onSelect} />
        <div className="mt-2 flex flex-wrap gap-2">
          {["En mi zona", "Zonas cercanas", "Ver todos"].map((item) => (
            <button key={item} onClick={() => setZone(item)} className={`rounded-full px-3 py-1.5 text-xs ${zone === item ? "bg-[#5B2EFF] text-white" : "bg-white text-[#6F6A7C]"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 lg:grid lg:grid-cols-[250px_1fr] lg:gap-5">
        <aside className="hidden rounded-2xl border border-[#ece8f7] bg-white p-4 lg:block">
          <p className="text-sm font-semibold text-[#2B174F]">Filtros</p>
          <div className="mt-3 space-y-2">
            {["En mi zona", "Zonas cercanas", "Ver todos"].map((item) => (
              <button key={item} onClick={() => setZone(item)} className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${zone === item ? "bg-[#F2ECFF] text-[#5B2EFF]" : "bg-[#faf8ff] text-[#6F6A7C]"}`}>
                {item}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium text-[#6F6A7C]">Categoría madre</p>
          <div className="mt-2 space-y-1">
            {["Todos", ...categories].map((item) => (
              <button key={item} onClick={() => onSelect(item)} className={`block w-full rounded-lg px-2 py-1.5 text-left text-xs ${active === item ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#6F6A7C]"}`}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
          {loading ? (
            <>
              <LoadingCard />
              <LoadingCard />
            </>
          ) : filtered.length ? (
            filtered.map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)
          ) : (
            <div className="lg:col-span-2 xl:col-span-3">
              <EmptyState title="No encontramos resultados" description="Probá con otra categoría o ampliá la zona." />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
