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
    <Suspense fallback={<div className="px-4 py-6 lg:px-8 lg:py-10" />}>
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
      <main className="px-4 py-6 lg:px-8 lg:py-10">
        <EmptyState
          title="Falta indicar el destinatario"
          description="Esta página se abre desde un perfil o un producto."
          cta="Explorar emprendedores"
          href="/niar/explorar"
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
      // Si cambia el destinatario / producto, remontamos el form para que tome el nuevo `initialText`.
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
      onSent={() => router.push("/niar/mensajes")}
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
    // Pequeño delay para feedback visual antes del redirect.
    setTimeout(onSent, 900);
  };

  const waLink = `https://wa.me/${profile.contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

  return (
    <main className="px-4 py-5 pb-32 lg:px-8 lg:py-8 lg:pb-12">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href={`/niar/emprendedores/${profile.id}`}
          className="inline-flex items-center gap-1 rounded-xl border border-[#ece8f7] bg-white px-3 py-1.5 text-xs font-medium text-[#5B2EFF] hover:bg-[#F2ECFF]"
        >
          <ArrowLeft size={13} /> Volver al perfil
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white">
          <header className="flex items-center gap-3 border-b border-[#f1ecfb] px-4 py-3">
            <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-[#1f1833]">{profile.name}</p>
              <p className="text-xs text-[#6F6A7C]">{profile.responseTime}</p>
            </div>
          </header>

          {product ? (
            <div className="border-b border-[#f1ecfb] bg-[#FAFAFC] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9088a3]">
                Consulta sobre
              </p>
              <div className="mt-1 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-medium text-[#1f1833]">{product.name}</p>
                  <p className="text-xs text-[#6F6A7C]">
                    {product.price ? `$${product.price.toLocaleString("es-AR")}` : "Precio a consultar"}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="px-4 py-4">
            <p className="text-xs text-[#6F6A7C]">
              Te sugerimos un mensaje. Editalo si querés y enviálo.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 min-h-32 w-full rounded-2xl border border-[#ece8f7] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#9b95aa] focus:border-[#d9cef8]"
              placeholder="Escribí tu mensaje..."
            />

            <div className="mt-3 flex flex-wrap gap-2">
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
                  className="rounded-full border border-[#ece8f7] bg-white px-3 py-1.5 text-xs text-[#433d56] hover:bg-[#F2ECFF]"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={onSend}
                disabled={!text.trim() || sent}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                <Send size={15} /> {sent ? "Mensaje enviado" : "Enviar mensaje interno"}
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-white px-4 py-3 text-sm font-medium text-[#1f7a3b]"
              >
                Abrir en WhatsApp
              </a>
            </div>

            {sent ? (
              <p className="mt-3 rounded-xl bg-[#E7F9EE] px-3 py-2 text-xs text-[#197a43]">
                ¡Listo! Tu mensaje queda guardado en{" "}
                <Link href="/niar/mensajes" className="font-semibold underline">Mensajes</Link>.
                Te llevamos para ahí.
              </p>
            ) : null}
          </div>
        </section>

        <aside className="space-y-3">
          <div className="rounded-2xl border border-[#ece8f7] bg-white p-4">
            <p className="text-sm font-semibold text-[#2B174F]">Sobre {profile.name}</p>
            <p className="mt-2 text-xs text-[#6F6A7C]">{profile.about}</p>
            <div className="mt-3 space-y-1.5 text-xs text-[#433d56]">
              <p className="inline-flex items-center gap-1"><Star size={12} className="fill-[#ffb547] text-[#ffb547]" /> {profile.rating} ({profile.reviews} reseñas)</p>
              <p className="inline-flex items-center gap-1"><MapPin size={12} /> {profile.zone}</p>
              <p className="inline-flex items-center gap-1"><Sparkles size={12} className="text-[#5B2EFF]" /> {profile.responseTime}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.badges.map((b) => (
                <BadgeTrust key={b} badge={b} />
              ))}
            </div>
          </div>
          <Link
            href={`/niar/emprendedores/${profile.id}`}
            className="block rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm text-[#5B2EFF] hover:bg-[#F2ECFF]"
          >
            Ver catálogo completo →
          </Link>
        </aside>
      </div>
    </main>
  );
}
