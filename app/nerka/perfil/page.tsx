"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  ExternalLink,
  Eye,
  Heart,
  Inbox,
  MessageCircle,
  PackagePlus,
  Pencil,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { SectionTitle } from "@/components/nerka/ui";
import { useRole } from "@/lib/role-context";

const setupChecklist = [
  { id: "info", label: "Datos del emprendimiento", done: true },
  { id: "cover", label: "Foto de portada y logo", done: true },
  { id: "products", label: "Subir 3 productos al catálogo", done: true },
  { id: "whatsapp", label: "Conectar WhatsApp para pedidos", done: true },
  { id: "share", label: "Compartir el link de tu tienda", done: false },
];

const fakeOrders = [
  { id: "ord-1", buyer: "Sofía R.", channel: "WhatsApp" as const, total: 78000, items: 1, status: "Nuevo" },
  { id: "ord-2", buyer: "Carla M.", channel: "Mensaje" as const, total: 36500, items: 2, status: "Confirmado" },
  { id: "ord-3", buyer: "Micaela T.", channel: "WhatsApp" as const, total: 18500, items: 1, status: "Entregado" },
];

export default function PerfilPage() {
  const { isEntrepreneur, hydrated } = useRole();
  if (!hydrated || !isEntrepreneur) return <VisitorAccount />;
  return <EntrepreneurDashboard />;
}

// ─────────────────────────────────────────────────────────────────────
// Visitor — Mi cuenta
// ─────────────────────────────────────────────────────────────────────
function VisitorAccount() {
  const { user, toggleRole } = useRole();
  const favorites = entrepreneurs.filter((e) => user.favorites.includes(e.id));

  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Mi cuenta
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Hola, {user.name}.
        </h1>
        <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
          Tus favoritos, mensajes y carrito en un solo lugar.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Link
          href="/nerka/favoritos"
          className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 hover:border-[var(--niar-sage)]"
        >
          <Heart size={18} className="text-[var(--niar-error)]" />
          <p className="font-display mt-3 text-base font-semibold text-[var(--niar-ink)]">
            Favoritos
          </p>
          <p className="text-xs text-[var(--niar-ink-mute)]">
            {favorites.length} {favorites.length === 1 ? "tienda" : "tiendas"}
          </p>
        </Link>
        <Link
          href="/nerka/mensajes"
          className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 hover:border-[var(--niar-sage)]"
        >
          <MessageCircle size={18} className="text-[var(--niar-sage-on)]" />
          <p className="font-display mt-3 text-base font-semibold text-[var(--niar-ink)]">
            Mensajes
          </p>
          <p className="text-xs text-[var(--niar-ink-mute)]">Conversaciones abiertas</p>
        </Link>
        <Link
          href="/nerka/carrito"
          className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 hover:border-[var(--niar-sage)]"
        >
          <ShoppingBag size={18} className="text-[var(--niar-ink)]" />
          <p className="font-display mt-3 text-base font-semibold text-[var(--niar-ink)]">
            Mi carrito
          </p>
          <p className="text-xs text-[var(--niar-ink-mute)]">Tus productos guardados</p>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {/* Favoritos peek */}
          <section>
            <SectionTitle
              title="Tus tiendas guardadas"
              subtitle={
                favorites.length
                  ? `${favorites.length} ${favorites.length === 1 ? "tienda" : "tiendas"}`
                  : "Tocá el corazón en cualquier perfil"
              }
              cta="Ver todas"
              href="/nerka/favoritos"
            />
            {favorites.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {favorites.slice(0, 4).map((e) => (
                  <Link
                    key={e.id}
                    href={`/nerka/emprendedores/${e.id}`}
                    className="group block overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] hover:border-[var(--niar-sage)]"
                  >
                    <img
                      src={e.cover}
                      alt={e.name}
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="p-4">
                      <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                        {e.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--niar-ink-mute)]">
                        {e.category} · {e.zone}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--niar-border)] bg-[var(--niar-surface)] p-7 text-center text-sm text-[var(--niar-ink-mute)]">
                Tocá el corazón en cualquier perfil para guardarlo acá.
              </div>
            )}
          </section>

          {/* CTA Become entrepreneur */}
          <section className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-lila-soft)] p-6 lg:p-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--niar-lila-deep)]">
                  <Store size={12} /> Para emprendedores
                </p>
                <h2 className="font-display mt-3 text-2xl font-semibold text-[var(--niar-ink)]">
                  ¿Tenés un emprendimiento?
                </h2>
                <p className="mt-1 text-sm text-[var(--niar-ink-mute)]">
                  Activá tu perfil comercial. Cargá productos y empezá a recibir pedidos por
                  WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-2 lg:items-end">
                <button
                  type="button"
                  onClick={toggleRole}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-ink)] px-5 py-3 text-sm font-medium text-white"
                >
                  Activar mi tienda <ArrowRight size={15} />
                </button>
                <Link
                  href="/nerka/planes"
                  className="text-center text-xs font-medium text-[var(--niar-lila-deep)]"
                >
                  Ver planes →
                </Link>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-3">
          <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Mis datos
            </p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex justify-between">
                <span className="text-[var(--niar-ink-mute)]">Nombre</span>
                <strong className="text-[var(--niar-ink)]">{user.name}</strong>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--niar-ink-mute)]">Zona</span>
                <strong className="text-[var(--niar-ink)]">{user.zone}</strong>
              </li>
              <li className="flex justify-between">
                <span className="text-[var(--niar-ink-mute)]">Tipo</span>
                <strong className="text-[var(--niar-sage-on)]">Visitante</strong>
              </li>
            </ul>
          </section>
          <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Más
            </p>
            <div className="mt-3 space-y-1">
              <Link
                href="/nerka/eventos"
                className="block rounded-xl px-2 py-2 text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
              >
                Activaciones locales
              </Link>
              <Link
                href="/nerka/planes"
                className="block rounded-xl px-2 py-2 text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
              >
                Planes
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Entrepreneur — Mi negocio
// ─────────────────────────────────────────────────────────────────────
function EntrepreneurDashboard() {
  const { user } = useRole();
  const profile =
    getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const completed = setupChecklist.filter((i) => i.done).length;
  const totalSteps = setupChecklist.length;
  const productCount = profile.catalog.filter((c) => c.type === "product").length;
  const serviceCount = profile.catalog.filter((c) => c.type === "service").length;

  return (
    <main className="px-5 py-8 pb-24 lg:px-2 lg:py-10">
      {/* HERO */}
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Mi negocio
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
          Catálogo, pedidos, mensajes y plan en un solo lugar.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/nerka/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            <Eye size={15} /> Ver mi tienda
          </Link>
          <Link
            href="/nerka/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-5 py-2.5 text-sm font-medium text-[var(--niar-ink)]"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-5 py-2.5 text-sm font-medium text-[var(--niar-ink)]"
          >
            <ExternalLink size={15} /> Compartir link
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          {/* CHECKLIST */}
          <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--niar-ink)]">
                  Configuración inicial
                </p>
                <p className="text-xs text-[var(--niar-ink-mute)]">
                  {completed} de {totalSteps} listos
                </p>
              </div>
              <span className="font-display text-base font-semibold text-[var(--niar-sage-on)]">
                {Math.round((completed / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--niar-sage-mute)]">
              <div
                className="h-full bg-[var(--niar-sage)] transition-all"
                style={{ width: `${(completed / totalSteps) * 100}%` }}
              />
            </div>
            <ul className="mt-5 space-y-2">
              {setupChecklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--niar-border-soft)] bg-[var(--niar-bg)] px-4 py-2.5 text-sm"
                >
                  <CheckCircle2
                    size={16}
                    className={
                      item.done ? "text-[var(--niar-success)]" : "text-[var(--niar-ink-faint)]"
                    }
                  />
                  <span
                    className={
                      item.done
                        ? "text-[var(--niar-ink)] line-through"
                        : "text-[var(--niar-ink-mute)]"
                    }
                  >
                    {item.label}
                  </span>
                  {!item.done ? (
                    <button className="ml-auto text-xs font-medium text-[var(--niar-sage-on)]">
                      Hacer →
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          {/* AI PLACEHOLDER */}
          <section className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-6">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]">
                <Sparkles size={18} />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--niar-ink)]">Asistente IA</p>
                  <span className="rounded-full bg-[var(--niar-warn-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-warn)]">
                    Próximamente
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--niar-ink-mute)]">
                  Mejorá tus publicaciones en segundos.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {[
                    { t: "Generar descripción", d: "para un producto" },
                    { t: "Sugerir precios", d: "según mercado" },
                    { t: "Crear publicación", d: "para redes" },
                  ].map((c) => (
                    <button
                      key={c.t}
                      disabled
                      className="cursor-not-allowed rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-bg)] px-3 py-2.5 text-left text-xs"
                    >
                      <p className="font-medium text-[var(--niar-ink)]">{c.t}</p>
                      <p className="text-[var(--niar-ink-mute)]">{c.d}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CATALOG */}
          <section>
            <SectionTitle
              title="Mi catálogo"
              subtitle={`${productCount} productos · ${serviceCount} servicios`}
              cta="Ver completo"
              href="/nerka/perfil/catalogo"
            />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {profile.catalog.slice(0, 5).map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-1 text-sm font-medium text-[var(--niar-ink)]">
                      {item.name}
                    </p>
                    <p className="font-display text-sm font-semibold text-[var(--niar-ink)]">
                      {item.price ? formatPrice(item.price) : "A consultar"}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          item.available
                            ? "bg-[var(--niar-success-soft)] text-[var(--niar-success)]"
                            : "bg-[var(--niar-surface-soft)] text-[var(--niar-ink-soft)]"
                        }`}
                      >
                        {item.available ? "Disponible" : "Pausado"}
                      </span>
                      <button className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--niar-sage-on)]">
                        <Pencil size={11} /> Editar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              <Link
                href="/nerka/perfil/nuevo-producto"
                className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[var(--niar-border)] bg-[var(--niar-surface)] p-3 text-sm font-medium text-[var(--niar-sage-on)] hover:border-[var(--niar-sage)] hover:bg-[var(--niar-sage-mute)]"
              >
                <PackagePlus size={22} />
                Nuevo producto
              </Link>
            </div>
          </section>

          {/* RECENT ORDERS */}
          <section id="estadisticas">
            <SectionTitle
              title="Pedidos recientes"
              subtitle="WhatsApp y mensajes internos"
              cta="Ver todos"
              href="/nerka/mensajes"
            />
            <div className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]">
              <ul className="divide-y divide-[var(--niar-border-soft)]">
                {fakeOrders.map((order) => (
                  <li key={order.id} className="flex items-center gap-3 px-5 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--niar-sage-mute)] text-[var(--niar-sage-on)]">
                      <Inbox size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--niar-ink)]">
                        {order.buyer} · {order.items} {order.items === 1 ? "producto" : "productos"}
                      </p>
                      <p className="text-xs text-[var(--niar-ink-mute)]">vía {order.channel}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                        {formatPrice(order.total)}
                      </p>
                      <p className="text-[11px] text-[var(--niar-ink-mute)]">{order.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* SIDE */}
        <aside className="space-y-3">
          <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Esta semana
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-[var(--niar-ink-mute)]">Visitas a tu tienda</span>
                <strong className="font-display text-base text-[var(--niar-ink)]">128</strong>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[var(--niar-ink-mute)]">Pedidos recibidos</span>
                <strong className="font-display text-base text-[var(--niar-ink)]">7</strong>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[var(--niar-ink-mute)]">Total en pedidos</span>
                <strong className="font-display text-base text-[var(--niar-ink)]">
                  {formatPrice(196500)}
                </strong>
              </li>
            </ul>
          </section>

          <section className="rounded-3xl bg-[var(--niar-ink)] p-5 text-white">
            <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide opacity-70">
              <Crown size={11} /> Plan actual: Gratis
            </p>
            <p className="font-display mt-2 text-lg font-semibold">Vender Pro · Pronto</p>
            <p className="mt-1 text-xs opacity-80">
              Más visibilidad, métricas y herramientas para crecer.
            </p>
            <Link
              href="/nerka/planes"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-medium text-[var(--niar-ink)]"
            >
              Ver planes <ArrowRight size={14} />
            </Link>
          </section>

          <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Tu tienda
            </p>
            <p className="mt-2 text-xs text-[var(--niar-ink-mute)]">
              Compartí este link en redes para recibir más pedidos.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-bg)] px-3 py-2 text-xs text-[var(--niar-ink-mute)]">
              <Store size={13} className="text-[var(--niar-sage-on)]" />
              <span className="truncate">niar.app/{profile.id}</span>
            </div>
            <Link
              href={`/nerka/emprendedores/${profile.id}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-2 text-sm font-medium text-[var(--niar-ink)]"
            >
              Abrir mi tienda <ArrowRight size={14} />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
