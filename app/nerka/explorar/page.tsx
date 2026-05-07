"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { EmptyState, LoadingCard } from "@/components/nerka/ui";
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
    <main className="px-5 py-6 lg:px-2 lg:py-8">
      <div className="mb-6 h-10 w-2/3 animate-pulse rounded-full bg-[var(--niar-surface-soft)]" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

  return (
    <main className="px-5 py-6 lg:px-2 lg:py-8">
      {/* HERO STRIP */}
      <section className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Descubrir
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Explorá lo mejor de tu zona
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[var(--niar-ink-mute)]">
          {filtered.length} {filtered.length === 1 ? "tienda" : "tiendas"} cerca tuyo
          {active !== "Todos" ? ` · ${active}` : ""}.
        </p>

        {/* Search compacto */}
        <div className="mt-5 max-w-2xl rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-1.5 shadow-[var(--niar-shadow-sm)]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-1 sm:grid-cols-[minmax(0,1fr)_160px_auto]">
            <div className="flex min-w-0 items-center gap-2 px-3 py-2">
              <Search size={17} className="shrink-0 text-[var(--niar-ink-mute)]" />
              <input
                placeholder="Buscá tienda, producto o rubro"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--niar-ink-soft)]"
              />
            </div>
            <button
              type="button"
              className="hidden items-center justify-between gap-2 rounded-full px-3 py-2 text-sm text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] sm:flex"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--niar-sage-on)]" />
                <span className="text-[var(--niar-ink)]">Berazategui</span>
              </span>
              <ChevronDown size={14} className="text-[var(--niar-ink-soft)]" />
            </button>
            <button className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-5 py-2 text-sm font-medium text-white">
              Buscar
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
        {/* SIDEBAR FILTERS */}
        <aside className="space-y-7 lg:sticky lg:top-24 lg:h-fit">
          {/* Section: Categoría */}
          <FilterGroup title="Categorías">
            <div className="space-y-1">
              {["Todos", ...categories.slice(0, 10)].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelect(cat)}
                  className={`block w-full rounded-full px-3 py-1.5 text-left text-sm transition ${
                    active === cat
                      ? "bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]"
                      : "text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FilterGroup>

          {active !== "Todos" &&
          categorySubcategories[active as keyof typeof categorySubcategories]?.length ? (
            <FilterGroup title="Subcategorías">
              <div className="flex flex-wrap gap-2">
                {categorySubcategories[active as keyof typeof categorySubcategories]?.map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1 text-xs text-[var(--niar-ink-mute)]"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </FilterGroup>
          ) : null}

          <FilterGroup title="Zona">
            <div className="flex flex-wrap gap-2">
              {["En Berazategui", "Zonas cercanas", "Ver todo"].map((item) => (
                <button
                  key={item}
                  onClick={() => setZone(item)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition ${
                    zone === item
                      ? "border-[var(--niar-sage)] bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]"
                      : "border-[var(--niar-border)] bg-[var(--niar-surface)] text-[var(--niar-ink-mute)] hover:border-[var(--niar-sage)]"
                  }`}
                >
                  <MapPin size={11} /> {item}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Tipo">
            <div className="flex gap-2">
              {["Ambos", "Productos", "Servicios"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    type === item
                      ? "border-[var(--niar-sage)] bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]"
                      : "border-[var(--niar-border)] bg-[var(--niar-surface)] text-[var(--niar-ink-mute)] hover:border-[var(--niar-sage)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Modalidad">
            <div className="flex flex-wrap gap-2">
              {["retiro", "envío", "atención a domicilio", "online"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1 text-xs text-[var(--niar-ink-mute)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </FilterGroup>
        </aside>

        {/* RESULTS */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-[var(--niar-ink-mute)]">
              <strong className="text-[var(--niar-ink)]">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "resultado" : "resultados"}
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1.5 text-xs text-[var(--niar-ink-mute)]"
            >
              <SlidersHorizontal size={12} /> Más relevantes
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              <div className="sm:col-span-2 xl:col-span-3">
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

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--niar-ink-soft)]">
        {title}
      </p>
      {children}
    </div>
  );
}
