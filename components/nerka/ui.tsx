"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Compass,
  Crown,
  Heart,
  Home,
  Inbox,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  PackagePlus,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  User as UserIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { ConversationStatus, RequestStatus, TrustBadge } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useRole } from "@/lib/role-context";

export function NiarAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3EFE7]">
      <div className="mx-auto w-full lg:max-w-7xl lg:px-6 lg:py-6">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6">
          <aside className="hidden lg:block">
            <DesktopSidebar />
          </aside>
          <div className="min-h-screen bg-[#FBF8F3] pb-24 lg:min-h-[calc(100vh-3rem)] lg:rounded-3xl lg:border lg:border-[#E6DDD0] lg:pb-0 lg:shadow-sm">
            <DesktopTopbar />
            {children}
          </div>
        </div>
      </div>
      <NiarBottomNav />
    </div>
  );
}

export function NiarHeader() {
  const { totalItemsAcrossSellers } = useCart();
  return (
    <header className="sticky top-0 z-20 border-b border-[#E6DDD0] bg-[#FBF8F3]/95 px-4 pb-3 pt-5 backdrop-blur-sm lg:hidden">
      <div className="flex items-start justify-between">
        <button className="rounded-xl bg-white p-2.5 text-[#1f241f] shadow-sm" aria-label="Menú">
          <Menu size={18} />
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-[#1f241f]">Niar</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#666C60]">
            <MapPin size={12} /> Berazategui
          </p>
        </div>
        <Link
          href="/niar/carrito"
          className="relative rounded-xl bg-white p-2.5 text-[#1f241f] shadow-sm"
          aria-label="Carrito"
        >
          <ShoppingBag size={18} />
          {totalItemsAcrossSellers > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6E7F63] px-1 text-[10px] font-semibold text-white">
              {totalItemsAcrossSellers}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  showCartBadge?: boolean;
};

const visitorNav: NavItem[] = [
  { href: "/niar", label: "Inicio", icon: Home },
  { href: "/niar/explorar", label: "Explorar", icon: Compass },
  { href: "/niar/carrito", label: "Carrito", icon: ShoppingBag, showCartBadge: true },
  { href: "/niar/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/niar/planes", label: "Vender", icon: Store },
];

const entrepreneurNav: NavItem[] = [
  { href: "/niar", label: "Inicio", icon: Home },
  { href: "/niar/perfil", label: "Mi negocio", icon: Store },
  { href: "/niar/perfil/catalogo", label: "Catálogo", icon: LayoutGrid },
  { href: "/niar/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/niar/planes", label: "Planes", icon: Crown },
];

const visitorExtras = [
  { href: "/niar/favoritos", label: "Favoritos", icon: Heart },
  { href: "/niar/solicitudes", label: "Solicitudes", icon: Inbox },
];

const entrepreneurExtras = [
  { href: "/niar/perfil#estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/niar/solicitudes", label: "Solicitudes", icon: Inbox },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const { totalItemsAcrossSellers } = useCart();
  const { user, isEntrepreneur, toggleRole } = useRole();
  const navItems = isEntrepreneur ? entrepreneurNav : visitorNav;
  const extras = isEntrepreneur ? entrepreneurExtras : visitorExtras;

  return (
    <div className="sticky top-6 space-y-3">
      {/* BRAND */}
      <div className="rounded-3xl border border-[#E6DDD0] bg-white p-4">
        <Link href="/niar" className="block">
          <p className="text-2xl font-semibold tracking-tight text-[#1f241f]">Niar</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#666C60]">
            <MapPin size={12} /> {user.zone ?? "Berazategui"}
          </p>
        </Link>

        {/* ROLE PILL */}
        <button
          type="button"
          onClick={toggleRole}
          className="mt-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-[#E6DDD0] bg-[#FBF8F3] px-3 py-2 text-left text-xs"
          title="Cambiar de rol"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8A8378]">
              Modo
            </p>
            <p className="text-sm font-semibold text-[#1f241f]">
              {isEntrepreneur ? "Comercio" : "Exploración pública"}
            </p>
          </div>
          <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-medium text-[#6E7F63] shadow-sm">
            cambiar
          </span>
        </button>

        <nav className="mt-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, showCartBadge }) => {
            const active = pathname === href || (href !== "/niar" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm ${
                  active ? "bg-[#EEF3EA] text-[#6E7F63]" : "text-[#4F554B] hover:bg-[#F7F2EA]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {label}
                </span>
                {showCartBadge && totalItemsAcrossSellers > 0 ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6E7F63] px-1.5 text-[11px] font-semibold text-white">
                    {totalItemsAcrossSellers}
                  </span>
                ) : null}
              </Link>
            );
          })}

          <div className="mt-3 border-t border-[#EDE4D8] pt-3">
            {extras.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={`${href}-${label}`}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                    active ? "bg-[#EEF3EA] text-[#6E7F63]" : "text-[#777064] hover:bg-[#F7F2EA]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* CTA secundario contextual */}
      {isEntrepreneur ? (
        <Link
          href="/niar/planes"
          className="block rounded-2xl bg-gradient-to-br from-[#6E7F63] to-[#2F382B] p-4 text-white"
        >
          <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide opacity-80">
            <Crown size={11} /> Plan Vender
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug">Potenciá tu negocio</p>
          <p className="mt-1 text-xs opacity-90">Carrito simple, destacados y métricas comerciales.</p>
          <p className="mt-2 text-xs font-medium">Ver planes →</p>
        </Link>
      ) : (
        <button
          type="button"
          onClick={toggleRole}
          className="block w-full rounded-2xl border border-[#C8D4BF] bg-white p-4 text-left"
        >
          <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[#6E7F63]">
            <Store size={11} /> ¿Tenés un negocio?
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[#1f241f]">
            Activá tu perfil comercial
          </p>
          <p className="mt-1 text-xs text-[#666C60]">Cargá productos y recibí pedidos por WhatsApp.</p>
          <p className="mt-2 text-xs font-medium text-[#6E7F63]">Empezar →</p>
        </button>
      )}
    </div>
  );
}

function DesktopTopbar() {
  const pathname = usePathname();
  const { isEntrepreneur, user, toggleRole } = useRole();
  const { totalItemsAcrossSellers } = useCart();

  const meta = pathname.startsWith("/niar/explorar")
    ? {
        title: "Explorar Niar",
        subtitle: "Comercios, productos y servicios cerca tuyo.",
      }
    : pathname.startsWith("/niar/perfil")
      ? isEntrepreneur
        ? {
            title: `Mi negocio · ${user.name}`,
            subtitle: "Gestioná catálogo, pedidos, mensajes y plan.",
          }
        : { title: "Mi cuenta", subtitle: "Tus datos, favoritos y mensajes." }
      : pathname.startsWith("/niar/carrito")
        ? { title: "Tu carrito", subtitle: "Revisá y enviá tu pedido por WhatsApp o mensaje interno." }
        : pathname.startsWith("/niar/mensajes")
          ? { title: "Mensajes", subtitle: "Conversá con negocios locales y coordiná pedidos." }
          : pathname.startsWith("/niar/planes")
            ? { title: "Planes", subtitle: "Catálogo, Vender y Gestionar para comercios locales." }
            : pathname.startsWith("/niar/favoritos")
              ? { title: "Favoritos", subtitle: "Las tiendas que más te interesan." }
              : isEntrepreneur
                ? {
                    title: `Panel de ${user.name}`,
                    subtitle: "Resumen de tu negocio, pedidos y catálogo.",
                  }
                : {
                    title: "Descubrí comercios y servicios cerca tuyo",
                    subtitle: "Recorré, consultá y comprá local.",
                  };

  return (
    <header className="hidden items-center justify-between gap-4 border-b border-[#E6DDD0] bg-white/90 px-6 py-4 backdrop-blur lg:flex">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-[#1f241f]">{meta.title}</p>
        <p className="truncate text-sm text-[#666C60]">{meta.subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={toggleRole}
          className="rounded-xl border border-[#E6DDD0] bg-white px-3 py-2 text-xs font-medium text-[#6E7F63] hover:bg-[#EEF3EA]"
          title="Cambiar de rol"
        >
          {isEntrepreneur ? "Ver como visitante" : "Tengo un negocio"}
        </button>
        {!isEntrepreneur ? (
          <Link
            href="/niar/carrito"
            className="relative rounded-xl border border-[#E6DDD0] bg-white p-2.5 text-[#1f241f]"
            aria-label="Carrito"
          >
            <ShoppingBag size={18} />
            {totalItemsAcrossSellers > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6E7F63] px-1 text-[10px] font-semibold text-white">
                {totalItemsAcrossSellers}
              </span>
            ) : null}
          </Link>
        ) : (
          <Link
            href="/niar/perfil/nuevo-producto"
            className="inline-flex items-center gap-1 rounded-xl bg-[#6E7F63] px-3 py-2 text-xs font-medium text-white"
          >
            <PackagePlus size={14} /> Cargar producto
          </Link>
        )}
        <button className="rounded-xl bg-[#EEF3EA] p-2.5 text-[#6E7F63]" aria-label="Notificaciones">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export function NiarBottomNav() {
  const pathname = usePathname();
  const { totalItemsAcrossSellers } = useCart();
  const { isEntrepreneur } = useRole();
  const navItems = isEntrepreneur ? entrepreneurNav : visitorNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#E6DDD0] bg-white/95 px-2 py-3 backdrop-blur lg:hidden">
      {navItems.map(({ href, label, icon: Icon, showCartBadge }) => {
        const active = pathname === href || (href !== "/niar" && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2">
            <span
              className={`relative rounded-xl p-2 ${
                active ? "bg-[#EEF3EA] text-[#6E7F63]" : "text-[#8A8378]"
              }`}
            >
              <Icon size={18} />
              {showCartBadge && totalItemsAcrossSellers > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6E7F63] px-1 text-[10px] font-semibold text-white">
                  {totalItemsAcrossSellers}
                </span>
              ) : null}
            </span>
            <span className={`text-[11px] ${active ? "text-[#1f241f]" : "text-[#8A8378]"}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SearchBar({ placeholder = "¿Qué estás buscando hoy?" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#E6DDD0] bg-white px-4 py-3 shadow-sm lg:px-5 lg:py-4">
      <Search size={18} className="text-[#666C60]" />
      <input
        className="w-full bg-transparent text-sm text-[#1f241f] outline-none placeholder:text-[#A39A8D]"
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
            (active ? active === item : i === 0) ? "bg-[#6E7F63] text-white" : "bg-white text-[#4F554B]"
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
        : badge === "Top en tu zona"
          ? "bg-[#EEF3EA] text-[#6E7F63]"
          : badge === "Recomendado"
            ? "bg-[#FFEAF1] text-[#b8344b]"
            : "bg-[#EAF3FF] text-[#225ea8]"; // Nuevo en Niar
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>{badge}</span>;
}

export function StatusPill({ status }: { status: RequestStatus | ConversationStatus }) {
  const color =
    status === "Recibiendo propuestas" || status === "En conversación"
      ? "bg-[#EAF3FF] text-[#225ea8]"
      : status === "En evaluación" || status === "Presupuesto enviado"
        ? "bg-[#FFF4E8] text-[#9b5a00]"
        : status === "Esperando respuesta"
          ? "bg-[#EEF3EA] text-[#6E7F63]"
          : "bg-[#E7F9EE] text-[#197a43]";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${color}`}>{status}</span>;
}

export function SectionTitle({ title, subtitle, cta, href }: { title: string; subtitle?: string; cta?: string; href?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-[#1f241f] lg:text-lg">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-xs text-[#666C60] lg:text-sm">{subtitle}</p> : null}
      </div>
      {cta && href ? (
        <Link href={href} className="shrink-0 text-xs font-medium text-[#6E7F63]">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, description, cta, href, icon }: { title: string; description: string; cta?: string; href?: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#ddd5f1] bg-white p-6 text-center">
      <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF3EA] text-[#6E7F63]">
        {icon ?? <Inbox size={20} />}
      </div>
      <p className="font-medium text-[#1f241f]">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[#666C60]">{description}</p>
      {cta && href ? (
        <Link href={href} className="mt-4 inline-flex rounded-xl bg-[#6E7F63] px-4 py-2 text-sm font-medium text-white">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function QuickActionCard({ title, description, href, tone, icon }: { title: string; description: string; href: string; tone: string; icon: ReactNode }) {
  return (
    <Link href={href} className={`block rounded-2xl p-4 transition hover:shadow-sm ${tone}`}>
      <div className="mb-3 inline-flex rounded-xl bg-white/80 p-2 text-[#1f241f]">{icon}</div>
      <p className="text-sm font-semibold text-[#1f241f]">{title}</p>
      <p className="mt-1 text-xs text-[#50486b]">{description}</p>
    </Link>
  );
}

export function LoadingCard() {
  return <div className="h-24 animate-pulse rounded-2xl bg-white/80" />;
}

export function RoleBadge() {
  const { isEntrepreneur } = useRole();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isEntrepreneur ? "bg-[#FFF4E8] text-[#9b5a00]" : "bg-[#EEF3EA] text-[#6E7F63]"
      }`}
    >
      {isEntrepreneur ? <Store size={10} /> : <UserIcon size={10} />}
      {isEntrepreneur ? "Comercio" : "Exploración pública"}
    </span>
  );
}

export function NiarShine() {
  return <Sparkles size={14} className="text-[#6E7F63]" />;
}
