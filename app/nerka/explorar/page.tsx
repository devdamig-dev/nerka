"use client";

import { useMemo, useState } from "react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { CategoryChips, EmptyState, LoadingCard, SearchBar } from "@/components/nerka/ui";
import { categories, entrepreneurs } from "@/lib/nerka-data";

export default function ExplorarPage() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string>("Todos");

  const filtered = useMemo(
    () => (active === "Todos" ? entrepreneurs : entrepreneurs.filter((e) => e.category === active)),
    [active],
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
          <CategoryChips items={["Todos", ...categories.slice(0, 6)]} active={active} onSelect={onSelect} />
          <div className="mt-2 flex flex-wrap gap-2 lg:mt-0">
            {["Zona Sur", "Rating 4.7+", "Disponibles hoy"].map((item) => (
              <button key={item} className="rounded-full bg-white px-3 py-1.5 text-xs text-[#6F6A7C] lg:border lg:border-[#ece8f7]">
                {item}
              </button>
            ))}
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
