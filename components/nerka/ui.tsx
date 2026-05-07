"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

// ─────────────────────────────────────────────────────────────────────
// Brand
// ─────────────────────────────────────────────────────────────────────

export function NiarWordmark({ size = "base" }: { size?: "sm" | "base" | "lg" }) {
  const cls =
    size === "lg"
      ? "text-[28px] leading-none"
      : size === "sm"
        ? "text-base leading-none"
        : "text-xl leading-none";
  return (
    <span className={`font-display font-semibold tracking-tight text-[var(--niar-ink)] ${cls}`}>
      niar
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Shell
// ─────────────────────────────────────────────────────────────────────

export function NerkaAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--niar-bg)]">
      <div className="mx-auto w-full lg:max-w-[1240px] lg:px-8 lg:py-6">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <DesktopSidebar />
          </aside>
          <div className="min-h-screen bg-[var(--niar-bg)] pb-24 lg:min-h-[calc(100vh-3rem)] lg:pb-0">
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
  const { totalItemsAcrossSellers } = useCart();
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--niar-border)] bg-[var(--niar-bg)]/95 px-5 pb-3 pt-5 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-between">
        <button
          className="rounded-full bg-[var(--niar-surface)] p-2.5 text-[var(--niar-ink)] shadow-[var(--niar-shadow-sm)]"
          aria-label="Menú"
        >
          <Menu size={18} />
        </button>
        <div className="text-center">
          <NiarWordmark />
          <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[var(--niar-ink-mute)]">
            <MapPin size={11} /> Berazategui
          </p>
        </div>
        <Link
          href="/nerka/carrito"
          className="relative rounded-full bg-[var(--niar-surface)] p-2.5 text-[var(--niar-ink)] shadow-[var(--niar-shadow-sm)]"
          aria-label="Carrito"
        >
          <ShoppingBag size={18} />
          {totalItemsAcrossSellers > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--niar-sage)] px-1 text-[10px] font-semibold text-white">
              {totalItemsAcrossSellers}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  showCartBadge?: boolean;
};

const visitorNav: NavItem[] = [
  { href: "/nerka", label: "Inicio", icon: Home },
  { href: "/nerka/explorar", label: "Descubrir", icon: Compass },
  { href: "/nerka/carrito", label: "Carrito", icon: ShoppingBag, showCartBadge: true },
  { href: "/nerka/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/nerka/perfil", label: "Mi cuenta", icon: UserIcon },
];

const entrepreneurNav: NavItem[] = [
  { href: "/nerka", label: "Inicio", icon: Home },
  { href: "/nerka/perfil", label: "Mi negocio", icon: Store },
  { href: "/nerka/perfil/catalogo", label: "Catálogo", icon: LayoutGrid },
  { href: "/nerka/mensajes", label: "Mensajes", icon: MessageCircle },
  { href: "/nerka/planes", label: "Planes", icon: Crown },
];

const visitorExtras = [
  { href: "/nerka/favoritos", label: "Favoritos", icon: Heart },
];

const entrepreneurExtras = [
  { href: "/nerka/perfil#estadisticas", label: "Estadísticas", icon: Sparkles },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const { totalItemsAcrossSellers } = useCart();
  const { user, isEntrepreneur, toggleRole } = useRole();
  const navItems = isEntrepreneur ? entrepreneurNav : visitorNav;
  const extras = isEntrepreneur ? entrepreneurExtras : visitorExtras;

  return (
    <div className="sticky top-6 space-y-3">
      <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
        <Link href="/nerka" className="block">
          <NiarWordmark size="lg" />
          <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[var(--niar-ink-mute)]">
            <MapPin size={11} /> {user.zone ?? "Berazategui"}
          </p>
        </Link>

        {/* Role pill */}
        <button
          type="button"
          onClick={toggleRole}
          className="mt-5 flex w-full items-center justify-between gap-2 rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface-soft)] px-3 py-2 text-left transition hover:bg-[var(--niar-sage-mute)]"
          title="Cambiar de rol"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Estás como
            </p>
            <p className="text-sm font-semibold text-[var(--niar-ink)]">
              {isEntrepreneur ? "Emprendedor" : "Visitante"}
            </p>
          </div>
          <span className="rounded-full bg-[var(--niar-surface)] px-2 py-1 text-[10px] font-medium text-[var(--niar-sage-on)]">
            cambiar
          </span>
        </button>

        <nav className="mt-5 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, showCartBadge }) => {
            const active = pathname === href || (href !== "/nerka" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]"
                    : "text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {label}
                </span>
                {showCartBadge && totalItemsAcrossSellers > 0 ? (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--niar-sage)] px-1.5 text-[11px] font-semibold text-white">
                    {totalItemsAcrossSellers}
                  </span>
                ) : null}
              </Link>
            );
          })}

          {extras.length ? (
            <div className="mt-3 border-t border-[var(--niar-border-soft)] pt-3">
              {extras.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={`${href}-${label}`}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                      active
                        ? "bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]"
                        : "text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)]"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </nav>
      </div>

      {/* Contextual secondary CTA */}
      {isEntrepreneur ? (
        <Link
          href="/nerka/planes"
          className="block rounded-3xl bg-[var(--niar-ink)] p-5 text-white"
        >
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide opacity-70">
            <Crown size={11} /> Próximamente
          </p>
          <p className="font-display mt-2 text-[19px] font-semibold leading-snug">
            Vender Pro
          </p>
          <p className="mt-1 text-xs opacity-80">
            Más visibilidad, métricas y prioridad en búsqueda.
          </p>
          <p className="mt-3 text-xs font-medium opacity-90">Conocer más →</p>
        </Link>
      ) : (
        <button
          type="button"
          onClick={toggleRole}
          className="block w-full rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 text-left transition hover:border-[var(--niar-lila)] hover:bg-[var(--niar-lila-soft)]"
        >
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-lila-deep)]">
            <Store size={11} /> Para emprendedores
          </p>
          <p className="font-display mt-2 text-[19px] font-semibold leading-snug text-[var(--niar-ink)]">
            Activá tu tienda
          </p>
          <p className="mt-1 text-xs text-[var(--niar-ink-mute)]">
            Cargá tus productos y empezá a recibir pedidos por WhatsApp.
          </p>
          <p className="mt-3 text-xs font-medium text-[var(--niar-sage-on)]">Empezar →</p>
        </button>
      )}
    </div>
  );
}

function DesktopTopbar() {
  const pathname = usePathname();
  const { isEntrepreneur, user, toggleRole } = useRole();
  const { totalItemsAcrossSellers } = useCart();

  const meta = pathname.startsWith("/nerka/explorar")
    ? {
        title: "Descubrí lo mejor de tu zona",
        subtitle: "Tiendas locales, productos y servicios cerca tuyo.",
      }
    : pathname.startsWith("/nerka/perfil")
      ? isEntrepreneur
        ? {
            title: `Mi negocio · ${user.name}`,
            subtitle: "Catálogo, pedidos, mensajes y plan.",
          }
        : { title: "Mi cuenta", subtitle: "Tus favoritos, mensajes y carrito." }
      : pathname.startsWith("/nerka/carrito")
        ? { title: "Tu carrito", subtitle: "Revisá tu pedido y enviálo por WhatsApp." }
        : pathname.startsWith("/nerka/mensajes")
          ? { title: "Mensajes", subtitle: "Conversaciones con emprendedores." }
          : pathname.startsWith("/nerka/planes")
            ? { title: "Planes", subtitle: "Crecé en NIAR cuando estés listo." }
            : pathname.startsWith("/nerka/favoritos")
              ? { title: "Favoritos", subtitle: "Las tiendas que más te interesan." }
              : isEntrepreneur
                ? {
                    title: `Hola, ${user.name}`,
                    subtitle: "Resumen de tu negocio, pedidos y catálogo.",
                  }
                : {
                    title: "Descubrí lo mejor de tu zona",
                    subtitle: "Recorré, consultá y comprá local.",
                  };

  return (
    <header className="hidden items-center justify-between gap-4 border-b border-[var(--niar-border)] bg-[var(--niar-bg)] px-2 py-5 lg:flex">
      <div className="min-w-0">
        <p className="font-display truncate text-[22px] font-semibold leading-tight text-[var(--niar-ink)]">
          {meta.title}
        </p>
        <p className="mt-0.5 truncate text-sm text-[var(--niar-ink-mute)]">{meta.subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={toggleRole}
          className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3.5 py-2 text-xs font-medium text-[var(--niar-ink-mute)] transition hover:border-[var(--niar-sage)] hover:bg-[var(--niar-sage-mute)] hover:text-[var(--niar-sage-on)]"
        >
          {isEntrepreneur ? "Ver como visitante" : "Soy emprendedor"}
        </button>
        {!isEntrepreneur ? (
          <Link
            href="/nerka/carrito"
            className="relative rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2.5 text-[var(--niar-ink)]"
            aria-label="Carrito"
          >
            <ShoppingBag size={18} />
            {totalItemsAcrossSellers > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--niar-sage)] px-1 text-[10px] font-semibold text-white">
                {totalItemsAcrossSellers}
              </span>
            ) : null}
          </Link>
        ) : (
          <Link
            href="/nerka/perfil/nuevo-producto"
            className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-3.5 py-2 text-xs font-medium text-white"
          >
            <PackagePlus size={14} /> Cargar producto
          </Link>
        )}
        <button
          className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2.5 text-[var(--niar-ink-mute)]"
          aria-label="Notificaciones"
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export function NerkaBottomNav() {
  const pathname = usePathname();
  const { totalItemsAcrossSellers } = useCart();
  const { isEntrepreneur } = useRole();
  const navItems = isEntrepreneur ? entrepreneurNav : visitorNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[var(--niar-border)] bg-[var(--niar-surface)]/95 px-2 py-3 backdrop-blur lg:hidden">
      {navItems.map(({ href, label, icon: Icon, showCartBadge }) => {
        const active = pathname === href || (href !== "/nerka" && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2">
            <span
              className={`relative rounded-full p-2 transition ${
                active ? "bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]" : "text-[var(--niar-ink-soft)]"
              }`}
            >
              <Icon size={18} />
              {showCartBadge && totalItemsAcrossSellers > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--niar-sage)] px-1 text-[10px] font-semibold text-white">
                  {totalItemsAcrossSellers}
                </span>
              ) : null}
            </span>
            <span
              className={`text-[11px] ${active ? "text-[var(--niar-ink)]" : "text-[var(--niar-ink-soft)]"}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Inputs
// ─────────────────────────────────────────────────────────────────────

export function SearchBar({ placeholder = "¿Qué te gustaría descubrir hoy?" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-5 py-3.5 shadow-[var(--niar-shadow-sm)]">
      <Search size={18} className="text-[var(--niar-ink-mute)]" />
      <input
        className="w-full bg-transparent text-sm text-[var(--niar-ink)] outline-none placeholder:text-[var(--niar-ink-soft)]"
        placeholder={placeholder}
      />
    </div>
  );
}

export function CategoryChips({
  items,
  active,
  onSelect,
}: {
  items: string[];
  active?: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <div className="niar-scroll flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
      {items.map((item, i) => (
        <button
          key={item}
          onClick={() => onSelect?.(item)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
            (active ? active === item : i === 0)
              ? "bg-[var(--niar-ink)] text-white"
              : "bg-[var(--niar-surface)] text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Badges & pills
// ─────────────────────────────────────────────────────────────────────

export function BadgeTrust({ badge }: { badge: TrustBadge }) {
  const style =
    badge === "Verificado"
      ? "bg-[var(--niar-sage-soft)] text-[var(--niar-sage-on)]"
      : badge === "Responde rápido"
        ? "bg-[var(--niar-warn-soft)] text-[var(--niar-warn)]"
        : badge === "Top en tu zona"
          ? "bg-[var(--niar-lila-soft)] text-[var(--niar-lila-deep)]"
          : badge === "Recomendado"
            ? "bg-[var(--niar-error-soft)] text-[var(--niar-error)]"
            : "bg-[var(--niar-surface-soft)] text-[var(--niar-ink-mute)]";
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${style}`}>{badge}</span>;
}

export function StatusPill({ status }: { status: RequestStatus | ConversationStatus }) {
  const color =
    status === "Recibiendo propuestas" || status === "En conversación"
      ? "bg-[var(--niar-lila-soft)] text-[var(--niar-lila-deep)]"
      : status === "En evaluación" || status === "Presupuesto enviado"
        ? "bg-[var(--niar-warn-soft)] text-[var(--niar-warn)]"
        : status === "Esperando respuesta"
          ? "bg-[var(--niar-sage-soft)] text-[var(--niar-sage-on)]"
          : "bg-[var(--niar-success-soft)] text-[var(--niar-success)]";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${color}`}>{status}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Layout helpers
// ─────────────────────────────────────────────────────────────────────

export function SectionTitle({
  title,
  subtitle,
  cta,
  href,
}: {
  title: string;
  subtitle?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-xl font-semibold text-[var(--niar-ink)] lg:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-[var(--niar-ink-mute)]">{subtitle}</p>
        ) : null}
      </div>
      {cta && href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-[var(--niar-sage-on)] hover:text-[var(--niar-sage-deep)]"
        >
          {cta} →
        </Link>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  cta,
  href,
  icon,
}: {
  title: string;
  description: string;
  cta?: string;
  href?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[var(--niar-border)] bg-[var(--niar-surface)] p-8 text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]">
        {icon ?? <Inbox size={20} />}
      </div>
      <p className="font-display text-lg text-[var(--niar-ink)]">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--niar-ink-mute)]">{description}</p>
      {cta && href ? (
        <Link
          href={href}
          className="mt-4 inline-flex rounded-full bg-[var(--niar-ink)] px-5 py-2.5 text-sm font-medium text-white"
        >
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  /** @deprecated kept for back-compat — el tono ahora es uniforme. */
  tone?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 transition hover:border-[var(--niar-sage)] hover:shadow-[var(--niar-shadow)]"
    >
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)] transition group-hover:bg-[var(--niar-sage-soft)]">
        {icon}
      </div>
      <p className="text-sm font-semibold text-[var(--niar-ink)]">{title}</p>
      <p className="mt-1 text-xs text-[var(--niar-ink-mute)]">{description}</p>
    </Link>
  );
}

export function LoadingCard() {
  return (
    <div className="h-44 animate-pulse rounded-3xl border border-[var(--niar-border-soft)] bg-[var(--niar-surface-soft)]" />
  );
}

export function RoleBadge() {
  const { isEntrepreneur } = useRole();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isEntrepreneur
          ? "bg-[var(--niar-warn-soft)] text-[var(--niar-warn)]"
          : "bg-[var(--niar-sage-soft)] text-[var(--niar-sage-on)]"
      }`}
    >
      {isEntrepreneur ? <Store size={10} /> : <UserIcon size={10} />}
      {isEntrepreneur ? "Emprendedor" : "Visitante"}
    </span>
  );
}

export function NerkaShine() {
  return <Sparkles size={14} className="text-[var(--niar-sage)]" />;
}
