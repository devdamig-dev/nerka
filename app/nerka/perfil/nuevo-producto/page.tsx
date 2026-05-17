"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const categories = [
  "Producto",
  "Servicio",
];

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
    <main className="px-4 py-5 pb-24 lg:px-8 lg:py-8 lg:pb-12">
      <div className="mb-4 flex items-center gap-2">
        <Link href="/niar/perfil/catalogo" className="rounded-xl border border-[#E6DDD0] bg-white p-2 text-[#6E7F63]">
          <ArrowLeft size={14} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-[#2F3A2B] lg:text-2xl">Nuevo producto</h1>
          <p className="text-xs text-[#666C60] lg:text-sm">
            Cargá lo básico. Después podés mejorarlo desde el catálogo.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          // mock — log y vuelta al catálogo.
                  console.log("[NIAR] Producto mock creado", { name, desc, price, type, unit, available });
          setTimeout(() => router.push("/niar/perfil/catalogo"), 800);
        }}
        className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <section className="space-y-4 rounded-2xl border border-[#E6DDD0] bg-white p-5">
          <Field label="Nombre" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ej: Torta de chocolate"
              className="w-full rounded-xl border border-[#E6DDD0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C8D4BF]"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Contá brevemente qué incluye, sabores, etc."
              className="min-h-24 w-full rounded-xl border border-[#E6DDD0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C8D4BF]"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Precio (opcional)">
              <div className="flex items-center rounded-xl border border-[#E6DDD0] bg-white px-3 py-2.5 focus-within:border-[#C8D4BF]">
                <span className="mr-1 text-sm text-[#666C60]">$</span>
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
                className="w-full rounded-xl border border-[#E6DDD0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#C8D4BF]"
              />
            </Field>
          </div>

          <Field label="Tipo">
            <div className="flex gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setType(c)}
                  className={`rounded-full px-3 py-1.5 text-xs ${
                    type === c
                      ? "bg-[#6E7F63] text-white"
                      : "border border-[#E6DDD0] bg-white text-[#4F554B]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <label className="flex items-center justify-between rounded-xl border border-[#E6DDD0] bg-[#FBF8F3] px-3 py-2 text-sm">
            <span>
              <p className="font-medium text-[#2F3A2B]">Disponible para vender</p>
              <p className="text-xs text-[#666C60]">Si lo pausás, se muestra como No disponible.</p>
            </span>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-5 w-5 accent-[#6E7F63]"
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#6E7F63] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {submitted ? "Guardando..." : "Publicar producto"}
            </button>
            <Link
              href="/niar/perfil/catalogo"
              className="inline-flex items-center justify-center rounded-xl border border-[#E6DDD0] bg-white px-4 py-3 text-sm font-medium text-[#6E7F63]"
            >
              Cancelar
            </Link>
          </div>

          {submitted ? (
            <p className="rounded-xl bg-[#E7F9EE] px-3 py-2 text-xs text-[#197a43]">
              ¡Producto guardado! Te llevamos al catálogo.
            </p>
          ) : null}
        </section>

        <aside className="space-y-3">
          <div className="rounded-2xl border border-[#E6DDD0] bg-white p-4 text-sm text-[#4F554B]">
            <p className="font-semibold text-[#2F3A2B]">Tips para vender más</p>
            <ul className="mt-2 space-y-1.5 text-xs">
              <li>· Usá una foto principal clara y bien iluminada.</li>
              <li>· Poné el nombre del producto en el título.</li>
              <li>· Si tenés precio fijo, mostralo. Genera más confianza.</li>
              <li>· Mantené disponibles sólo los productos que podés entregar.</li>
            </ul>
          </div>
        </aside>
      </form>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-[#2F3A2B]">
      {label}
      {required ? <span className="ml-1 text-[#6E7F63]">*</span> : null}
      <div className="mt-1">{children}</div>
    </label>
  );
}
