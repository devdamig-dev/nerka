"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Crown, Sparkles, Store } from "lucide-react";
import { subscriptionPlans } from "@/lib/plans";
import { useRole } from "@/lib/role-context";

export default function PlanesPage() {
  const { isEntrepreneur, toggleRole } = useRole();
  const [interest, setInterest] = useState<Record<string, boolean>>({});

  const registerInterest = (planId: string) => {
    setInterest((p) => ({ ...p, [planId]: true }));
    if (typeof window !== "undefined") {
      // mock: guardamos el interés a futuro y dejamos console.log para debug.
      try {
        const raw = window.localStorage.getItem("nerka.interest.v1");
        const list = raw ? (JSON.parse(raw) as string[]) : [];
        if (!list.includes(planId)) list.push(planId);
        window.localStorage.setItem("nerka.interest.v1", JSON.stringify(list));
      } catch {
        // ignore
      }
      // eslint-disable-next-line no-console
      console.log("[Nerka] Interés registrado en plan:", planId);
    }
  };

  return (
    <main className="px-4 py-6 pb-20 lg:px-8 lg:py-10">
      {/* HERO */}
      <section className="rounded-3xl border border-[#ece8f7] bg-gradient-to-br from-white to-[#F8F4FF] p-6 lg:p-10">
        <p className="inline-flex items-center gap-1 rounded-full bg-[#F2ECFF] px-2.5 py-1 text-xs font-semibold text-[#5B2EFF]">
          <Crown size={12} /> Planes Nerka
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-[#1f1833] lg:text-4xl">
          Crecé en Nerka cuando estés listo
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#6F6A7C] lg:text-base">
          Empezá gratis con tu perfil comercial, catálogo y pedidos por WhatsApp. Cuando tu
          negocio crezca, sumá visibilidad, métricas y herramientas profesionales.
        </p>
        {!isEntrepreneur ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-[#ece8f7]">
            <Store size={15} className="text-[#5B2EFF]" />
            <span className="text-[#433d56]">
              Estás viendo los planes como visitante.{" "}
              <button
                type="button"
                onClick={toggleRole}
                className="font-medium text-[#5B2EFF] underline-offset-2 hover:underline"
              >
                Activar mi perfil de emprendedor
              </button>
              .
            </span>
          </div>
        ) : null}
      </section>

      {/* PLANS GRID */}
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const isComingSoon = plan.status === "coming_soon";
          const interested = interest[plan.id];
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 ${
                plan.highlight
                  ? "border-[#5B2EFF] bg-gradient-to-br from-[#F8F4FF] to-white shadow-md"
                  : "border-[#ece8f7] bg-white shadow-sm"
              }`}
            >
              {plan.highlight ? (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#5B2EFF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  <Sparkles size={11} /> Más popular
                </span>
              ) : null}
              <div>
                <p className="text-sm font-semibold text-[#5B2EFF]">{plan.name}</p>
                <p className="mt-1 text-xs text-[#6F6A7C]">{plan.tagline}</p>
                <p className="mt-4 text-3xl font-semibold text-[#1f1833]">
                  {plan.price}
                  {plan.id === "free" ? <span className="ml-1 text-xs font-normal text-[#6F6A7C]">por siempre</span> : null}
                </p>
                {isComingSoon ? (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFF4E8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#9b5a00]">
                    Próximamente
                  </span>
                ) : null}
              </div>

              <ul className="mt-5 space-y-2 text-sm text-[#433d56]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#197a43]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {plan.id === "free" ? (
                  <Link
                    href="/nerka/perfil"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-[#ece8f7] bg-white px-3 py-2.5 text-sm font-medium text-[#5B2EFF]"
                  >
                    Plan actual · Ir a Mi negocio
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => registerInterest(plan.id)}
                    disabled={interested}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${
                      interested
                        ? "bg-[#E7F9EE] text-[#197a43]"
                        : plan.highlight
                          ? "bg-[#5B2EFF] text-white hover:bg-[#4924d0]"
                          : "border border-[#d9cef8] bg-white text-[#5B2EFF] hover:bg-[#F2ECFF]"
                    }`}
                  >
                    {interested ? (
                      <>
                        <Check size={15} /> Te avisamos cuando esté disponible
                      </>
                    ) : (
                      plan.cta.label
                    )}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* FAQ */}
      <section className="mt-10 grid gap-4 rounded-3xl border border-[#ece8f7] bg-white p-6 lg:grid-cols-2 lg:p-8">
        <div>
          <h2 className="text-lg font-semibold text-[#2B174F]">Preguntas frecuentes</h2>
          <p className="mt-1 text-sm text-[#6F6A7C]">
            Sobre Nerka, planes y cómo funcionan los pedidos.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          {[
            {
              q: "¿Hay pagos online?",
              a: "Por ahora no. El cierre de la operación es siempre conversacional, por WhatsApp o mensajería interna. Más adelante sumamos pagos opcionales.",
            },
            {
              q: "¿Hay envíos?",
              a: "Cada emprendimiento define sus modalidades (retiro, envío, atención a domicilio, online). Coordinás directo con el negocio.",
            },
            {
              q: "¿Qué pasa cuando esté disponible Pro o Negocio?",
              a: "Si registraste tu interés, te avisamos. Vas a poder elegir si cambiás de plan o seguís en el gratuito.",
            },
          ].map((f) => (
            <details key={f.q} className="rounded-xl border border-[#ece8f7] bg-[#FAFAFC] p-3 text-sm">
              <summary className="cursor-pointer font-medium text-[#2B174F]">{f.q}</summary>
              <p className="mt-2 text-[#6F6A7C]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
