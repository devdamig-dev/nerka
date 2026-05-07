"use client";

import Link from "next/link";
import { ArrowLeft, PackagePlus, Pencil } from "lucide-react";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";
import { SectionTitle } from "@/components/nerka/ui";

export default function CatalogoPage() {
  const { user } = useRole();
  const profile =
    getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const products = profile.catalog.filter((c) => c.type === "product");
  const services = profile.catalog.filter((c) => c.type === "service");

  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10">
      <header className="mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Link
            href="/nerka"
            className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2 text-[var(--niar-ink-mute)] hover:text-[var(--niar-ink)]"
          >
            <ArrowLeft size={14} />
          </Link>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Mi negocio
            </p>
            <h1 className="font-display mt-1 text-2xl font-semibold text-[var(--niar-ink)] lg:text-3xl">
              Mi catálogo
            </h1>
            <p className="text-sm text-[var(--niar-ink-mute)]">
              {products.length} productos · {services.length} servicios
            </p>
          </div>
        </div>
        <Link
          href="/nerka/perfil/nuevo-producto"
          className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-4 py-2.5 text-sm font-medium text-white"
        >
          <PackagePlus size={14} /> Nuevo producto
        </Link>
      </header>

      <SectionTitle title="Productos" subtitle="Tocá una card para editar" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]"
          >
            <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
            <div className="space-y-1 p-4">
              <p className="line-clamp-1 text-sm font-medium text-[var(--niar-ink)]">{p.name}</p>
              <p className="font-display text-sm font-semibold text-[var(--niar-ink)]">
                {p.price ? formatPrice(p.price) : "A consultar"}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p.available
                      ? "bg-[var(--niar-success-soft)] text-[var(--niar-success)]"
                      : "bg-[var(--niar-surface-soft)] text-[var(--niar-ink-soft)]"
                  }`}
                >
                  {p.available ? "Disponible" : "Pausado"}
                </span>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--niar-sage-on)]">
                  <Pencil size={11} /> Editar
                </button>
              </div>
            </div>
          </article>
        ))}
        <Link
          href="/nerka/perfil/nuevo-producto"
          className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[var(--niar-border)] bg-[var(--niar-surface)] p-3 text-sm font-medium text-[var(--niar-sage-on)] hover:border-[var(--niar-sage)] hover:bg-[var(--niar-sage-mute)]"
        >
          <PackagePlus size={22} />
          Agregar producto
        </Link>
      </div>

      {services.length ? (
        <>
          <div className="mt-10" />
          <SectionTitle
            title="Servicios"
            subtitle="Sin precio fijo, se coordinan por mensaje"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.id}
                className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5"
              >
                <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                  {s.name}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--niar-ink-mute)]">
                  {s.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-[var(--niar-success-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--niar-success)]">
                    Activo
                  </span>
                  <button className="text-[11px] font-medium text-[var(--niar-sage-on)]">
                    Editar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
