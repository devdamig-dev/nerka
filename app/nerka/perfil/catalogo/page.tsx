"use client";

import Link from "next/link";
import { ArrowLeft, PackagePlus, Pencil } from "lucide-react";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";
import { SectionTitle } from "@/components/nerka/ui";

export default function CatalogoPage() {
  const { user } = useRole();
  const profile = getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const products = profile.catalog.filter((c) => c.type === "product");
  const services = profile.catalog.filter((c) => c.type === "service");

  return (
    <main className="px-4 py-5 pb-24 lg:px-8 lg:py-8 lg:pb-10">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link href="/nerka" className="rounded-xl border border-[#ece8f7] bg-white p-2 text-[#5B2EFF]">
            <ArrowLeft size={14} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[#2B174F] lg:text-2xl">Mi catálogo</h1>
            <p className="text-xs text-[#6F6A7C] lg:text-sm">
              {products.length} productos · {services.length} servicios
            </p>
          </div>
        </div>
        <Link
          href="/nerka/perfil/nuevo-producto"
          className="inline-flex items-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
        >
          <PackagePlus size={14} /> Nuevo producto
        </Link>
      </div>

      <SectionTitle title="Productos" subtitle="Tocá una card para editar" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white">
            <img src={p.image} alt={p.name} className="h-32 w-full object-cover" />
            <div className="space-y-1 p-3">
              <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{p.name}</p>
              <p className="text-xs text-[#5B2EFF]">{p.price ? formatPrice(p.price) : "A consultar"}</p>
              <div className="flex items-center justify-between pt-1">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p.available ? "bg-[#E7F9EE] text-[#197a43]" : "bg-[#f1f1f1] text-[#8a8a8a]"
                  }`}
                >
                  {p.available ? "Disponible" : "Pausado"}
                </span>
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5B2EFF]">
                  <Pencil size={11} /> Editar
                </button>
              </div>
            </div>
          </article>
        ))}
        <Link
          href="/nerka/perfil/nuevo-producto"
          className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d9cef8] bg-[#FAFAFC] p-3 text-sm font-medium text-[#5B2EFF] hover:bg-[#F2ECFF]"
        >
          <PackagePlus size={20} />
          Agregar producto
        </Link>
      </div>

      {services.length ? (
        <>
          <div className="mt-8" />
          <SectionTitle title="Servicios" subtitle="Sin precio fijo, se coordinan por mensaje" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                <p className="text-sm font-semibold text-[#1f1833]">{s.name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[#6F6A7C]">{s.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-[#E7F9EE] px-2 py-0.5 text-[10px] font-medium text-[#197a43]">
                    Activo
                  </span>
                  <button className="text-[11px] font-medium text-[#5B2EFF]">Editar</button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
