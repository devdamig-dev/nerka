import Link from "next/link";
import { Clock, MapPin, MessageCircle, Star } from "lucide-react";
import { BadgeTrust, StatusPill } from "./ui";
import type { conversations, entrepreneurs, events, requests } from "@/lib/nerka-data";

type Entrepreneur = (typeof entrepreneurs)[number];
type Event = (typeof events)[number];
type Request = (typeof requests)[number];
type Conversation = (typeof conversations)[number];

export function EntrepreneurCard({ entrepreneur, horizontal = false }: { entrepreneur: Entrepreneur; horizontal?: boolean }) {
  const featured = entrepreneur.catalog.find((item) => item.featured) ?? entrepreneur.catalog[0];

  return (
    <article className={`group flex flex-col overflow-hidden rounded-[1.85rem] border border-[#E6DDD0] bg-white shadow-[0_16px_45px_rgba(79,89,68,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(79,89,68,0.15)] ${horizontal ? "min-w-[300px] lg:min-w-0" : ""}`}>
      <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f241f]/72 via-[#1f241f]/10 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-[#5F6F55] shadow-sm ring-1 ring-white/60">
            {entrepreneur.category}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
            <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-16 w-16 rounded-3xl border-4 border-white object-cover shadow-md" />
            <div className="min-w-0 pb-1 text-white">
              <p className="truncate text-xl font-semibold tracking-tight">{entrepreneur.name}</p>
              <p className="mt-1 inline-flex items-center gap-1 truncate text-xs text-white/82"><MapPin size={12} /> {entrepreneur.zone}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-1.5">
          {entrepreneur.badges.slice(0, 2).map((badge) => <BadgeTrust key={badge} badge={badge} />)}
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#666C60]">{entrepreneur.about}</p>
        <div className="flex items-center justify-between rounded-2xl bg-[#F7F2EA] px-3 py-2 text-xs text-[#666C60]">
          <span className="inline-flex items-center gap-1"><Star size={12} className="fill-[#C9984A] text-[#C9984A]" /> <strong className="text-[#1f241f]">{entrepreneur.rating}</strong></span>
          <span>{entrepreneur.responseTime}</span>
          {featured ? <span className="truncate text-[#6E7F63]">{featured.name}</span> : null}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-1">
          <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="inline-flex items-center justify-center rounded-2xl bg-[#6E7F63] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5D6F52]">
            Ver tienda
          </Link>
          <Link href={`/niar/mensajes/nuevo?to=${entrepreneur.id}`} aria-label="Consultar" className="inline-flex items-center justify-center rounded-2xl border border-[#E1D8CB] bg-white px-4 py-3 text-[#6E7F63] transition hover:bg-[#F7F2EA]">
            <MessageCircle size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="rounded-2xl border border-[#E6DDD0] bg-white/80 p-3 shadow-sm">
      <img src={event.image} alt={event.name} className="h-36 w-full rounded-xl object-cover" />
      <div className="mt-3 space-y-1.5">
        <p className="font-semibold text-[#1f241f]">{event.name}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#666C60]"><Clock size={13} /> {event.date}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#666C60]"><MapPin size={13} /> {event.location}</p>
        <p className="text-sm text-[#555C51]">{event.entrepreneursCount} comercios participantes</p>
        <Link href={`/niar/eventos/${event.id}`} className="mt-1 inline-flex rounded-xl bg-[#EEF3EA] px-3 py-2 text-sm font-medium text-[#6E7F63]">Ver activación</Link>
      </div>
    </article>
  );
}

export function RequestCard({ request }: { request: Request }) {
  return (
    <article className="rounded-2xl border border-[#E6DDD0] bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-semibold text-[#1f241f]">{request.title}</p>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-[#666C60]">{request.date} • {request.zone} • {request.category}</p>
      <p className="mt-2 text-sm text-[#555C51]">{request.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-[#1f241f]"><strong>{request.proposals}</strong> propuestas recibidas</p>
        <Link href={`/niar/solicitudes/${request.id}`} className="rounded-xl bg-[#EEF3EA] px-3 py-2 text-sm font-medium text-[#6E7F63]">Ver detalle</Link>
      </div>
    </article>
  );
}

export function ConversationCard({ item, entrepreneur }: { item: Conversation; entrepreneur: Entrepreneur }) {
  return (
    <Link href={`/niar/mensajes/${item.id}`} className="block rounded-2xl border border-[#E6DDD0] bg-white p-4 shadow-sm">
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
