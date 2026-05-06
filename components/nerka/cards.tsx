import Link from "next/link";
import { Clock, MapPin, MessageCircle, Star, Store } from "lucide-react";
import { BadgeTrust, StatusPill } from "./ui";
import type { conversations, entrepreneurs, events, requests } from "@/lib/nerka-data";

type Entrepreneur = (typeof entrepreneurs)[number];
type Event = (typeof events)[number];
type Request = (typeof requests)[number];
type Conversation = (typeof conversations)[number];

export function EntrepreneurCard({ entrepreneur, horizontal = false }: { entrepreneur: Entrepreneur; horizontal?: boolean }) {
  const productCount = entrepreneur.catalog.filter((item) => item.type === "product").length;
  const featured = entrepreneur.catalog.find((item) => item.featured) ?? entrepreneur.catalog[0];

  return (
    <article className={`group flex flex-col overflow-hidden rounded-[1.5rem] border border-[#ece8f7] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${horizontal ? "min-w-[280px] lg:min-w-0" : ""}`}>
      <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="block">
        <div className="relative h-44 overflow-hidden">
          <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
            <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-14 w-14 rounded-2xl border-4 border-white object-cover shadow-sm" />
            <div className="min-w-0 pb-1 text-white">
              <p className="truncate text-base font-semibold">{entrepreneur.name}</p>
              <p className="truncate text-xs text-white/78">{entrepreneur.category} · {entrepreneur.zone}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {entrepreneur.badges.slice(0, 3).map((badge) => <BadgeTrust key={badge} badge={badge} />)}
        </div>
        <p className="line-clamp-2 text-sm text-[#6F6A7C]">{entrepreneur.about}</p>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#FAFAFC] p-2 text-xs text-[#6F6A7C]">
          <span className="inline-flex items-center gap-1"><Star size={12} className="fill-[#ffb547] text-[#ffb547]" /> <strong className="text-[#2B174F]">{entrepreneur.rating}</strong></span>
          <span className="inline-flex items-center gap-1"><Store size={12} /> {productCount}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {entrepreneur.zone}</span>
        </div>
        {featured ? (
          <div className="flex items-center gap-2 rounded-2xl border border-[#ece8f7] p-2">
            <img src={featured.image} alt={featured.name} className="h-12 w-12 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#1f1833]">{featured.name}</p>
              <p className="truncate text-[11px] text-[#8d86a2]">Producto destacado</p>
            </div>
          </div>
        ) : null}
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-1">
          <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="inline-flex items-center justify-center rounded-2xl bg-[#5B2EFF] px-3 py-2.5 text-sm font-semibold text-white">
            Ver catálogo
          </Link>
          <Link href={`/niar/mensajes/nuevo?to=${entrepreneur.id}`} aria-label="Consultar" className="inline-flex items-center justify-center rounded-2xl border border-[#ece8f7] bg-white px-3 py-2.5 text-[#5B2EFF]">
            <MessageCircle size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="rounded-2xl border border-[#ece8f7] bg-white p-3 shadow-sm">
      <img src={event.image} alt={event.name} className="h-36 w-full rounded-xl object-cover" />
      <div className="mt-3 space-y-1.5">
        <p className="font-semibold text-[#1f1833]">{event.name}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#6F6A7C]"><Clock size={13} /> {event.date}</p>
        <p className="inline-flex items-center gap-1 text-sm text-[#6F6A7C]"><MapPin size={13} /> {event.location}</p>
        <p className="text-sm text-[#433d56]">{event.entrepreneursCount} comercios participantes</p>
        <Link href={`/niar/eventos/${event.id}`} className="mt-1 inline-flex rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]">Ver activación</Link>
      </div>
    </article>
  );
}

export function RequestCard({ request }: { request: Request }) {
  return (
    <article className="rounded-2xl border border-[#ece8f7] bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-semibold text-[#1f1833]">{request.title}</p>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-[#6F6A7C]">{request.date} • {request.zone} • {request.category}</p>
      <p className="mt-2 text-sm text-[#433d56]">{request.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-[#2B174F]"><strong>{request.proposals}</strong> propuestas recibidas</p>
        <Link href={`/niar/solicitudes/${request.id}`} className="rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]">Ver detalle</Link>
      </div>
    </article>
  );
}

export function ConversationCard({ item, entrepreneur }: { item: Conversation; entrepreneur: Entrepreneur }) {
  return (
    <Link href={`/niar/mensajes/${item.id}`} className="block rounded-2xl border border-[#ece8f7] bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-[#1f1833]">{entrepreneur.name}</p>
          <p className="text-xs text-[#6F6A7C]">{item.summary}</p>
        </div>
        <span className="text-xs text-[#8d86a2]">{item.timestamp}</span>
      </div>
      <p className="mb-2 text-sm text-[#433d56]">{item.lastMessage}</p>
      <StatusPill status={item.status} />
    </Link>
  );
}
