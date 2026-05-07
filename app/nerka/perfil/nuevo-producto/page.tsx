"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

const types = ["Producto", "Servicio"];

export default function NuevoProductoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Producto");
  const [unit, setUnit] = useState("");
  const [available, setAvailable] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10">
      <header className="mb-6 flex items-center gap-3">
        <Link
          href="/nerka/perfil/catalogo"
          className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2 text-[var(--niar-ink-mute)] hover:text-[var(--niar-ink)]"
        >
          <ArrowLeft size={14} />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
            Mi negocio
          </p>
          <h1 className="font-display mt-1 text-2xl font-semibold text-[var(--niar-ink)] lg:text-3xl">
            Nuevo producto
          </h1>
          <p className="text-sm text-[var(--niar-ink-mute)]">
            Cargá lo básico. Después podés mejorarlo desde el catálogo.
          </p>
        </div>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          // eslint-disable-next-line no-console
          console.log("[NIAR] Producto mock creado", { name, desc, price, type, unit, available });
          setTimeout(() => router.push("/nerka/perfil/catalogo"), 800);
        }}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <section className="space-y-5 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-6">
          <Field label="Nombre" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ej: Torta de chocolate"
              className="w-full rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--niar-sage)]"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Contá brevemente qué incluye, sabores, etc."
              className="min-h-24 w-full rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--niar-sage)]"
            />
            <button
              type="button"
              disabled
              className="mt-2 inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-[var(--niar-warn-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--niar-warn)]"
            >
              <Sparkles size={11} /> Generar con IA · Próximamente
            </button>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Precio (opcional)">
              <div className="flex items-center rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3.5 py-2.5 focus-within:border-[var(--niar-sage)]">
                <span className="mr-1 text-sm text-[var(--niar-ink-mute)]">$</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  inputMode="numeric"
                  placeholder="20000"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </Field>
            <Field label="Unidad (opcional)">
              <input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="unidad / kg / sesión"
                className="w-full rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--niar-sage)]"
              />
            </Field>
          </div>

          <Field label="Tipo">
            <div className="flex gap-2">
              {types.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setType(c)}
                  className={`rounded-full px-4 py-1.5 text-xs transition ${
                    type === c
                      ? "bg-[var(--niar-ink)] text-white"
                      : "border border-[var(--niar-border)] bg-[var(--niar-surface)] text-[var(--niar-ink-mute)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <label className="flex items-center justify-between rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-bg)] px-4 py-3 text-sm">
            <span>
              <p className="font-medium text-[var(--niar-ink)]">Disponible para vender</p>
              <p className="text-xs text-[var(--niar-ink-mute)]">
                Si lo pausás, se muestra como No disponible.
              </p>
            </span>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-5 w-5 accent-[var(--niar-sage)]"
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--niar-ink)] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {submitted ? "Guardando..." : "Publicar producto"}
            </button>
            <Link
              href="/nerka/perfil/catalogo"
              className="inline-flex items-center justify-center rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm font-medium text-[var(--niar-ink)]"
            >
              Cancelar
            </Link>
          </div>

          {submitted ? (
            <p className="rounded-2xl bg-[var(--niar-success-soft)] px-3 py-2 text-xs text-[var(--niar-success)]">
              ¡Producto guardado! Te llevamos al catálogo.
            </p>
          ) : null}
        </section>

        <aside className="space-y-3">
          <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 text-sm text-[var(--niar-ink-mute)]">
            <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
              Tips para vender más
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>· Usá una foto principal clara y bien iluminada.</li>
              <li>· Poné el nombre del producto en el título.</li>
              <li>· Si tenés precio fijo, mostralo. Genera más confianza.</li>
              <li>· Mantené disponibles sólo los productos que podés entregar.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--niar-lila)] bg-[var(--niar-lila-soft)] p-5 text-xs text-[var(--niar-ink-mute)]">
            <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-lila-deep)]">
              <Sparkles size={10} /> Próximamente
            </p>
            <p className="mt-2 text-[var(--niar-ink)]">
              IA para sugerir título, descripción y rango de precio según tu rubro y zona.
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-[var(--niar-ink)]">
      {label}
      {required ? <span className="ml-1 text-[var(--niar-sage-on)]">*</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
