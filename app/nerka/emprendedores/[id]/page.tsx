"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { BadgeTrust, EmptyState } from "@/components/nerka/ui";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";

const tabs = ["Trabajos", "Catálogo", "Reseñas", "Info"] as const;

export default function EntrepreneurProfilePage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Trabajos");
  const entrepreneur = getEntrepreneurById(params.id);

  if (!entrepreneur) {
    return <main className="p-4"><EmptyState title="Perfil no encontrado" description="Este emprendimiento no existe o fue removido." cta="Explorar" href="/nerka/explorar" /></main>;
  }

  return (
    <main className="pb-20">
      <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-44 w-full object-cover" />
      <div className="relative px-4 pb-4">
        <img src={entrepreneur.avatar} alt={entrepreneur.name} className="-mt-10 h-20 w-20 rounded-2xl border-4 border-[#FAFAFC] object-cover" />
        <h1 className="mt-3 text-xl font-semibold text-[#1f1833]">{entrepreneur.name}</h1>
        <p className="text-sm text-[#6F6A7C]">{entrepreneur.category}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-[#433d56]">
          <span className="inline-flex items-center gap-1"><Star size={14} className="fill-[#ffb547] text-[#ffb547]" /> {entrepreneur.rating}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={14} /> {entrepreneur.zone}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">{entrepreneur.badges.map((b) => <BadgeTrust key={b} badge={b} />)}</div>

        <div className="sticky top-0 z-20 mt-4 rounded-2xl bg-[#FAFAFC] py-2">
          <div className="grid grid-cols-4 rounded-xl bg-white p-1">
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-2 py-2 text-xs ${tab === item ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#756f89]"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-4">
          {tab === "Trabajos" ? (
            <div className="grid grid-cols-3 gap-2">
              {entrepreneurs.slice(0, 6).map((e) => <img key={e.id} src={e.cover} alt="Trabajo" className="h-24 w-full rounded-xl object-cover" />)}
            </div>
          ) : null}
          {tab === "Catálogo" ? (
            <div className="space-y-3">
              {entrepreneur.offers.map((offer, idx) => (
                <article key={offer} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                  <p className="font-medium text-[#1f1833]">{offer}</p>
                  <p className="mt-1 text-sm text-[#6F6A7C]">Servicio premium personalizado para tu evento.</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-[#433d56]">{idx === 1 ? "A consultar" : `$${(idx + 1) * 45000}`}</p>
                    <button className="rounded-xl bg-[#F2ECFF] px-3 py-1.5 text-sm text-[#5B2EFF]">Consultar</button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          {tab === "Reseñas" ? (
            <div className="space-y-3">
              {["Sofía R.", "Carla M.", "Micaela T."].map((name, i) => (
                <article key={name} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                  <p className="font-medium text-[#1f1833]">{name}</p>
                  <p className="text-xs text-[#6F6A7C]">{i + 3} de abril</p>
                  <p className="mt-2 text-sm text-[#433d56]">Excelente servicio, súper puntual y muy buena predisposición.</p>
                </article>
              ))}
            </div>
          ) : null}
          {tab === "Info" ? (
            <article className="space-y-2 rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm text-[#433d56]">
              <p>{entrepreneur.about}</p>
              <p><strong>Qué ofrece:</strong> {entrepreneur.offers.join(", ")}</p>
              <p><strong>Zona de cobertura:</strong> Zona Sur y alrededores</p>
              <p><strong>Tiempos de respuesta:</strong> {entrepreneur.responseTime}</p>
              <p><strong>Modalidad:</strong> {entrepreneur.modality}</p>
            </article>
          ) : null}
        </section>
      </div>

      <div className="fixed bottom-18 left-0 right-0 z-30 mx-auto w-full max-w-md px-4 md:bottom-24">
        <Link href="/nerka/solicitudes/nueva" className="block rounded-2xl bg-[#5B2EFF] px-4 py-3 text-center font-medium text-white shadow-lg">Solicitar presupuesto</Link>
      </div>
    </main>
  );
}
