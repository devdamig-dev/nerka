import Link from "next/link";
import { Clock, Eye, Flame, MapPin, MessageCircle, Sparkles, Star, TrendingUp } from "lucide-react";
import { BadgeTrust, StatusPill } from "./ui";
import type { conversations, entrepreneurs, events, requests } from "@/lib/nerka-data";

type Entrepreneur = (typeof entrepreneurs)[number];
type Event = (typeof events)[number];
type Request = (typeof requests)[number];
type Conversation = (typeof conversations)[number];

export function EntrepreneurCard({ entrepreneur, horizontal = false, emphasis = false }: { entrepreneur: Entrepreneur; horizontal?: boolean; emphasis?: boolean }) {
  const featured = entrepreneur.catalog.find((item) => item.featured) ?? entrepreneur.catalog[0];
  const signal = entrepreneur.badges.includes("Responde rápido")
    ? { label: "Responde rápido", icon: MessageCircle }
    : entrepreneur.badges.includes("Top en tu zona")
      ? { label: "Más guardados", icon: TrendingUp }
      : entrepreneur.badges.includes("Nuevo en NIAR")
        ? { label: "Nuevo en tu zona", icon: Sparkles }
        : { label: "Destacado hoy", icon: Flame };
  const SignalIcon = signal.icon;

  return (
    <article className={`group niar-premium-card flex flex-col ${horizontal ? "min-w-[300px] lg:min-w-0" : ""} ${emphasis ? "lg:col-span-2 xl:row-span-2" : ""}`}>
      <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="block focus-visible:rounded-[2.25rem]">
        <div className={`relative overflow-hidden ${emphasis ? "h-[28rem] sm:h-[34rem] lg:h-[38rem]" : "h-80 sm:h-[22rem] lg:h-[24rem]"}`}>
          <img src={entrepreneur.cover} alt={entrepreneur.name} className="niar-editorial-image h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,31,0.08)_0%,rgba(31,36,31,0.06)_42%,rgba(31,36,31,0.78)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold text-[#2F3A2B] shadow-[0_10px_28px_rgba(31,36,31,0.10)] ring-1 ring-white/80 backdrop-blur-md">
                {entrepreneur.category}
              </span>
              <span className="niar-activity-pill"><SignalIcon size={11} /> {signal.label}</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1f241f]/64 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/18 backdrop-blur-md">
              <Star size={11} className="fill-[#E8C06F] text-[#E8C06F]" /> {entrepreneur.rating}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white lg:p-5">
            <div className="mb-3 flex items-center gap-2">
              <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-12 w-12 rounded-2xl border-2 border-white/88 object-cover shadow-[0_16px_34px_rgba(0,0,0,0.22)]" />
              <span className="rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/22 backdrop-blur-md">{entrepreneur.responseTime}</span>
            </div>
            <p className={`truncate font-semibold tracking-[-0.045em] ${emphasis ? "text-4xl lg:text-5xl" : "text-2xl lg:text-[1.7rem]"}`}>{entrepreneur.name}</p>
            <p className="mt-1.5 inline-flex max-w-full items-center gap-1 truncate text-sm font-medium text-white/92"><MapPin size={13} /> {entrepreneur.zone} · {entrepreneur.subcategory}</p>
          </div>
        </div>
      </Link>
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-5 lg:p-6">
        <div className="flex flex-wrap gap-1.5">
          {entrepreneur.badges.slice(0, 2).map((badge) => <BadgeTrust key={badge} badge={badge} />)}
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#666C60]">{entrepreneur.about}</p>
        {featured ? (
          <div className="flex items-center justify-between gap-3 rounded-[1.35rem] bg-[#F7F2EA]/84 px-3.5 py-3 text-xs text-[#4F554B] ring-1 ring-[#DCD2C5]/90 transition group-hover:bg-white">
            <span className="min-w-0 truncate"><Eye size={12} className="mr-1 inline text-[#6E7F63]" /> Destacado: <strong className="font-semibold text-[#1f241f]">{featured.name}</strong></span>
            <span className="shrink-0 font-semibold text-[#2F3A2B]">Ver →</span>
          </div>
        ) : null}
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-1">
          <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="niar-primary inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold">
            Entrar a la tienda
          </Link>
          <Link href={`/niar/mensajes/nuevo?to=${entrepreneur.id}`} aria-label="Consultar" className="niar-secondary inline-flex items-center justify-center rounded-2xl px-4 py-3 text-[#2F3A2B]">
            <MessageCircle size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="group rounded-[1.65rem] border border-[#E6DDD0] bg-white/90 p-3 shadow-[0_14px_38px_rgba(79,89,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(79,89,68,0.13)]">
      <img src={event.image} alt={event.name} className="h-36 w-full rounded-xl object-cover" />
      <div className="mt-3 space-y-1.5">
        <p className="font-semibold text-[#1f241f]">{event.name}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#666C60]"><Clock size={13} /> {event.date}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#666C60]"><MapPin size={13} /> {event.location}</p>
        <p className="text-sm text-[#555C51]">{event.entrepreneursCount} comercios participantes</p>
        <Link href={`/niar/eventos/${event.id}`} className="niar-secondary mt-1 inline-flex rounded-xl px-3 py-2 text-sm font-semibold">Ver activación</Link>
      </div>
    </article>
  );
}

export function RequestCard({ request }: { request: Request }) {
  return (
    <article className="rounded-[1.65rem] border border-[#E6DDD0] bg-white p-4 shadow-[0_14px_38px_rgba(79,89,68,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(79,89,68,0.12)]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-semibold text-[#1f241f]">{request.title}</p>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-[#666C60]">{request.date} • {request.zone} • {request.category}</p>
      <p className="mt-2 text-sm text-[#555C51]">{request.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-[#1f241f]"><strong>{request.proposals}</strong> propuestas recibidas</p>
        <Link href={`/niar/solicitudes/${request.id}`} className="niar-secondary rounded-xl px-3 py-2 text-sm font-semibold">Ver detalle</Link>
      </div>
    </article>
  );
}

export function ConversationCard({ item, entrepreneur }: { item: Conversation; entrepreneur: Entrepreneur }) {
  return (
    <Link href={`/niar/mensajes/${item.id}`} className="block rounded-[1.65rem] border border-[#E6DDD0] bg-white p-4 shadow-[0_14px_38px_rgba(79,89,68,0.07)] transition hover:-translate-y-0.5 hover:border-[#C8D4BF] hover:shadow-[0_22px_54px_rgba(79,89,68,0.12)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-[#1f241f]">{entrepreneur.name}</p>
          <p className="text-xs text-[#666C60]">{item.summary}</p>
        </div>
        <span className="text-xs text-[#8A8378]">{item.timestamp}</span>
      </div>
      <p className="mb-2 text-sm text-[#555C51]">{item.lastMessage}</p>
      <StatusPill status={item.status} />
    </Link>
  );
}
