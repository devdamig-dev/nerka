"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Send, Sparkles, Star } from "lucide-react";
import { BadgeTrust, EmptyState } from "@/components/nerka/ui";
import { getEntrepreneurById } from "@/lib/nerka-data";
import type { TrustBadge } from "@/lib/types";
import {
  pushDraft,
  suggestProductGreeting,
  suggestProfileGreeting,
} from "@/lib/messages-mock";

export default function NewMessagePage() {
  return (
    <Suspense fallback={<div className="px-5 py-6 lg:px-2 lg:py-10" />}>
      <NewMessageContent />
    </Suspense>
  );
}

function NewMessageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const to = params.get("to");
  const productId = params.get("product");
  const entrepreneur = to ? getEntrepreneurById(to) : null;

  if (!entrepreneur) {
    return (
      <main className="px-5 py-8 lg:px-2 lg:py-10">
        <EmptyState
          title="Falta indicar el destinatario"
          description="Esta página se abre desde un perfil o un producto."
          cta="Descubrir tiendas"
          href="/nerka/explorar"
        />
      </main>
    );
  }

  const product = productId ? entrepreneur.catalog.find((c) => c.id === productId) : null;
  const initialText = product
    ? suggestProductGreeting(entrepreneur.name, product.name)
    : suggestProfileGreeting(entrepreneur.name);

  return (
    <NewMessageForm
      key={`${entrepreneur.id}-${product?.id ?? "none"}`}
      profile={{
        id: entrepreneur.id,
        name: entrepreneur.name,
        avatar: entrepreneur.avatar,
        about: entrepreneur.about,
        responseTime: entrepreneur.responseTime,
        zone: entrepreneur.zone,
        rating: entrepreneur.rating,
        reviews: entrepreneur.reviews,
        badges: entrepreneur.badges as readonly TrustBadge[],
        contactPhone: entrepreneur.contactPhone,
      }}
      product={product ?? null}
      initialText={initialText}
      onSent={() => router.push("/nerka/mensajes")}
    />
  );
}

type FormProfile = {
  id: string;
  name: string;
  avatar: string;
  about: string;
  responseTime: string;
  zone: string;
  rating: number;
  reviews: number;
  badges: readonly TrustBadge[];
  contactPhone: string;
};

type FormProduct = {
  id: string;
  name: string;
  image: string;
  price?: number;
};

function NewMessageForm({
  profile,
  product,
  initialText,
  onSent,
}: {
  profile: FormProfile;
  product: FormProduct | null;
  initialText: string;
  onSent: () => void;
}) {
  const [text, setText] = useState(initialText);
  const [sent, setSent] = useState(false);

  const onSend = () => {
    if (!text.trim()) return;
    pushDraft({
      entrepreneurId: profile.id,
      productId: product?.id,
      draftText: text.trim(),
    });
    setSent(true);
    setTimeout(onSent, 900);
  };

  const waLink = `https://wa.me/${profile.contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

  return (
    <main className="px-5 py-6 pb-32 lg:px-2 lg:py-8 lg:pb-12">
      <div className="mb-5">
        <Link
          href={`/nerka/emprendedores/${profile.id}`}
          className="inline-flex items-center gap-1 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1.5 text-xs font-medium text-[var(--niar-ink-mute)] hover:text-[var(--niar-ink)]"
        >
          <ArrowLeft size={13} /> Volver al perfil
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]">
          <header className="flex items-center gap-3 border-b border-[var(--niar-border-soft)] px-5 py-4">
            <img src={profile.avatar} alt={profile.name} className="h-11 w-11 rounded-2xl object-cover" />
            <div>
              <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                {profile.name}
              </p>
              <p className="text-xs text-[var(--niar-ink-mute)]">{profile.responseTime}</p>
            </div>
          </header>

          {product ? (
            <div className="border-b border-[var(--niar-border-soft)] bg-[var(--niar-bg)] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-ink-soft)]">
                Consulta sobre
              </p>
              <div className="mt-1.5 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-medium text-[var(--niar-ink)]">{product.name}</p>
                  <p className="font-display text-sm font-semibold text-[var(--niar-ink)]">
                    {product.price ? `$${product.price.toLocaleString("es-AR")}` : "Precio a consultar"}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="px-5 py-5">
            <p className="text-xs text-[var(--niar-ink-mute)]">
              Te sugerimos un mensaje. Editalo y enviálo.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3 min-h-32 w-full rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm outline-none placeholder:text-[var(--niar-ink-soft)] focus:border-[var(--niar-sage)]"
              placeholder="Escribí tu mensaje..."
            />

            <div className="niar-scroll mt-3 flex flex-wrap gap-2">
              {[
                "¿Está disponible?",
                "¿Hacés envíos a mi zona?",
                "¿Cuánto demora la entrega?",
                "Quiero un presupuesto.",
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setText((t) => (t.endsWith(" ") || !t ? `${t}${q}` : `${t} ${q}`))}
                  className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1.5 text-xs text-[var(--niar-ink-mute)] hover:border-[var(--niar-sage)] hover:text-[var(--niar-sage-on)]"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={onSend}
                disabled={!text.trim() || sent}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-ink)] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                <Send size={15} /> {sent ? "Mensaje enviado" : "Enviar mensaje interno"}
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-wa)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--niar-wa-deep)]"
              >
                Abrir en WhatsApp
              </a>
            </div>

            {sent ? (
              <p className="mt-3 rounded-2xl bg-[var(--niar-success-soft)] px-3 py-2 text-xs text-[var(--niar-success)]">
                ¡Listo! Tu mensaje queda en{" "}
                <Link href="/nerka/mensajes" className="font-semibold underline">Mensajes</Link>.
              </p>
            ) : null}
          </div>
        </section>

        <aside className="space-y-3">
          <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
            <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
              Sobre {profile.name}
            </p>
            <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">{profile.about}</p>
            <div className="mt-4 space-y-1.5 text-xs text-[var(--niar-ink-mute)]">
              <p className="inline-flex items-center gap-1.5">
                <Star size={12} className="fill-[#f0a93f] text-[#f0a93f]" />
                <span className="text-[var(--niar-ink)]">{profile.rating}</span>
                <span>({profile.reviews} reseñas)</span>
              </p>
              <p className="inline-flex items-center gap-1.5">
                <MapPin size={12} /> {profile.zone}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--niar-sage-on)]" /> {profile.responseTime}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.badges.map((b) => (
                <BadgeTrust key={b} badge={b} />
              ))}
            </div>
          </div>
          <Link
            href={`/nerka/emprendedores/${profile.id}`}
            className="block rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-4 text-sm text-[var(--niar-sage-on)] hover:border-[var(--niar-sage)]"
          >
            Ver catálogo completo →
          </Link>
        </aside>
      </div>
    </main>
  );
}
