"use client";

import Link from "next/link";
import { Building2, Check, Crown, MessageCircle, Sparkles, Store } from "lucide-react";
import { communityPlan, subscriptionPlans } from "@/lib/plans";
import { useRole } from "@/lib/role-context";

export default function PlanesPage() {
  const { isEntrepreneur, toggleRole } = useRole();

  return (
    <main className="px-4 py-6 pb-20 lg:px-8 lg:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-[#E6DDD0] bg-[#1f241f] p-6 text-white lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10">
              <Crown size={12} /> Planes comerciales
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight lg:text-5xl">
              Convertí tu perfil en una tienda local que se descubre y vende.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72 lg:text-base">
              NIAR se enfoca en catálogo, descubrimiento local, WhatsApp y pedidos simples. Sin pagos, logística ni checkout complejo: foco en consulta, catálogo y venta conversacional.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/niar/perfil" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#1f241f]">
                Crear perfil comercial <Store size={15} />
              </Link>
              <Link href="/niar/explorar" className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white">
                Ver cómo se explora
              </Link>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Foco del producto</p>
            <div className="mt-4 grid gap-2 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {["Exploración pública", "Perfiles comerciales", "Catálogos visuales", "Pedidos por WhatsApp", "Destacados", "Métricas comerciales"].map((item) => (
                <span key={item} className="rounded-2xl bg-white/10 px-3 py-2 ring-1 ring-white/10">{item}</span>
              ))}
            </div>
          </div>
        </div>
        {!isEntrepreneur ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/10">
            <Store size={15} />
            <span>
              Podés explorar sin registrarte. Si tenés un negocio, {" "}
              <button type="button" onClick={toggleRole} className="font-semibold underline underline-offset-4">
                activá la vista comercial
              </button>
              .
            </span>
          </div>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.1fr_0.95fr]">
        {subscriptionPlans.map((plan) => (
          <article
            key={plan.id}
            className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border p-6 ${
              plan.highlight
                ? "border-[#6E7F63] bg-gradient-to-br from-[#EEF3EA] via-white to-[#FBF8F3] shadow-xl shadow-[#6E7F63]/12 lg:-translate-y-2"
                : "border-[#E6DDD0] bg-white shadow-sm"
            }`}
          >
            {plan.highlight ? (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#6E7F63] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                <Sparkles size={11} /> Plan ideal
              </span>
            ) : null}
            <div>
              <p className="text-sm font-semibold text-[#6E7F63]">Plan {plan.name}</p>
              <h2 className="mt-2 pr-16 text-2xl font-semibold text-[#1f241f]">{plan.tagline}</h2>
              <p className="mt-4 text-3xl font-semibold text-[#1f241f]">
                {plan.price}
                {plan.id !== "catalog" ? <span className="ml-1 text-xs font-normal text-[#666C60]">/mes</span> : <span className="ml-1 text-xs font-normal text-[#666C60]">para empezar</span>}
              </p>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-[#555C51]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#197a43]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.excludedFeatures?.length ? (
              <div className="mt-5 rounded-2xl border border-[#E6DDD0] bg-[#FBF8F3] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A8378]">No incluye</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#666C60]">
                  {plan.excludedFeatures.map((feature) => (
                    <li key={feature}>— {feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href={plan.cta.href ?? "/niar/perfil"}
              className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                plan.highlight ? "bg-[#6E7F63] text-white" : "border border-[#C8D4BF] bg-white text-[#6E7F63] hover:bg-[#EEF3EA]"
              }`}
            >
              {plan.cta.label}
            </Link>
          </article>
        ))}
      </section>

      <section id="instituciones" className="mt-10 rounded-[1.75rem] border opacity-80 border-[#E6DDD0] bg-white p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-[#EEF3EA] px-2.5 py-1 text-xs font-semibold text-[#6E7F63]">
              <Building2 size={12} /> Secundario
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1f241f]">{communityPlan.name}</h2>
            <p className="mt-2 text-sm text-[#666C60]">{communityPlan.tagline}. Pensado para ordenar una red comercial sin convertir a NIAR en una plataforma institucional.</p>
            <Link href={communityPlan.cta.href} className="mt-5 inline-flex rounded-2xl border border-[#C8D4BF] px-4 py-3 text-sm font-semibold text-[#6E7F63]">
              {communityPlan.cta.label}
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {communityPlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 rounded-2xl bg-[#FBF8F3] p-3 text-sm text-[#555C51]">
                <Check size={15} className="mt-0.5 shrink-0 text-[#197a43]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-4 rounded-[1.75rem] border border-[#E6DDD0] bg-white p-6 lg:grid-cols-2 lg:p-8">
        <div>
          <h2 className="text-lg font-semibold text-[#1f241f]">Reglas simples</h2>
          <p className="mt-1 text-sm text-[#666C60]">NIAR prioriza ventas conversacionales y operación liviana.</p>
        </div>
        <div className="space-y-3 text-sm">
          {[
            { q: "¿NIAR procesa pagos?", a: "No. La operación se coordina por WhatsApp o mensajería interna." },
            { q: "¿Incluye logística?", a: "No. Cada comercio define retiro, envío, atención a domicilio u online." },
            { q: "¿Qué plan conviene?", a: "Catálogo sirve para estar presente. Vender es el plan recomendado si querés carrito simple, prioridad y promociones." },
          ].map((item) => (
            <details key={item.q} className="rounded-xl border border-[#E6DDD0] bg-[#FBF8F3] p-3">
              <summary className="cursor-pointer font-medium text-[#1f241f]">{item.q}</summary>
              <p className="mt-2 text-[#666C60]">{item.a}</p>
            </details>
          ))}
          <a href="https://wa.me/5491112340000?text=Hola%20NIAR%2C%20quiero%20consultar%20por%20planes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 font-semibold text-white">
            <MessageCircle size={15} /> Consultar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
