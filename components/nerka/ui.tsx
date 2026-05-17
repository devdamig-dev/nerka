"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
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
    <div className="min-h-screen bg-[#FBF8F3] text-[#1f241f]">
      <DesktopTopbar />
      <div className="mx-auto w-full pb-24 lg:pb-0">
        {children}
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
          <p className="text-xl font-semibold tracking-tight text-[#1f241f]">NIAR</p>
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

export function DesktopSidebar() {
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
          <p className="text-2xl font-semibold tracking-tight text-[#1f241f]">NIAR</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#666C60]">
            <MapPin size={12} /> {user.zone ?? "Berazategui"}
          </p>
        </Link>

        {/* ROLE PILL */}
        <button
          type="button"
          onClick={toggleRole}
          className="mt-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-[#D7CDBE] bg-[#FBF8F3] px-3 py-2 text-left text-xs shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
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
          <span className="rounded-lg bg-[#2F3A2B] px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
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
                  active ? "bg-[#2F3A2B] text-white shadow-sm" : "text-[#3F473B] hover:bg-[#F7F2EA] hover:text-[#1f241f]"
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
                    active ? "bg-[#2F3A2B] text-white shadow-sm" : "text-[#4F554B] hover:bg-[#F7F2EA] hover:text-[#1f241f]"
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
  const { totalItemsAcrossSellers, totalSellersWithItems } = useCart();

  const primaryNav = [
    { href: "/niar/explorar", label: "Explorar", icon: Compass },
    { href: "/niar/explorar", label: "Comercios", icon: Store },
    { href: "/niar/explorar?type=Servicios", label: "Servicios", icon: Sparkles },
    { href: "/niar/explorar#categorias", label: "Categorías", icon: LayoutGrid },
    { href: "/niar/favoritos", label: "Favoritos", icon: Heart },
    { href: "/niar/planes", label: "Vender", icon: Crown },
    { href: isEntrepreneur ? "/niar/perfil" : "/niar/mensajes", label: "Perfil", icon: UserIcon },
  ];

  return (
    <header className="sticky top-0 z-40 hidden border-b border-[#E6DDD0]/80 bg-[#FBF8F3]/88 px-6 py-3 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-[1540px] items-center justify-between gap-6">
        <Link href="/niar" className="group flex shrink-0 items-center gap-3" aria-label="Ir al inicio de NIAR">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1f241f] text-sm font-semibold tracking-[-0.03em] text-[#FBF8F3] shadow-[0_16px_35px_rgba(31,36,31,0.16)] transition group-hover:-translate-y-0.5">
            N
          </span>
          <span>
            <span className="block text-xl font-semibold tracking-[-0.04em] text-[#1f241f]">NIAR</span>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-[#6D7468]"><MapPin size={12} /> {user.zone ?? "Berazategui"}</span>
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#E6DDD0]/80 bg-white/72 p-1.5 shadow-[0_18px_55px_rgba(79,89,68,0.08)]">
          {primaryNav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/niar" && pathname.startsWith(href.split("?")[0].split("#")[0]) && label !== "Servicios" && label !== "Categorías");
            return (
              <Link
                key={`${href}-${label}`}
                href={href}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition xl:px-4 ${
                  active
                    ? "bg-[#2F3A2B] text-white shadow-sm"
                    : "text-[#3F473B] hover:bg-[#F7F2EA] hover:text-[#1f241f]"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleRole}
            className="rounded-full border border-[#C8D4BF] bg-white/88 px-4 py-2 text-xs font-semibold text-[#2F3A2B] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EEF3EA]"
            title="Cambiar de rol"
          >
            {isEntrepreneur ? "Ver como visitante" : "Tengo un negocio"}
          </button>
          {!isEntrepreneur ? (
            <Link
              href="/niar/carrito"
              className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-sm transition ${
                totalItemsAcrossSellers > 0
                  ? "border-[#C8D4BF] bg-[#EEF3EA] text-[#1f241f] shadow-[0_14px_34px_rgba(110,127,99,0.18)]"
                  : "border-[#DCD2C5] bg-white/76 text-[#1f241f] hover:bg-[#F7F2EA]"
              }`}
              aria-label="Carrito"
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-[#5D6F52] shadow-sm">
                <ShoppingBag size={17} />
                {totalItemsAcrossSellers > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6E7F63] px-1.5 text-[10px] font-semibold text-white">
                    {totalItemsAcrossSellers}
                  </span>
                ) : null}
              </span>
              <span className="hidden leading-tight xl:block">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#6E7F63]">Carrito</span>
                <span className="block text-xs text-[#666C60]">
                  {totalItemsAcrossSellers > 0 ? `${totalItemsAcrossSellers} items · ${totalSellersWithItems} negocios` : "Armá tu pedido"}
                </span>
              </span>
            </Link>
          ) : (
            <Link
              href="/niar/perfil/nuevo-producto"
              className="inline-flex items-center gap-1 rounded-full bg-[#6E7F63] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(110,127,99,0.24)] transition hover:bg-[#5D6F52]"
            >
              <PackagePlus size={14} /> Publicar
            </Link>
          )}
        </div>
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
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#DCD2C5] bg-white/96 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_55px_rgba(79,89,68,0.12)] backdrop-blur-xl lg:hidden">
      {navItems.map(({ href, label, icon: Icon, showCartBadge }) => {
        const active = pathname === href || (href !== "/niar" && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className="flex min-h-14 min-w-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 transition active:scale-[0.97]">
            <span
              className={`relative rounded-xl p-2 ${
                active ? "bg-[#2F3A2B] text-white shadow-[0_10px_24px_rgba(47,58,43,0.20)]" : "text-[#5F665A]"
              }`}
            >
              <Icon size={18} />
              {showCartBadge && totalItemsAcrossSellers > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#6E7F63] px-1 text-[10px] font-semibold text-white">
                  {totalItemsAcrossSellers}
                </span>
              ) : null}
            </span>
            <span className={`text-[11px] font-medium ${active ? "text-[#1f241f]" : "text-[#5F665A]"}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SearchBar({ placeholder = "¿Qué estás buscando hoy?" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#D7CDBE] bg-white px-4 py-3 shadow-[0_14px_38px_rgba(79,89,68,0.08)] transition focus-within:border-[#6E7F63] focus-within:shadow-[0_0_0_4px_rgba(110,127,99,0.14)] lg:px-5 lg:py-4">
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
          data-active={(active ? active === item : i === 0) || undefined}
          className="niar-soft-control rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
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
      ? "bg-[#E7F9EE] text-[#0F5C32] ring-[#BFE8CE]"
      : badge === "Responde rápido"
        ? "bg-[#FFF4E8] text-[#7A4300] ring-[#F0D2A8]"
        : badge === "Top en tu zona"
          ? "bg-[#EEF3EA] text-[#2F3A2B] ring-[#C8D4BF]"
          : badge === "Recomendado"
            ? "bg-[#FDF1E8] text-[#8F382F] ring-[#F0C8BA]"
            : "bg-[#EEF3EA] text-[#2F3A2B] ring-[#C8D4BF]"; // Nuevo en NIAR
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${style}`}>{badge}</span>;
}

export function StatusPill({ status }: { status: RequestStatus | ConversationStatus }) {
  const color =
    status === "Recibiendo propuestas" || status === "En conversación"
      ? "bg-[#EEF3EA] text-[#2F3A2B] ring-[#C8D4BF]"
      : status === "En evaluación" || status === "Presupuesto enviado"
        ? "bg-[#FFF4E8] text-[#7A4300] ring-[#F0D2A8]"
        : status === "Esperando respuesta"
          ? "bg-[#EEF3EA] text-[#2F3A2B] ring-[#C8D4BF]"
          : "bg-[#E7F9EE] text-[#0F5C32] ring-[#BFE8CE]";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${color}`}>{status}</span>;
}

export function SectionTitle({ title, subtitle, cta, href }: { title: string; subtitle?: string; cta?: string; href?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 lg:mb-7">
      <div>
        <p className="mb-2 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7F8C72] lg:block">Selección NIAR</p>
        <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.045em] text-[#1f241f] lg:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666C60] lg:text-base">{subtitle}</p> : null}
      </div>
      {cta && href ? (
        <Link href={href} className="shrink-0 rounded-full bg-white/88 px-4 py-2 text-xs font-semibold text-[#2F3A2B] shadow-sm ring-1 ring-[#DCD2C5] transition hover:-translate-y-0.5 hover:bg-[#EEF3EA]">
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, description, cta, href, icon }: { title: string; description: string; cta?: string; href?: string; icon?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[2.35rem] border border-[#DCD2C5] bg-[radial-gradient(circle_at_18%_8%,rgba(238,243,234,0.95),transparent_34%),linear-gradient(135deg,#FFFFFF,#FBF8F3)] p-7 text-center shadow-[0_24px_74px_rgba(79,89,68,0.11)] lg:p-10">
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#C9984A]/10 blur-3xl" />
      <div className="niar-empty-illustration mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#2F3A2B] text-white shadow-[0_18px_42px_rgba(47,58,43,0.22)]">
        {icon ?? <Inbox size={24} />}
      </div>
      <p className="text-xl font-semibold tracking-[-0.035em] text-[#1f241f] lg:text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#4F554B]">{description}</p>
      <div className="mx-auto mt-5 flex max-w-sm flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[#4F554B]">
        <span className="rounded-full bg-[#EEF3EA] px-3 py-1 ring-1 ring-[#C8D4BF]">Nuevo en tu zona</span>
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-[#E6DDD0]">Más guardados</span>
      </div>
      {cta && href ? (
        <Link href={href} className="niar-primary mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold">
          {cta} <ArrowRight size={14} />
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
      <p className="mt-1 text-xs text-[#666C60]">{description}</p>
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
