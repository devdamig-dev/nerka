import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  PackagePlus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { entrepreneurs, popularProducts, categories } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";

export default function LandingPage() {
  const featured = entrepreneurs.slice(0, 8);
  const products = popularProducts.slice(0, 6);

  return (
    <main className="min-h-screen bg-[var(--niar-bg)] text-[var(--niar-ink)]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[var(--niar-border)] bg-[var(--niar-bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
            niar
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-[var(--niar-ink-mute)] md:flex">
            <Link href="/nerka/explorar" className="hover:text-[var(--niar-ink)]">Descubrir</Link>
            <Link href="#emprendedores" className="hover:text-[var(--niar-ink)]">Emprendedores</Link>
            <Link href="#vender" className="hover:text-[var(--niar-ink)]">Vender en NIAR</Link>
            <Link href="/nerka/planes" className="hover:text-[var(--niar-ink)]">Planes</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/nerka"
              className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-[var(--niar-ink-mute)] hover:text-[var(--niar-ink)] sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/nerka"
              className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-4 py-2 text-sm font-medium text-white"
            >
              Abrir app <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-12 pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--niar-sage-mute)] px-3 py-1 text-xs font-medium text-[var(--niar-sage-on)]">
              <Sparkles size={12} /> Comercio local · Argentina
            </p>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--niar-ink)] lg:text-[60px]">
              Descubrí lo mejor
              <br />
              de tu zona.
            </h1>
            <p className="mt-5 max-w-md text-base text-[var(--niar-ink-mute)] lg:text-lg">
              Tiendas locales, productos únicos y emprendedores cerca tuyo. Recorré, consultá y
              comprá — todo en un solo lugar.
            </p>

            {/* SEARCH */}
            <div className="mt-7 max-w-xl rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-1.5 shadow-[var(--niar-shadow-sm)]">
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
                    <span className="text-[var(--niar-ink)]">Berazategui</span>
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

            <div className="niar-scroll mt-4 flex max-w-xl items-center gap-2 overflow-x-auto pb-1 text-xs text-[var(--niar-ink-mute)]">
              <span className="text-[var(--niar-ink-soft)]">Probá:</span>
              {["Pastelería", "Decoración", "Cerámica", "Maquillaje", "Florería"].map((s) => (
                <Link
                  key={s}
                  href="/nerka/explorar"
                  className="whitespace-nowrap rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1 hover:border-[var(--niar-sage)] hover:text-[var(--niar-sage-on)]"
                >
                  {s}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--niar-ink-mute)]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[var(--niar-sage-on)]" /> Tiendas verificadas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle size={14} className="text-[var(--niar-sage-on)]" /> Cierre por WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--niar-sage-on)]" /> Cerca tuyo
              </span>
            </div>
          </div>

          {/* HERO COLLAGE */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={featured[0].cover}
                alt=""
                className="aspect-[3/4] w-full rounded-3xl object-cover shadow-[var(--niar-shadow)]"
              />
              <div className="space-y-3">
                <img
                  src={featured[1].cover}
                  alt=""
                  className="aspect-square w-full rounded-3xl object-cover shadow-[var(--niar-shadow-sm)]"
                />
                <img
                  src={featured[2].cover}
                  alt=""
                  className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[var(--niar-shadow-sm)]"
                />
              </div>
            </div>
            <div className="absolute -left-6 -bottom-4 rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-3 shadow-[var(--niar-shadow)]">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-sage-on)]">
                Recién en NIAR
              </p>
              <p className="mt-0.5 text-sm font-medium text-[var(--niar-ink)]">
                {featured[2].name}
              </p>
              <p className="text-xs text-[var(--niar-ink-mute)]">
                {featured[2].zone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-y border-[var(--niar-border)] bg-[var(--niar-surface)]">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-6 py-4 niar-scroll">
          {categories.slice(0, 12).map((cat, i) => (
            <Link
              key={cat}
              href="/nerka/explorar"
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                i === 0
                  ? "bg-[var(--niar-ink)] text-white"
                  : "text-[var(--niar-ink-mute)] hover:bg-[var(--niar-surface-soft)] hover:text-[var(--niar-ink)]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ENTREPRENEURS */}
      <section id="emprendedores" className="bg-[var(--niar-bg)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
                Destacados
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[40px]">
                Emprendedores en tu zona
              </h2>
            </div>
            <Link
              href="/nerka/explorar"
              className="hidden text-sm font-medium text-[var(--niar-sage-on)] hover:text-[var(--niar-sage-deep)] sm:inline"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((e) => (
              <Link
                key={e.id}
                href={`/nerka/emprendedores/${e.id}`}
                className="group block overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] transition hover:-translate-y-0.5 hover:shadow-[var(--niar-shadow)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={e.cover}
                    alt={e.name}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                    {e.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--niar-ink-mute)]">
                    {e.category} · {e.zone}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--niar-ink-mute)]">
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="fill-[#f0a93f] text-[#f0a93f]" />
                      <span className="font-medium text-[var(--niar-ink)]">{e.rating}</span>
                      <span className="text-[var(--niar-ink-soft)]">({e.reviews})</span>
                    </span>
                    <span>{e.catalog.filter((c) => c.type === "product").length} productos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="border-y border-[var(--niar-border)] bg-[var(--niar-surface)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
              Lo más explorado
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[40px]">
              Productos cerca tuyo
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/nerka/emprendedores/${p.entrepreneurId}`}
                className="group block overflow-hidden rounded-3xl"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-square w-full rounded-3xl object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="px-1 pt-3">
                  <p className="line-clamp-1 text-sm font-medium text-[var(--niar-ink)]">
                    {p.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-[var(--niar-ink-mute)]">
                    {p.entrepreneurName}
                  </p>
                  <p className="font-display mt-1 text-sm font-semibold text-[var(--niar-ink)]">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER PROP */}
      <section id="vender" className="bg-[var(--niar-bg)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--niar-lila-soft)] px-3 py-1 text-xs font-medium text-[var(--niar-lila-deep)]">
                <Store size={12} /> Para emprendedores
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-[var(--niar-ink)] lg:text-[44px]">
                Tu negocio local,
                <br />
                listo para vender en minutos.
              </h2>
              <p className="mt-4 max-w-lg text-base text-[var(--niar-ink-mute)]">
                Sin pagos online, sin envíos complicados. Te damos perfil comercial, catálogo,
                carrito y un link para compartir. El cierre es por WhatsApp, simple y directo.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <PackagePlus size={16} />, label: "Catálogo simple y editable" },
                  { icon: <MessageCircle size={16} />, label: "Pedidos por WhatsApp" },
                  { icon: <Sparkles size={16} />, label: "Asistente IA · pronto" },
                  { icon: <ShieldCheck size={16} />, label: "Perfil verificado" },
                ].map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm text-[var(--niar-ink)]"
                  >
                    <span className="text-[var(--niar-sage-on)]">{b.icon}</span> {b.label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/nerka/perfil"
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-[var(--niar-ink)] px-6 py-3.5 text-sm font-medium text-white"
                >
                  Crear mi tienda <ArrowRight size={14} />
                </Link>
                <Link
                  href="/nerka/planes"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-6 py-3.5 text-sm font-medium text-[var(--niar-ink)] hover:border-[var(--niar-sage)]"
                >
                  Ver planes
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {entrepreneurs.slice(2, 6).map((e) => (
                  <div
                    key={e.id}
                    className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]"
                  >
                    <img src={e.cover} alt={e.name} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-3">
                      <p className="font-display text-sm font-semibold text-[var(--niar-ink)]">
                        {e.name}
                      </p>
                      <p className="text-xs text-[var(--niar-ink-mute)]">{e.zone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--niar-border)] bg-[var(--niar-surface)]">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold text-[var(--niar-ink)]">niar</p>
              <p className="mt-1 max-w-sm text-sm text-[var(--niar-ink-mute)]">
                La forma moderna de descubrir comercio local en tu zona.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-[var(--niar-ink-mute)] sm:grid-cols-3">
              <Link href="/nerka/explorar" className="hover:text-[var(--niar-ink)]">Descubrir</Link>
              <Link href="/nerka/perfil" className="hover:text-[var(--niar-ink)]">Vender</Link>
              <Link href="/nerka/planes" className="hover:text-[var(--niar-ink)]">Planes</Link>
              <Link href="/nerka/eventos" className="hover:text-[var(--niar-ink)]">Activaciones</Link>
              <Link href="/nerka" className="hover:text-[var(--niar-ink)]">Abrir app</Link>
              <span className="text-[var(--niar-ink-soft)]">Comunidades · pronto</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-[var(--niar-border-soft)] pt-6 text-xs text-[var(--niar-ink-soft)] sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} NIAR · hecho con ♥ para descubrir lo local</p>
            <p>Berazategui · Quilmes · Zona Sur</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
