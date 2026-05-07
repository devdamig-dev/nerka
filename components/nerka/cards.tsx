import Link from "next/link";
import { Clock, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import { BadgeTrust, StatusPill } from "./ui";
import type { conversations, entrepreneurs, events, requests } from "@/lib/nerka-data";

type Entrepreneur = (typeof entrepreneurs)[number];
type Event = (typeof events)[number];
type Request = (typeof requests)[number];
type Conversation = (typeof conversations)[number];

// ─────────────────────────────────────────────────────────────────────
// EntrepreneurCard — editorial, una sola CTA primaria
// ─────────────────────────────────────────────────────────────────────
export function EntrepreneurCard({
  entrepreneur,
  horizontal = false,
}: {
  entrepreneur: Entrepreneur;
  horizontal?: boolean;
}) {
  const productCount = entrepreneur.catalog.filter((c) => c.type === "product").length;
  const primaryBadge = entrepreneur.badges[0];

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] transition hover:-translate-y-0.5 hover:border-[var(--niar-border)] hover:shadow-[var(--niar-shadow)] ${
        horizontal ? "min-w-[260px] lg:min-w-0" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={entrepreneur.cover}
          alt={entrepreneur.name}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {primaryBadge ? (
          <span className="absolute left-3 top-3">
            <BadgeTrust badge={primaryBadge} />
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display truncate text-[17px] font-semibold leading-tight text-[var(--niar-ink)]">
              {entrepreneur.name}
            </p>
            <p className="mt-0.5 text-xs text-[var(--niar-ink-mute)]">
              {entrepreneur.category}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[var(--niar-ink-mute)]">
            <Star size={12} className="fill-[#f0a93f] text-[#f0a93f]" />
            <span className="font-medium text-[var(--niar-ink)]">{entrepreneur.rating}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--niar-ink-mute)]">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {entrepreneur.zone}
          </span>
          <span aria-hidden className="text-[var(--niar-ink-faint)]">·</span>
          <span>{productCount} {productCount === 1 ? "producto" : "productos"}</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            href={`/nerka/emprendedores/${entrepreneur.id}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--niar-ink)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--niar-sage-deep)]"
          >
            Ver tienda
          </Link>
          <Link
            href={`/nerka/mensajes/nuevo?to=${entrepreneur.id}`}
            aria-label="Enviar mensaje"
            className="inline-flex items-center justify-center rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2.5 text-[var(--niar-ink-mute)] transition hover:border-[var(--niar-sage)] hover:text-[var(--niar-sage-on)]"
          >
            <MessageCircle size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────
// EventCard — discreto, ya no es protagonista
// ─────────────────────────────────────────────────────────────────────
export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/nerka/eventos/${event.id}`}
      className="group flex items-center gap-4 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-4 transition hover:border-[var(--niar-sage)] hover:shadow-[var(--niar-shadow-sm)]"
    >
      <img
        src={event.image}
        alt={event.name}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-lila-deep)]">
          Activación local
        </p>
        <p className="font-display mt-1 truncate text-[16px] font-semibold leading-tight text-[var(--niar-ink)]">
          {event.name}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--niar-ink-mute)]">
          <Clock size={11} /> {event.date}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-[var(--niar-ink-mute)]">
          <MapPin size={11} /> {event.location}
        </p>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RequestCard
// ─────────────────────────────────────────────────────────────────────
export function RequestCard({ request }: { request: Request }) {
  return (
    <article className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
          {request.title}
        </p>
        <StatusPill status={request.status} />
      </div>
      <p className="text-xs text-[var(--niar-ink-mute)]">
        {request.date} · {request.zone} · {request.category}
      </p>
      <p className="mt-2 text-sm text-[var(--niar-ink)]">{request.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-[var(--niar-ink-mute)]">
          <strong className="text-[var(--niar-ink)]">{request.proposals}</strong> propuestas
        </p>
        <Link
          href={`/nerka/solicitudes/${request.id}`}
          className="rounded-full bg-[var(--niar-sage-mute)] px-3.5 py-2 text-sm font-medium text-[var(--niar-sage-on)]"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ConversationCard
// ─────────────────────────────────────────────────────────────────────
export function ConversationCard({
  item,
  entrepreneur,
}: {
  item: Conversation;
  entrepreneur: Entrepreneur;
}) {
  return (
    <Link
      href={`/nerka/mensajes/${item.id}`}
      className="block rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-4 transition hover:border-[var(--niar-sage)]"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <img src={entrepreneur.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-[var(--niar-ink)]">{entrepreneur.name}</p>
            <p className="text-xs text-[var(--niar-ink-mute)]">{item.summary}</p>
          </div>
        </div>
        <span className="text-xs text-[var(--niar-ink-soft)]">{item.timestamp}</span>
      </div>
      <p className="mb-3 line-clamp-2 text-sm text-[var(--niar-ink)]">{item.lastMessage}</p>
      <StatusPill status={item.status} />
    </Link>
  );
}

// Re-export para back-compat con un consumidor que no usa <Heart />
export { Heart };
