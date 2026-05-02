import Link from "next/link";
import { Clock, MapPin, MessageCircle, Star, Store } from "lucide-react";
import { BadgeTrust, StatusPill } from "./ui";
import type { conversations, entrepreneurs, events, requests } from "@/lib/nerka-data";

type Entrepreneur = (typeof entrepreneurs)[number];
type Event = (typeof events)[number];
type Request = (typeof requests)[number];
type Conversation = (typeof conversations)[number];

export function EntrepreneurCard({ entrepreneur, horizontal = false }: { entrepreneur: Entrepreneur; horizontal?: boolean }) {
  const productCount = entrepreneur.catalog.filter((c) => c.type === "product").length;
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md ${
        horizontal ? "min-w-[240px] lg:min-w-0" : ""
      }`}
    >
      <div className="relative">
        <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-32 w-full object-cover" />
        <img
          src={entrepreneur.avatar}
          alt={entrepreneur.name}
          className="absolute -bottom-5 left-3 h-12 w-12 rounded-xl border-4 border-white object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 pt-7">
        <div>
          <p className="font-semibold text-[#1f1833]">{entrepreneur.name}</p>
          <p className="text-xs text-[#6F6A7C]">{entrepreneur.category} · {entrepreneur.subcategory}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#433d56]">
          <span className="inline-flex items-center gap-1">
            <Star size={12} className="fill-[#ffb547] text-[#ffb547]" /> {entrepreneur.rating}
            <span className="text-[#9088a3]">({entrepreneur.reviews})</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[#6F6A7C]"><MapPin size={12} /> {entrepreneur.zone}</span>
          <span className="inline-flex items-center gap-1 text-[#6F6A7C]"><Store size={12} /> {productCount} productos</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entrepreneur.badges.slice(0, 2).map((badge) => (
            <BadgeTrust key={badge} badge={badge} />
          ))}
        </div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-1">
          <Link
            href={`/nerka/emprendedores/${entrepreneur.id}`}
            className="inline-flex items-center justify-center rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]"
          >
            Ver catálogo
          </Link>
          <Link
            href={`/nerka/mensajes/nuevo?to=${entrepreneur.id}`}
            aria-label="Enviar mensaje"
            className="inline-flex items-center justify-center rounded-xl border border-[#ece8f7] bg-white px-2.5 py-2 text-[#5B2EFF]"
          >
            <MessageCircle size={15} />
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
        <p className="text-sm text-[#6F6A7C] inline-flex items-center gap-1"><Clock size={13} /> {event.date}</p>
        <p className="text-sm text-[#6F6A7C] inline-flex items-center gap-1"><MapPin size={13} /> {event.location}</p>
        <p className="text-sm text-[#433d56]">{event.entrepreneursCount} emprendedores</p>
        <Link href={`/nerka/eventos/${event.id}`} className="mt-1 inline-flex rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]">Ver evento</Link>
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
        <Link href={`/nerka/solicitudes/${request.id}`} className="rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]">Ver detalle</Link>
      </div>
    </article>
  );
}

export function ConversationCard({ item, entrepreneur }: { item: Conversation; entrepreneur: Entrepreneur }) {
  return (
    <Link href={`/nerka/mensajes/${item.id}`} className="block rounded-2xl border border-[#ece8f7] bg-white p-4 shadow-sm">
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
