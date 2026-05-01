import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MapPin,
  MessageCircle,
  PackagePlus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { entrepreneurs, popularProducts, categories } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";

export default function LandingPage() {
  const featuredEntrepreneurs = entrepreneurs.slice(0, 6);
  const featuredProducts = popularProducts.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#FAFAFC] text-[#171321]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#ece8f7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="text-xl font-semibold tracking-tight text-[#2B174F]">
            nerka
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#433d56] md:flex">
            <Link href="/nerka/explorar" className="hover:text-[#5B2EFF]">Explorar</Link>
            <Link href="#emprendedores" className="hover:text-[#5B2EFF]">Emprendedores</Link>
            <Link href="#vender" className="hover:text-[#5B2EFF]">Vender en Nerka</Link>
            <Link href="/nerka/planes" className="hover:text-[#5B2EFF]">Planes</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/nerka"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-[#5B2EFF] hover:bg-[#F2ECFF] sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/nerka"
              className="inline-flex items-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
            >
              Abrir app <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO with dual narrative */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F4F0FF] to-[#FAFAFC]" />
        <div className="mx-auto max-w-6xl px-5 py-12 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#5B2EFF] shadow-sm ring-1 ring-[#ece8f7]">
              <Sparkles size={12} /> Marketplace local · Argentina
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#1f1833] lg:text-5xl">
              Conectá con <span className="text-[#5B2EFF]">emprendedores</span> de tu zona.
              <br className="hidden md:block" /> O empezá a vender el tuyo.
            </h1>
            <p className="mt-3 text-base text-[#6F6A7C] lg:text-lg">
              Nerka es el puente entre emprendedores locales y clientes reales. Descubrí, consultá
              y comprá — o creá tu perfil comercial y recibí pedidos por WhatsApp.
            </p>
          </div>

          {/* Dual path cards */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-3xl border border-[#ece8f7] bg-white p-6 shadow-sm transition hover:shadow-md lg:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F2ECFF]" aria-hidden />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2ECFF] px-3 py-1 text-xs font-semibold text-[#5B2EFF]">
                  <Search size={12} /> Para quien busca
                </span>
                <h2 className="mt-3 text-xl font-semibold text-[#1f1833] lg:text-2xl">
                  Descubrí emprendedores cerca tuyo
                </h2>
                <p className="mt-2 text-sm text-[#6F6A7C]">
                  Recorré catálogos reales, comparalos, agregá productos al carrito y consultá
                  directo por WhatsApp o por mensaje interno.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-[#433d56]">
                  <li className="flex items-center gap-2"><Compass size={14} className="text-[#5B2EFF]" /> Explorá por rubro o zona</li>
                  <li className="flex items-center gap-2"><ShoppingBag size={14} className="text-[#5B2EFF]" /> Carrito multi-tienda</li>
                  <li className="flex items-center gap-2"><MessageCircle size={14} className="text-[#5B2EFF]" /> Consultá sin compromiso</li>
                </ul>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/nerka/explorar"
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#5B2EFF] px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Explorar emprendedores <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/nerka"
                    className="inline-flex items-center justify-center rounded-xl border border-[#d9cef8] bg-white px-4 py-2.5 text-sm font-medium text-[#5B2EFF]"
                  >
                    Ver productos cerca mío
                  </Link>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-3xl border border-[#3f1bbd] bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-6 text-white shadow-sm transition hover:shadow-md lg:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" aria-hidden />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Store size={12} /> Para emprendedores
                </span>
                <h2 className="mt-3 text-xl font-semibold lg:text-2xl">
                  Tenés un emprendimiento? Empezá a vender hoy
                </h2>
                <p className="mt-2 text-sm text-white/85">
                  Creá tu perfil comercial, cargá tus productos, compartí el link de tu tienda
                  y recibí pedidos por WhatsApp en minutos. Sin saber nada técnico.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-white/90">
                  <li className="flex items-center gap-2"><PackagePlus size={14} /> Catálogo simple y rápido</li>
                  <li className="flex items-center gap-2"><Store size={14} /> Perfil con link compartible</li>
                  <li className="flex items-center gap-2"><Sparkles size={14} /> IA para mejorar tus publicaciones</li>
                </ul>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/nerka/perfil"
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]"
                  >
                    Empezar a vender <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/nerka/planes"
                    className="inline-flex items-center justify-center rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
                  >
                    Ver planes
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* TRUST STRIP */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
            {[
              { icon: <Star size={18} />, title: "Emprendedores reales", desc: "Tiendas verificadas en tu zona" },
              { icon: <ShieldCheck size={18} />, title: "Sin pagos online", desc: "Cerrás directo con cada negocio" },
              { icon: <MapPin size={18} />, title: "Cerca tuyo", desc: "Berazategui, Quilmes y Zona Sur" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-[#ece8f7] bg-white p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2ECFF] text-[#5B2EFF]">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1f1833]">{item.title}</p>
                  <p className="text-xs text-[#6F6A7C]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-t border-[#ece8f7] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Categorías</p>
              <h2 className="mt-1 text-xl font-semibold text-[#1f1833] lg:text-2xl">Encontrá tu rubro</h2>
            </div>
            <Link href="/nerka/explorar" className="text-sm font-medium text-[#5B2EFF]">
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.slice(0, 14).map((cat) => (
              <Link
                key={cat}
                href="/nerka/explorar"
                className="rounded-2xl border border-[#ece8f7] bg-[#FAFAFC] px-3 py-3 text-center text-sm font-medium text-[#2B174F] transition hover:border-[#d9cef8] hover:bg-[#F2ECFF]"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ENTREPRENEURS */}
      <section id="emprendedores" className="bg-[#FAFAFC]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Destacados</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#1f1833] lg:text-3xl">
                Emprendedores en tu zona
              </h2>
              <p className="mt-1 text-sm text-[#6F6A7C]">
                Tiendas verificadas que responden rápido y trabajan localmente.
              </p>
            </div>
            <Link href="/nerka/explorar" className="hidden text-sm font-medium text-[#5B2EFF] sm:inline">
              Ver todos →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEntrepreneurs.map((e) => (
              <Link
                key={e.id}
                href={`/nerka/emprendedores/${e.id}`}
                className="group overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative">
                  <img src={e.cover} alt={e.name} className="h-40 w-full object-cover transition group-hover:scale-[1.02]" />
                  <img
                    src={e.avatar}
                    alt=""
                    className="absolute -bottom-5 left-3 h-12 w-12 rounded-xl border-4 border-white object-cover"
                  />
                </div>
                <div className="p-4 pt-7">
                  <p className="font-semibold text-[#1f1833]">{e.name}</p>
                  <p className="text-xs text-[#6F6A7C]">{e.category} · {e.zone}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#433d56]">
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="fill-[#ffb547] text-[#ffb547]" /> {e.rating}
                    </span>
                    <span className="text-[#9088a3]">·</span>
                    <span>{e.catalog.filter((c) => c.type === "product").length} productos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="border-y border-[#ece8f7] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[#8d86a2]">Productos populares</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#1f1833] lg:text-3xl">
              Lo que más se pide cerca tuyo
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/nerka/emprendedores/${p.entrepreneurId}`}
                className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md"
              >
                <img src={p.image} alt={p.name} className="h-32 w-full object-cover" />
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{p.name}</p>
                  <p className="line-clamp-1 text-xs text-[#6F6A7C]">{p.entrepreneurName}</p>
                  <p className="mt-1 text-sm font-semibold text-[#5B2EFF]">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SELLER VALUE PROP */}
      <section id="vender" className="bg-[#FAFAFC]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4E8] px-3 py-1 text-xs font-semibold text-[#9b5a00]">
                <Store size={12} /> Para emprendedores
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-[#1f1833] lg:text-3xl">
                Tu negocio local, listo para vender en minutos
              </h2>
              <p className="mt-2 text-sm text-[#6F6A7C] lg:text-base">
                Sin pagos online, sin envíos complicados, sin dominios. Te damos un perfil
                comercial real, catálogo, carrito y un link compartible. El cierre se hace
                directo por WhatsApp.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <PackagePlus size={16} />, label: "Catálogo simple" },
                  { icon: <MessageCircle size={16} />, label: "Pedidos por WhatsApp" },
                  { icon: <Sparkles size={16} />, label: "Mejorá con IA" },
                  { icon: <ShieldCheck size={16} />, label: "Perfil verificado" },
                ].map((b) => (
                  <li key={b.label} className="flex items-center gap-2 rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-sm text-[#433d56]">
                    <span className="text-[#5B2EFF]">{b.icon}</span> {b.label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/nerka/perfil"
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#5B2EFF] px-5 py-3 text-sm font-medium text-white"
                >
                  Crear mi tienda <ArrowRight size={14} />
                </Link>
                <Link
                  href="/nerka/planes"
                  className="inline-flex items-center justify-center rounded-xl border border-[#d9cef8] bg-white px-5 py-3 text-sm font-medium text-[#5B2EFF]"
                >
                  Ver planes
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {entrepreneurs.slice(2, 6).map((e) => (
                <div key={e.id} className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm">
                  <img src={e.cover} alt={e.name} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-semibold text-[#1f1833]">{e.name}</p>
                    <p className="text-[11px] text-[#6F6A7C]">{e.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#ece8f7] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-[#6F6A7C] md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#9088a3]">© {new Date().getFullYear()} Nerka — hecho con ♥ para emprendedores locales</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link href="/nerka/explorar" className="hover:text-[#5B2EFF]">Explorar</Link>
            <Link href="/nerka/perfil" className="hover:text-[#5B2EFF]">Vender en Nerka</Link>
            <Link href="/nerka/planes" className="hover:text-[#5B2EFF]">Planes</Link>
            <Link href="/nerka" className="hover:text-[#5B2EFF]">Abrir app</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
