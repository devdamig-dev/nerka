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
    <main className="px-4 py-5">
      <h1 className="mb-4 text-xl font-semibold text-[#2B174F]">Explorar emprendedores</h1>
      <SearchBar placeholder="Buscá por rubro, nombre o servicio" />

      <div className="mt-4">
        <CategoryChips items={["Todos", ...categories.slice(0, 6)]} active={active} onSelect={onSelect} />
        <div className="mt-2 flex flex-wrap gap-2">
          {["Zona Sur", "Rating 4.7+", "Disponibles hoy"].map((item) => (
            <button key={item} className="rounded-full bg-white px-3 py-1.5 text-xs text-[#6F6A7C]">
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-5 space-y-3">
        {loading ? (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        ) : filtered.length ? (
          filtered.map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)
        ) : (
          <EmptyState
            title="No encontramos resultados"
            description="Probá con otra categoría o ampliá la zona."
          />
        )}
      </section>
    </main>
  );
}
