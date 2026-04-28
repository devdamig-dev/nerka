"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Compass,
  Home,
  Inbox,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import type { ConversationStatus, RequestStatus, TrustBadge } from "@/lib/nerka-data";

const navItems = [
  { href: "/nerka", label: "Inicio", icon: Home },
  { href: "/nerka/explorar", label: "Explorar", icon: Compass },
  { href: "/nerka/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/nerka/solicitudes", label: "Solicitudes", icon: LayoutGrid },
  { href: "/nerka/perfil", label: "Perfil", icon: User },
];

export function NerkaAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F4FB] text-[#171321] lg:grid lg:grid-cols-[260px_1fr]">
      <DesktopSidebar />
      <div className="relative min-h-screen">
        <div className="mx-auto w-full max-w-7xl px-0 pb-[calc(84px+env(safe-area-inset-bottom))] lg:px-8 lg:pb-8">
          {children}
        </div>
        <NerkaBottomNav />
      </div>
    </div>
  );
}

function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen border-r border-[#e9e2fb] bg-white p-5 lg:block">
      <div className="mb-8">
        <p className="text-2xl font-semibold tracking-tight text-[#2B174F]">nerka</p>
        <p className="mt-1 text-sm text-[#6F6A7C]">Marketplace de emprendedores</p>
      </div>
      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/nerka" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                active ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#6F6A7C] hover:bg-[#f8f4ff]"
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-4 text-white">
        <p className="text-sm font-medium">Pedí lo que necesitás</p>
        <p className="mt-1 text-xs opacity-90">Recibí propuestas y elegí mejor.</p>
      </div>
    </aside>
  );
}

export function NerkaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#ece8f7] bg-[#FAFAFC]/95 px-4 pb-3 pt-4 backdrop-blur-sm lg:rounded-b-2xl lg:bg-white lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        <button className="rounded-xl bg-white p-2 text-[#2B174F] shadow-sm lg:bg-[#F2ECFF]">
          <Menu size={18} />
        </button>
        <div className="text-center lg:text-left">
          <p className="text-lg font-semibold tracking-tight text-[#2B174F] lg:text-xl">nerka</p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#6F6A7C]">
            <MapPin size={12} /> Berazategui · Zonas cercanas
          </p>
        </div>
        <button className="rounded-xl bg-white p-2 text-[#2B174F] shadow-sm lg:bg-[#F2ECFF]">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export function NerkaBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#ddd5f1] bg-white px-2 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 shadow-[0_-8px_25px_rgba(43,23,79,0.08)] lg:hidden">
      <div className="mx-auto flex w-full max-w-lg items-center justify-around">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/nerka" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2">
              <span
                className={`rounded-xl p-2 ${
                  active ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#9088a3]"
                }`}
              >
                <Icon size={18} />
              </span>
              <span className={`text-[11px] ${active ? "text-[#2B174F]" : "text-[#9088a3]"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SearchBar({ placeholder = "¿Qué estás buscando hoy?" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#ece8f7] bg-white px-4 py-3 shadow-sm">
      <Search size={18} className="text-[#6F6A7C]" />
      <input
        className="w-full bg-transparent text-sm text-[#171321] outline-none placeholder:text-[#9b95aa]"
        placeholder={placeholder}
      />
    </div>
  );
}

export function CategoryChips({ items, active, onSelect }: { items: string[]; active?: string; onSelect?: (item: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item, i) => (
        <button
          key={item}
          onClick={() => onSelect?.(item)}
          className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
            (active ? active === item : i === 0) ? "bg-[#5B2EFF] text-white" : "bg-white text-[#4b4560]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function BadgeTrust({ badge }: { badge: TrustBadge }) {
  const style =
    badge === "Verificado"
      ? "bg-[#E7F9EE] text-[#197a43]"
      : badge === "Responde rápido"
        ? "bg-[#FFF4E8] text-[#9b5a00]"
        : "bg-[#F2ECFF] text-[#5B2EFF]";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>{badge}</span>;
}

export function StatusPill({ status }: { status: RequestStatus | ConversationStatus }) {
  const color =
    status === "Recibiendo propuestas" || status === "En conversación"
      ? "bg-[#EAF3FF] text-[#225ea8]"
      : status === "En evaluación" || status === "Propuesta recibida"
        ? "bg-[#FFF4E8] text-[#9b5a00]"
        : status === "Esperando respuesta" || status === "Ajuste solicitado"
          ? "bg-[#F2ECFF] text-[#5B2EFF]"
          : "bg-[#E7F9EE] text-[#197a43]";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${color}`}>{status}</span>;
}

export function SectionTitle({ title, cta, href }: { title: string; cta?: string; href?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-semibold text-[#1f1833]">{title}</h2>
      {cta && href ? (
        <Link href={href} className="text-xs font-medium text-[#5B2EFF]">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, description, cta, href }: { title: string; description: string; cta?: string; href?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#ddd5f1] bg-white p-5 text-center">
      <Inbox className="mx-auto mb-2 text-[#8a81a3]" size={20} />
      <p className="font-medium text-[#2B174F]">{title}</p>
      <p className="mt-1 text-sm text-[#6F6A7C]">{description}</p>
      {cta && href ? (
        <Link href={href} className="mt-3 inline-flex rounded-xl bg-[#5B2EFF] px-4 py-2 text-sm text-white">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function QuickActionCard({ title, description, href, tone, icon }: { title: string; description: string; href: string; tone: string; icon: ReactNode }) {
  return (
    <Link href={href} className={`rounded-2xl p-4 transition hover:-translate-y-0.5 ${tone}`}>
      <div className="mb-3 inline-flex rounded-xl bg-white/80 p-2 text-[#2B174F]">{icon}</div>
      <p className="text-sm font-semibold text-[#1f1833]">{title}</p>
      <p className="mt-1 text-xs text-[#50486b]">{description}</p>
    </Link>
  );
}

export function LoadingCard() {
  return <div className="h-24 animate-pulse rounded-2xl bg-white/80" />;
}

export const Icons = { CalendarDays };
