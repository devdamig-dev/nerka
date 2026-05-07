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
      try {
        const raw = window.localStorage.getItem("nerka.interest.v1");
        const list = raw ? (JSON.parse(raw) as string[]) : [];
        if (!list.includes(planId)) list.push(planId);
        window.localStorage.setItem("nerka.interest.v1", JSON.stringify(list));
      } catch {
        // ignore
      }
      // eslint-disable-next-line no-console
      console.log("[NIAR] Interés registrado en plan:", planId);
    }
  };

  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10">
      {/* HERO */}
      <section>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--niar-sage-mute)] px-3 py-1 text-xs font-medium text-[var(--niar-sage-on)]">
          <Crown size={12} /> Planes NIAR
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-[var(--niar-ink)] lg:text-[48px]">
          Crecé en NIAR
          <br />
          <span className="text-[var(--niar-ink-mute)]">cuando estés listo.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--niar-ink-mute)]">
          Empezá gratis con tu perfil comercial, catálogo y pedidos por WhatsApp. Cuando tu
          negocio crezca, sumá visibilidad y herramientas profesionales.
        </p>

        {!isEntrepreneur ? (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-2 text-sm">
            <Store size={14} className="text-[var(--niar-sage-on)]" />
            <span className="text-[var(--niar-ink-mute)]">
              Estás viendo planes como visitante.
            </span>
            <button
              type="button"
              onClick={toggleRole}
              className="font-medium text-[var(--niar-sage-on)] hover:text-[var(--niar-sage-deep)]"
            >
              Activar mi tienda →
            </button>
          </div>
        ) : null}
      </section>

      {/* PLANS — 3 col, plan Pro (Vender) destacado en el centro y más grande */}
      <section className="mt-10 grid gap-5 lg:grid-cols-12">
        {subscriptionPlans.map((plan) => {
          const isPro = plan.id === "pro";
          const isFree = plan.id === "free";
          const interested = interest[plan.id];
          const span = isPro ? "lg:col-span-5" : "lg:col-span-3 lg:col-span-3";
          // pro toma 5 cols (centro), free y business 3.5 cada uno
          const colSpan = isPro ? "lg:col-span-5" : "lg:col-span-3";
          const orderClass = isFree
            ? "order-2 lg:order-1 lg:col-start-1"
            : isPro
              ? "order-1 lg:order-2 lg:col-start-4 lg:col-span-6"
              : "order-3 lg:col-start-10 lg:col-span-3";

          return (
            <article
              key={plan.id}
              className={`relative flex flex-col overflow-hidden rounded-3xl p-7 lg:p-8 ${orderClass} ${
                isPro
                  ? "border-2 border-[var(--niar-ink)] bg-[var(--niar-ink)] text-white shadow-[var(--niar-shadow-lg)]"
                  : "border border-[var(--niar-border)] bg-[var(--niar-surface)] text-[var(--niar-ink)]"
              } ${span} ${colSpan}`}
            >
              {isPro ? (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-ink)]">
                  <Sparkles size={11} /> Recomendado
                </span>
              ) : null}

              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    isPro ? "text-white/70" : "text-[var(--niar-ink-soft)]"
                  }`}
                >
                  Plan {plan.name}
                </p>
                <p
                  className={`font-display mt-2 text-2xl font-semibold lg:text-[28px] ${
                    isPro ? "text-white" : "text-[var(--niar-ink)]"
                  }`}
                >
                  {plan.tagline}
                </p>
                <p
                  className={`mt-5 font-display text-4xl font-semibold leading-none ${
                    isPro ? "text-white" : "text-[var(--niar-ink)]"
                  }`}
                >
                  {plan.price}
                  {isFree ? (
                    <span className="ml-1 text-xs font-normal text-[var(--niar-ink-soft)]">
                      por siempre
                    </span>
                  ) : null}
                </p>
                {plan.status === "coming_soon" ? (
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      isPro ? "bg-white/15 text-white" : "bg-[var(--niar-warn-soft)] text-[var(--niar-warn)]"
                    }`}
                  >
                    Próximamente
                  </span>
                ) : null}
              </div>

              <ul
                className={`mt-6 space-y-2.5 text-sm ${
                  isPro ? "text-white/85" : "text-[var(--niar-ink-mute)]"
                }`}
              >
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={15}
                      className={`mt-0.5 shrink-0 ${
                        isPro ? "text-white" : "text-[var(--niar-sage-on)]"
                      }`}
                    />
                    <span className={isPro ? "text-white" : "text-[var(--niar-ink)]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                {isFree ? (
                  <Link
                    href="/nerka/perfil"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm font-medium text-[var(--niar-ink)] hover:border-[var(--niar-sage)]"
                  >
                    Plan actual · Mi negocio
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => registerInterest(plan.id)}
                    disabled={interested}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                      interested
                        ? isPro
                          ? "bg-white/15 text-white"
                          : "bg-[var(--niar-success-soft)] text-[var(--niar-success)]"
                        : isPro
                          ? "bg-white text-[var(--niar-ink)] hover:bg-white/90"
                          : "bg-[var(--niar-ink)] text-white hover:bg-[var(--niar-sage-deep)]"
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
      <section className="mt-14 grid gap-6 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-7 lg:grid-cols-[1fr_2fr] lg:p-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--niar-ink)] lg:text-[28px]">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
            Sobre NIAR, planes y cómo funcionan los pedidos.
          </p>
        </div>
        <div className="space-y-3">
          {[
            {
              q: "¿Hay pagos online?",
              a: "Por ahora no. El cierre de la operación es siempre conversacional, por WhatsApp o mensajería interna.",
            },
            {
              q: "¿Hay envíos?",
              a: "Cada emprendimiento define sus modalidades (retiro, envío, atención a domicilio, online). Coordinás directo con el negocio.",
            },
            {
              q: "¿Qué pasa cuando esté disponible Pro o Negocio?",
              a: "Si registraste interés, te avisamos. Vas a poder elegir si cambiás de plan o seguís en el gratuito.",
            },
            {
              q: "¿Necesito ser técnico para usar NIAR?",
              a: "No. Creás tu perfil, cargás productos con foto y precio, y compartís el link de tu tienda. Listo.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-bg)] p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 text-sm font-medium text-[var(--niar-ink)]">
                {f.q}
                <span className="text-[var(--niar-ink-soft)] transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
