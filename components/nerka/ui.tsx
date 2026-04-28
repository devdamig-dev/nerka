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

export function NerkaAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F2FA]">
      <div className="mx-auto w-full lg:max-w-7xl lg:px-6 lg:py-6">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
          <aside className="hidden lg:block">
            <DesktopSidebar />
          </aside>
          <div className="min-h-screen bg-[#FAFAFC] pb-24 lg:min-h-[calc(100vh-3rem)] lg:rounded-3xl lg:border lg:border-[#ece8f7] lg:pb-0">
            <DesktopTopbar />
            {children}
          </div>
        </div>
      </div>
      <NerkaBottomNav />
    </div>
  );
}

export function NerkaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#ece8f7] bg-[#FAFAFC]/95 px-4 pb-3 pt-5 backdrop-blur-sm lg:hidden">
      <div className="flex items-start justify-between">
        <button className="rounded-xl bg-white p-2.5 text-[#2B174F] shadow-sm">
          <Menu size={18} />
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-[#2B174F]">nerka</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#6F6A7C]">
            <MapPin size={12} /> Berazategui
          </p>
        </div>
        <button className="rounded-xl bg-white p-2.5 text-[#2B174F] shadow-sm">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

const navItems = [
  { href: "/nerka", label: "Inicio", icon: Home },
  { href: "/nerka/explorar", label: "Explorar", icon: Compass },
  { href: "/nerka/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/nerka/solicitudes", label: "Solicitudes", icon: LayoutGrid },
  { href: "/nerka/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/nerka/perfil", label: "Perfil", icon: User },
];

function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-6 rounded-3xl border border-[#ece8f7] bg-white p-4">
      <p className="text-2xl font-semibold tracking-tight text-[#2B174F]">nerka</p>
      <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#6F6A7C]">
        <MapPin size={12} /> Berazategui
      </p>
      <nav className="mt-6 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/nerka" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                active ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#4b4560] hover:bg-[#f6f3ff]"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function DesktopTopbar() {
  return (
    <header className="hidden items-center justify-between border-b border-[#ece8f7] bg-white/90 px-6 py-4 backdrop-blur lg:flex">
      <div>
        <p className="text-lg font-semibold text-[#2B174F]">Panel de contratación</p>
        <p className="text-sm text-[#6F6A7C]">Encontrá, compará y contratá emprendedores locales.</p>
      </div>
      <button className="rounded-xl bg-[#F2ECFF] p-2.5 text-[#5B2EFF]">
        <Bell size={18} />
      </button>
    </header>
  );
}

export function NerkaBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#ece8f7] bg-white/95 px-2 py-3 backdrop-blur lg:hidden">
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
    </nav>
  );
}

export function SearchBar({ placeholder = "¿Qué estás buscando hoy?" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#ece8f7] bg-white px-4 py-3 shadow-sm lg:px-5 lg:py-4">
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
    <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
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
      : status === "En evaluación" || status === "Presupuesto enviado"
        ? "bg-[#FFF4E8] text-[#9b5a00]"
        : status === "Esperando respuesta"
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
    <Link href={href} className={`rounded-2xl p-4 ${tone}`}>
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
