"use client";

import { useRouter } from "next/navigation";
import { categories } from "@/lib/nerka-data";

export default function NuevaSolicitudPage() {
  const router = useRouter();

  return (
    <main className="px-4 py-5 pb-24">
      <h1 className="text-xl font-semibold text-[#2B174F]">Publicar una solicitud</h1>
      <p className="mt-1 text-sm text-[#6F6A7C]">Pedí lo que necesitás. Recibí propuestas. Elegí mejor.</p>

      <form
        className="mt-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/nerka/solicitudes?created=req-cumple-1");
        }}
      >
        <Field label="¿Qué necesitás?" placeholder="Ej: Cumpleaños de 1 año" required />
        <label className="block text-sm font-medium text-[#2B174F]">
          Categoría
          <select className="mt-1 w-full rounded-xl border border-[#ece8f7] bg-white px-3 py-2.5 text-sm" required>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <Field label="Fecha" type="date" required />
        <Field label="Zona" placeholder="Berazategui" required />
        <Field label="Presupuesto estimado (opcional)" placeholder="$150.000" />
        <label className="block text-sm font-medium text-[#2B174F]">
          Descripción
          <textarea className="mt-1 min-h-24 w-full rounded-xl border border-[#ece8f7] bg-white px-3 py-2.5 text-sm" placeholder="Contá brevemente qué necesitás" required />
        </label>
        <Field label="Fotos de referencia (opcional)" type="file" />
        <Field label="Preferencias adicionales" placeholder="Colores, estilo, horario, etc." />

        <button className="mt-2 w-full rounded-xl bg-[#5B2EFF] px-4 py-3 font-medium text-white">Publicar solicitud</button>
      </form>
    </main>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm font-medium text-[#2B174F]">
      {label}
      <input {...props} className="mt-1 w-full rounded-xl border border-[#ece8f7] bg-white px-3 py-2.5 text-sm" />
    </label>
  );
}
