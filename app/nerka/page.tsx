"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Compass,
  Crown,
  Heart,
  ImagePlus,
  MapPin,
  MessageCircle,
  PackagePlus,
  Search,
  Send,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import {
  CategoryChips,
  NerkaHeader,
  QuickActionCard,
  SectionTitle,
} from "@/components/nerka/ui";
import {
  categories,
  entrepreneurs,
  events,
  popularProducts,
  getEntrepreneurById,
} from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";

export default function NerkaHomePage() {
  const { isEntrepreneur, hydrated } = useRole();

  return (
    <main>
      <NerkaHeader />
      {!hydrated || !isEntrepreneur ? <VisitorHome /> : <EntrepreneurHome />}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VISITOR HOME — descubrimiento
// ─────────────────────────────────────────────────────────────────────
function VisitorHome() {
  const { user, toggleRole, isFavorite } = useRole();
  const favoriteProfiles = entrepreneurs.filter((e) => isFavorite(e.id)).slice(0, 3);

  const services = entrepreneurs
    .flatMap((e) =>
      e.catalog
        .filter((c) => c.type === "service" && c.available)
        .map((s) => ({ ...s, entrepreneurId: e.id, entrepreneurName: e.name })),
    )
    .slice(0, 4);

  return (
    <div className="space-y-12 px-5 py-6 lg:space-y-16 lg:px-2 lg:py-8">
      {/* HERO */}
      <section>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--niar-sage-mute)] px-3 py-1 text-xs font-medium text-[var(--niar-sage-on)]">
          <Sparkles size={12} /> Hola{user.name ? `, ${user.name}` : ""}
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-[var(--niar-ink)] lg:text-[52px]">
          Explorá lo mejor
          <br />
          <span className="text-[var(--niar-ink-mute)]">de tu zona.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--niar-ink-mute)]">
          Tiendas locales, productos únicos y emprendedores cerca tuyo. Descubrí algo nuevo hoy.
        </p>

        {/* SEARCH BAR — protagonista */}
        <div className="mt-7 max-w-3xl rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-1.5 shadow-[var(--niar-shadow-sm)]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-1 sm:grid-cols-[minmax(0,1fr)_180px_auto]">
            <div className="flex min-w-0 items-center gap-2 px-3 py-2.5">
              <Search size={17} className="shrink-0 text-[var(--niar-ink-mute)]" />
              <input
                placeholder="Buscá tienda, producto o rubro"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--niar-ink-soft)]"
              />
            </div>
            <button
              type="button"
              className="hidden items-center justify-between gap-2 rounded-full px-3 py-2 text-sm text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] sm:flex"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--niar-sage-on)]" />
                <span className="text-[var(--niar-ink)]">{user.zone ?? "Berazategui"}</span>
              </span>
              <ChevronDown size={14} className="text-[var(--niar-ink-soft)]" />
            </button>
            <Link
              href="/nerka/explorar"
              className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-5 py-2.5 text-sm font-medium text-white"
            >
              Buscar
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <CategoryChips items={["Para vos", "Gastronomía", "Belleza", "Hogar y deco", "Regalería", "Mascotas"]} />
        </div>
      </section>

      {/* FEATURED ENTREPRENEURS — el corazón visual */}
      <section>
        <SectionTitle
          title="Tiendas para descubrir"
          subtitle="Verificadas y cerca tuyo"
          cta="Ver todos"
          href="/nerka/explorar"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {entrepreneurs.slice(0, 8).map((entrepreneur) => (
            <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
          ))}
        </div>
      </section>

      {/* POPULAR PRODUCTS — editorial pinterest-like */}
      <section>
        <SectionTitle
          title="Productos populares"
          subtitle="Lo que más se está pidiendo"
          cta="Ver más"
          href="/nerka/explorar?type=Productos"
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {popularProducts.slice(0, 10).map((product) => (
            <Link
              key={product.id}
              href={`/nerka/emprendedores/${product.entrepreneurId}`}
              className="group block overflow-hidden rounded-3xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full rounded-3xl object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="px-1 pt-3">
                <p className="line-clamp-1 text-sm font-medium text-[var(--niar-ink)]">
                  {product.name}
                </p>
                <p className="line-clamp-1 text-xs text-[var(--niar-ink-mute)]">
                  {product.entrepreneurName}
                </p>
                <p className="font-display mt-1 text-sm font-semibold text-[var(--niar-ink)]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS — sutiles, no protagonistas */}
      <section>
        <SectionTitle title="Para vos" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <QuickActionCard
            href="/nerka/explorar"
            title="Descubrir"
            description="Buscá por rubro y zona"
            icon={<Compass size={18} />}
          />
          <QuickActionCard
            href="/nerka/favoritos"
            title="Favoritos"
            description="Tus tiendas guardadas"
            icon={<Heart size={18} />}
          />
          <QuickActionCard
            href="/nerka/mensajes"
            title="Mensajes"
            description="Tus conversaciones"
            icon={<MessageCircle size={18} />}
          />
          <QuickActionCard
            href="/nerka/carrito"
            title="Mi carrito"
            description="Enviá tu pedido"
            icon={<ImagePlus size={18} />}
          />
        </div>
      </section>

      {/* SERVICIOS — secundario, lista limpia */}
      <section>
        <SectionTitle
          title="Servicios populares"
          subtitle="Coordinás detalles por mensaje"
          cta="Ver más"
          href="/nerka/explorar?type=Servicios"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/nerka/emprendedores/${s.entrepreneurId}`}
              className="group block overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5 transition hover:border-[var(--niar-sage)] hover:shadow-[var(--niar-shadow-sm)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-lila-deep)]">
                {s.entrepreneurName}
              </p>
              <p className="font-display mt-2 text-base font-semibold text-[var(--niar-ink)]">
                {s.name}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-[var(--niar-ink-mute)]">
                {s.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--niar-sage-on)]">
                Consultar <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAVORITES (if any) */}
      {favoriteProfiles.length ? (
        <section>
          <SectionTitle title="Tus favoritos" cta="Ver todos" href="/nerka/favoritos" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProfiles.map((e) => (
              <EntrepreneurCard key={e.id} entrepreneur={e} />
            ))}
          </div>
        </section>
      ) : null}

      {/* SECONDARY: become entrepreneur — discreto */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-lila-soft)] p-7 lg:p-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--niar-lila-deep)]">
              <Store size={12} /> Para emprendedores
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[var(--niar-ink)] lg:text-3xl">
              ¿Tenés un emprendimiento? Mostralo en NIAR.
            </h2>
            <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
              Activá tu perfil comercial en minutos. Mostrá tu catálogo y empezá a recibir
              pedidos por WhatsApp.
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

      {/* ACTIVACIONES (eventos) — completamente demoted, lista compacta */}
      {events.length ? (
        <section>
          <SectionTitle title="Activaciones locales" cta="Ver agenda" href="/nerka/eventos" />
          <div className="grid gap-3 sm:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <Link
                key={event.id}
                href={`/nerka/eventos/${event.id}`}
                className="flex items-center gap-4 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-4 hover:border-[var(--niar-sage)]"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display truncate text-sm font-semibold text-[var(--niar-ink)]">
                    {event.name}
                  </p>
                  <p className="text-xs text-[var(--niar-ink-mute)]">
                    {event.date} · {event.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ENTREPRENEUR HOME — gestión
// ─────────────────────────────────────────────────────────────────────
function EntrepreneurHome() {
  const { user } = useRole();
  const profile =
    getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const productCount = profile.catalog.filter((c) => c.type === "product").length;
  const serviceCount = profile.catalog.filter((c) => c.type === "service").length;

  return (
    <div className="space-y-10 px-5 py-6 lg:space-y-12 lg:px-2 lg:py-8">
      {/* HERO seller */}
      <section className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-6 lg:p-9">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--niar-sage-mute)] px-3 py-1 text-xs font-medium text-[var(--niar-sage-on)]">
          <Store size={12} /> Mi negocio
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--niar-ink)] lg:text-4xl">
          Hola, {profile.name}.
        </h1>
        <p className="mt-2 max-w-2xl text-base text-[var(--niar-ink-mute)]">
          Tu tienda está activa. {productCount} productos, {serviceCount} servicios y 7 pedidos
          esta semana.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/nerka/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Ver mi tienda <ArrowRight size={14} />
          </Link>
          <Link
            href="/nerka/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-5 py-2.5 text-sm font-medium text-[var(--niar-ink)]"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <Link
            href="/nerka/mensajes"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-5 py-2.5 text-sm font-medium text-[var(--niar-ink)]"
          >
            <MessageCircle size={15} /> Mensajes
          </Link>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Visitas a tu tienda", value: "128", trend: "+12%" },
          { label: "Pedidos esta semana", value: "7", trend: "+3" },
          { label: "Mensajes nuevos", value: "4" },
          { label: "Total en pedidos", value: formatPrice(196500) ?? "$0", trend: "+18%" },
        ].map((m) => (
          <article
            key={m.label}
            className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5"
          >
            <p className="text-xs text-[var(--niar-ink-mute)]">{m.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-display text-2xl font-semibold text-[var(--niar-ink)]">
                {m.value}
              </p>
              {m.trend ? (
                <span className="text-xs font-medium text-[var(--niar-sage-on)]">{m.trend}</span>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <SectionTitle title="Atajos para tu negocio" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <QuickActionCard
            href="/nerka/perfil/nuevo-producto"
            title="Cargar producto"
            description="Sumá ítems al catálogo"
            icon={<PackagePlus size={18} />}
          />
          <QuickActionCard
            href="/nerka/perfil/catalogo"
            title="Editar catálogo"
            description="Gestioná disponibilidad"
            icon={<ImagePlus size={18} />}
          />
          <QuickActionCard
            href="/nerka/mensajes"
            title="Mensajes"
            description="Respondé clientes"
            icon={<Send size={18} />}
          />
          <QuickActionCard
            href="/nerka/planes"
            title="Plan Pro · Pronto"
            description="Más visibilidad"
            icon={<Crown size={18} />}
          />
        </div>
      </section>

      {/* MY CATALOG PEEK */}
      <section>
        <SectionTitle
          title="Mi catálogo"
          subtitle={`${productCount} productos · ${serviceCount} servicios`}
          cta="Ver completo"
          href="/nerka/perfil/catalogo"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
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
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    item.available
                      ? "bg-[var(--niar-success-soft)] text-[var(--niar-success)]"
                      : "bg-[var(--niar-surface-soft)] text-[var(--niar-ink-soft)]"
                  }`}
                >
                  {item.available ? "Disponible" : "Pausado"}
                </span>
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

      {/* PLANS CTA */}
      <section className="overflow-hidden rounded-3xl bg-[var(--niar-ink)] p-7 text-white lg:p-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
              <Crown size={11} /> Próximamente · Vender Pro
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold lg:text-3xl">
              Potenciá tu negocio en NIAR
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Más visibilidad, métricas y herramientas para crecer. Sumate a la lista de
              interesados.
            </p>
          </div>
          <Link
            href="/nerka/planes"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--niar-ink)]"
          >
            Ver planes <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
