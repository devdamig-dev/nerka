"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Crown,
  ImagePlus,
  MapPin,
  MessageCircle,
  PackagePlus,
  Search,
  Send,
  Sparkles,
  Store,
} from "lucide-react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import {
  NiarHeader,
  QuickActionCard,
  SectionTitle,
} from "@/components/nerka/ui";
import { categories, entrepreneurs, popularProducts, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";

export default function NiarHomePage() {
  const { isEntrepreneur, hydrated } = useRole();

  return (
    <main>
      <NiarHeader />
      {/* Evita hydration mismatch: hasta hidratar localStorage, mostramos visitor (default). */}
      {!hydrated || !isEntrepreneur ? <VisitorHome /> : <EntrepreneurHome />}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VISITOR HOME
// ─────────────────────────────────────────────────────────────────────
function VisitorHome() {
  const { toggleRole, isFavorite } = useRole();
  const favoriteProfiles = entrepreneurs.filter((e) => isFavorite(e.id)).slice(0, 3);
  const zones = ["Berazategui", "Quilmes", "Temperley", "Zona Sur"];
  const heroProducts = popularProducts.slice(0, 5);
  const editorialLead = entrepreneurs[0];
  const editorialDuo = entrepreneurs.slice(1, 3);

  return (
    <div className="mx-auto max-w-[1540px] space-y-12 px-4 py-4 lg:space-y-16 lg:px-10 lg:py-10 xl:px-12">
      <section className="relative overflow-hidden rounded-[3rem] border border-[#E8E0D6]/90 bg-[radial-gradient(circle_at_14%_12%,rgba(255,255,255,0.95),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(201,152,74,0.16),transparent_24%),linear-gradient(135deg,#F7F2EA,#EEF3EA_48%,#FBF8F3)] text-[#1f241f] shadow-[0_38px_120px_rgba(88,102,74,0.18)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/48 blur-3xl" />
        <div className="grid gap-10 p-5 lg:grid-cols-[0.88fr_1.12fr] lg:p-12 xl:p-16">
          <div className="flex flex-col justify-center">
            <p className="niar-kicker w-fit">
              <Sparkles size={12} /> Descubrimiento local premium
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#1f241f] lg:text-6xl">
              Explorá lo mejor cerca tuyo.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5F665A] lg:text-lg">
              Una experiencia visual para encontrar marcas cercanas, productos con historia y servicios confiables con la calidez del barrio y la curaduría de una marca premium.
            </p>
            <div className="mt-8 max-w-2xl rounded-[1.85rem] bg-white/90 p-2 shadow-[0_24px_70px_rgba(79,89,68,0.18)] ring-1 ring-white/80 backdrop-blur">
              <div className="grid gap-2 lg:grid-cols-[1fr_190px_auto]">
                <label className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[#1f241f]">
                  <Search size={18} className="text-[#6E7F63]" />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-[#A39A8D]" placeholder="¿Qué querés descubrir hoy?" />
                </label>
                <label className="flex items-center gap-2 rounded-2xl bg-[#F5F1EA] px-4 py-3 text-[#1f241f]">
                  <MapPin size={17} className="text-[#6E7F63]" />
                  <select className="w-full bg-transparent text-sm outline-none">
                    {zones.map((zone) => <option key={zone}>{zone}</option>)}
                  </select>
                </label>
                <Link href="/niar/explorar" className="inline-flex items-center justify-center rounded-2xl bg-[#6E7F63] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5D6F52]">
                  Explorar
                </Link>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Gastronomía", "Moda", "Belleza", "Servicios", "Hogar", "Regalería"].map((item) => (
                <Link key={item} href="/niar/explorar" className="rounded-full bg-white/55 px-3 py-1.5 text-xs font-medium text-[#5F665A] ring-1 ring-[#DDD3C4] transition hover:bg-white">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid auto-rows-[minmax(132px,auto)] gap-4 sm:grid-cols-2 lg:content-center">
            {heroProducts.slice(0, 4).map((product, index) => (
              <Link
                key={product.id}
                href={`/niar/productos/${product.id}`}
                className={`group niar-lifestyle-tile bg-white ring-1 ring-[#E1D8CB] ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className={`${index === 0 ? "h-72" : "h-44"} niar-editorial-image w-full object-cover`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f241f]/72 via-[#1f241f]/16 to-transparent p-4 text-white">
                    <p className={`${index === 0 ? "text-2xl" : "text-sm"} font-semibold tracking-[-0.03em]`}>{product.name}</p>
                    <p className="mt-1 text-xs text-white/75">{product.entrepreneurName} · selección local</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="niar-editorial-panel p-5 lg:p-8 xl:p-10">
        <div className="relative z-10 mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div>
            <p className="niar-kicker"><Sparkles size={12} /> Curaduría de barrio</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-[#1f241f] lg:text-5xl">Marcas, oficios y productos con contexto real.</h2>
          </div>
          <Link href="/niar/explorar" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1f241f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(31,36,31,0.18)] transition hover:-translate-y-0.5">Ver recorrido editorial <ArrowRight size={15} /></Link>
        </div>
        <div className="relative z-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Link href={`/niar/emprendedores/${editorialLead.id}`} className="niar-lifestyle-tile group min-h-[420px] lg:min-h-[560px]">
            <img src={editorialLead.cover} alt={editorialLead.name} className="niar-editorial-image absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,31,0.04),rgba(31,36,31,0.78))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
              <span className="rounded-full bg-white/16 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur">Historia destacada</span>
              <h3 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] lg:text-6xl">{editorialLead.name}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/78 lg:text-base">{editorialLead.about}</p>
            </div>
          </Link>
          <div className="grid gap-4">
            {editorialDuo.map((brand) => (
              <Link key={brand.id} href={`/niar/emprendedores/${brand.id}`} className="niar-lifestyle-tile group min-h-[260px]">
                <img src={brand.cover} alt={brand.name} className="niar-editorial-image absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,31,0.02),rgba(31,36,31,0.68))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs font-medium text-white/72">{brand.category} · {brand.zone}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{brand.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section>
        <SectionTitle title="Categorías para descubrir" subtitle="Elegí un rubro y empezá por lo visual" cta="Ver todas" href="/niar/explorar" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">
          {categories.slice(0, 14).map((category, index) => (
            <Link key={category} href="/niar/explorar" className={`group relative overflow-hidden rounded-[1.65rem] border border-[#E6DDD0] bg-white/82 p-4 text-sm font-semibold text-[#2F382B] shadow-[0_14px_36px_rgba(79,89,68,0.06)] transition duration-500 hover:-translate-y-1 hover:border-[#C8D4BF] hover:bg-white hover:shadow-[0_20px_50px_rgba(79,89,68,0.12)] ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}>
              <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#EEF3EA] transition duration-500 group-hover:scale-125" />
              <span className="relative z-10 block text-base tracking-[-0.02em]">{category}</span>
              <span className="relative z-10 mt-6 inline-flex text-xs font-medium text-[#6E7F63]">Explorar →</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Comercios que invitan a entrar" subtitle="Cards editoriales, confianza visible y descubrimiento sin ruido" cta="Explorar todos" href="/niar/explorar" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {entrepreneurs.slice(0, 6).map((entrepreneur, index) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} emphasis={index === 0} />)}
        </div>
      </section>

      <section>
        <SectionTitle title="Objetos y servicios para mirar dos veces" subtitle="Selecciones visuales con acceso rápido al detalle" cta="Ver productos" href="/niar/explorar?type=Productos" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {popularProducts.slice(0, 8).map((product, index) => (
            <Link key={product.id} href={`/niar/productos/${product.id}`} className={`group niar-premium-card ${index === 0 ? "col-span-2 lg:row-span-2" : ""}`}>
              <img src={product.image} alt={product.name} className={`niar-editorial-image w-full object-cover ${index === 0 ? "h-80 lg:h-[34rem]" : "h-52 lg:h-72"}`} />
              <div className="p-5">
                <p className={`${index === 0 ? "text-2xl lg:text-4xl" : "text-sm"} line-clamp-2 font-semibold tracking-[-0.04em] text-[#1f241f]`}>{product.name}</p>
                <p className="mt-1 line-clamp-1 text-xs text-[#666C60]">{product.entrepreneurName}</p>
                <p className="mt-2 text-base font-semibold text-[#6E7F63]">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {favoriteProfiles.length ? (
        <section>
          <SectionTitle title="Guardados" cta="Ver favoritos" href="/niar/favoritos" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProfiles.map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 rounded-[1.75rem] border border-[#E6DDD0] bg-white/85 p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#EEF3EA] px-2.5 py-1 text-xs font-semibold text-[#6E7F63]"><Store size={12} /> Para comercios</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1f241f]">Vendé con un catálogo simple y profesional</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#666C60]">Publicá hasta 25 productos en el plan Catálogo o sumá carrito, destacados y promociones con Vender.</p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <button type="button" onClick={toggleRole} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6E7F63] px-5 py-3 text-sm font-semibold text-white">Activar perfil <ArrowRight size={15} /></button>
          <Link href="/niar/planes" className="text-center text-sm font-semibold text-[#6E7F63]">Ver planes</Link>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ENTREPRENEUR HOME
// ─────────────────────────────────────────────────────────────────────
function EntrepreneurHome() {
  const { user } = useRole();
  const profile = getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const productCount = profile.catalog.filter((c) => c.type === "product").length;
  const serviceCount = profile.catalog.filter((c) => c.type === "service").length;

  return (
    <div className="mx-auto max-w-[1540px] space-y-10 px-4 py-4 lg:space-y-14 lg:px-10 lg:py-10 xl:px-12">
      {/* HERO entrepreneur */}
      <section className="overflow-hidden rounded-[2.5rem] bg-[#F7F2EA] p-5 text-[#1f241f] shadow-[0_28px_90px_rgba(88,102,74,0.12)] ring-1 ring-[#E8E0D6] lg:p-10">
        <p className="inline-flex items-center gap-1 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#6E7F63] ring-1 ring-[#D9CFC1]">
          <Store size={12} /> Mi negocio
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] lg:text-6xl">Tu marca local, más descubrible</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#5F665A] lg:text-lg">
          {profile.name} se ve como una mini marca dentro del ecosistema NIAR: portada amplia, catálogo visual y accesos simples para que clientes te descubran sin sensación administrativa.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/niar/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1f241f] px-5 py-3 text-sm font-semibold text-white"
          >
            Ver mi tienda
          </Link>
          <Link
            href="/niar/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/85 px-5 py-3 text-sm font-semibold text-[#5F6F55] ring-1 ring-[#D9CFC1]"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <Link
            href="/niar/mensajes"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/85 px-5 py-3 text-sm font-semibold text-[#5F6F55] ring-1 ring-[#D9CFC1]"
          >
            <MessageCircle size={15} /> Pedidos y mensajes
          </Link>
        </div>
      </section>

      {/* PRESENCIA comercial */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Portada activa", value: "Hero", trend: "visual" },
          { label: "Catálogo visible", value: `${productCount + serviceCount}`, trend: "ítems" },
          { label: "Respuesta", value: profile.responseTime, trend: "" },
          { label: "Zona", value: profile.zone, trend: "local" },
        ].map((m) => (
          <article key={m.label} className="rounded-[1.75rem] border border-[#E6DDD0] bg-white/88 p-5 shadow-[0_16px_42px_rgba(79,89,68,0.07)]">
            <p className="text-xs text-[#666C60]">{m.label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-xl font-semibold tracking-[-0.02em] text-[#1f241f]">{m.value}</p>
              {m.trend ? <span className="text-xs font-medium text-[#197a43]">{m.trend}</span> : null}
            </div>
          </article>
        ))}
      </section>

      {/* QUICK ACTIONS entrepreneur */}
      <section>
        <SectionTitle title="Gestioná sin romper la experiencia" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <QuickActionCard
            href="/niar/perfil/nuevo-producto"
            title="Cargar producto"
            description="Sumá ítems a tu catálogo"
            tone="bg-[#EEF3EA]"
            icon={<PackagePlus size={18} />}
          />
          <QuickActionCard
            href="/niar/perfil/catalogo"
            title="Editar catálogo"
            description="Gestioná disponibilidad"
            tone="bg-[#FFEFE7]"
            icon={<ImagePlus size={18} />}
          />
          <QuickActionCard
            href="/niar/mensajes"
            title="Pedidos / mensajes"
            description="Respondé a tus clientes"
            tone="bg-[#E8FFF5]"
            icon={<Send size={18} />}
          />
          <QuickActionCard
            href="/niar/planes"
            title="Mejorar mi plan"
            description="Más visibilidad y métricas"
            tone="bg-[#FFFBE7]"
            icon={<Crown size={18} />}
          />
        </div>
      </section>

      {/* MY CATALOG PEEK */}
      <section>
        <SectionTitle
          title="Escaparate visual"
          subtitle={`${productCount} productos · ${serviceCount} servicios`}
          cta="Ver completo"
          href="/niar/perfil/catalogo"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {profile.catalog.slice(0, 5).map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[#E6DDD0] bg-white shadow-[0_16px_42px_rgba(79,89,68,0.07)]">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover lg:h-48" />
              <div className="space-y-1 p-3">
                <p className="line-clamp-1 text-sm font-semibold text-[#1f241f]">{item.name}</p>
                <p className="text-xs text-[#6E7F63]">
                  {item.price ? formatPrice(item.price) : "A consultar"}
                </p>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    item.available ? "bg-[#E7F9EE] text-[#197a43]" : "bg-[#f1f1f1] text-[#8a8a8a]"
                  }`}
                >
                  {item.available ? "Disponible" : "Pausado"}
                </span>
              </div>
            </article>
          ))}
          <Link
            href="/niar/perfil/nuevo-producto"
            className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#C8D4BF] bg-[#FBF8F3] p-3 text-sm font-medium text-[#6E7F63] hover:bg-[#EEF3EA]"
          >
            <PackagePlus size={20} />
            Nuevo producto
          </Link>
        </div>
      </section>

      {/* PLANS CTA */}
      <section className="grid gap-3 rounded-3xl border border-[#C8D4BF] bg-gradient-to-br from-[#F7F2EA] to-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#EEF3EA] px-2.5 py-1 text-xs font-semibold text-[#6E7F63]">
            <Crown size={12} /> Plan recomendado · Vender
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#1f241f] lg:text-xl">
            Potenciá tu negocio en NIAR
          </h2>
          <p className="mt-1 text-sm text-[#666C60]">
            Más visibilidad, carrito simple, promociones y métricas comerciales para convertir mejor.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <Link
            href="/niar/planes"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6E7F63] px-4 py-3 text-sm font-medium text-white"
          >
            Quiero potenciar mi negocio <ArrowRight size={15} />
          </Link>
          <span className="text-center text-xs text-[#8A8378]">Sin pagos ni logística integrados</span>
        </div>
      </section>

      {/* tip */}
      <section className="rounded-[1.75rem] border border-[#E6DDD0] bg-white/88 p-5 shadow-[0_16px_42px_rgba(79,89,68,0.07)] text-sm text-[#666C60]">
        <p className="font-medium text-[#1f241f]">¿Curioso por la otra punta?</p>
        <p className="mt-1">
          Probá la app{" "}
          <Link href="/niar/explorar" className="font-medium text-[#6E7F63]">
            como visitante
          </Link>{" "}
          para ver cómo te encuentran tus clientes.
          <span className="ml-1 inline-flex items-center gap-1 text-xs text-[#8A8378]">
            <BarChart3 size={12} /> insight: cuanto más completo tu perfil, más pedidos recibís.
          </span>
        </p>
      </section>
    </div>
  );
}
