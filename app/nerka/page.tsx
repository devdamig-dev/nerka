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

  return (
    <div className="space-y-10 px-4 py-4 lg:px-8 lg:py-8">
      <section className="overflow-hidden rounded-[2.25rem] border border-[#E8E0D6] bg-[#F7F2EA] text-[#1f241f] shadow-[0_24px_80px_rgba(88,102,74,0.13)]">
        <div className="grid gap-10 p-5 lg:grid-cols-[0.96fr_1.04fr] lg:p-10 xl:p-14">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#6E7F63] ring-1 ring-[#D9CFC1]">
              <Sparkles size={12} /> Descubrimiento local premium
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[#1f241f] lg:text-6xl">
              Explorá lo mejor de tu zona.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5F665A] lg:text-lg">
              Tiendas, productos y servicios locales seleccionados para descubrir, consultar y comprar de forma simple.
            </p>
            <div className="mt-8 max-w-2xl rounded-[1.75rem] bg-white/95 p-2 shadow-[0_20px_60px_rgba(79,89,68,0.16)] ring-1 ring-[#E1D8CB]">
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
          <div className="grid auto-rows-[minmax(132px,auto)] gap-3 sm:grid-cols-2 lg:content-center">
            {popularProducts.slice(0, 4).map((product, index) => (
              <Link
                key={product.id}
                href={`/niar/emprendedores/${product.entrepreneurId}`}
                className={`group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_50px_rgba(79,89,68,0.14)] ring-1 ring-[#E1D8CB] transition hover:-translate-y-1 ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <div className="relative">
                  <img src={product.image} alt={product.name} className={`${index === 0 ? "h-64" : "h-40"} w-full object-cover transition duration-500 group-hover:scale-[1.04]`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 text-white">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="mt-1 text-xs text-white/75">{product.entrepreneurName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Categorías para descubrir" subtitle="Elegí un rubro y empezá por lo visual" cta="Ver todas" href="/niar/explorar" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.slice(0, 14).map((category) => (
            <Link key={category} href="/niar/explorar" className="rounded-2xl border border-[#E6DDD0] bg-white/80 p-4 text-sm font-semibold text-[#2F382B] transition hover:-translate-y-0.5 hover:border-[#C8D4BF] hover:bg-white hover:shadow-[0_14px_35px_rgba(79,89,68,0.10)]">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Comercios destacados" subtitle="Perfiles cuidados, visuales y listos para consultar" cta="Explorar todos" href="/niar/explorar" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entrepreneurs.slice(0, 6).map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)}
        </div>
      </section>

      <section>
        <SectionTitle title="Productos populares cerca tuyo" subtitle="Cards grandes, precio claro y acceso al catálogo" cta="Ver productos" href="/niar/explorar?type=Productos" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {popularProducts.slice(0, 8).map((product) => (
            <Link key={product.id} href={`/niar/emprendedores/${product.entrepreneurId}`} className="group overflow-hidden rounded-[1.75rem] border border-[#E6DDD0] bg-white shadow-[0_14px_35px_rgba(79,89,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(79,89,68,0.14)]">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover transition group-hover:scale-[1.03] lg:h-48" />
              <div className="p-4">
                <p className="line-clamp-1 text-sm font-semibold text-[#1f241f]">{product.name}</p>
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
    <div className="space-y-6 px-4 py-4 lg:space-y-8 lg:px-8 lg:py-8">
      {/* HERO entrepreneur */}
      <section className="rounded-3xl bg-gradient-to-br from-[#6E7F63] to-[#2F382B] p-5 text-white lg:p-9">
        <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
          <Store size={12} /> Mi negocio
        </p>
        <h1 className="mt-3 text-2xl font-semibold lg:text-4xl">Hola, {profile.name} 👋</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/90 lg:text-base">
          Resumen de tu día: {productCount} productos, {serviceCount} servicios, 7 pedidos esta
          semana. Tu tienda está activa.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/niar/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#1f241f]"
          >
            Ver mi tienda
          </Link>
          <Link
            href="/niar/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <Link
            href="/niar/mensajes"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <MessageCircle size={15} /> Pedidos y mensajes
          </Link>
        </div>
      </section>

      {/* METRICS quick */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Visitas a tu tienda", value: "128", trend: "+12%" },
          { label: "Pedidos esta semana", value: "7", trend: "+3" },
          { label: "Mensajes nuevos", value: "4", trend: "" },
          { label: "Total en pedidos", value: formatPrice(196500) ?? "$0", trend: "+18%" },
        ].map((m) => (
          <article key={m.label} className="rounded-2xl border border-[#E6DDD0] bg-white p-4">
            <p className="text-xs text-[#666C60]">{m.label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-xl font-semibold text-[#1f241f]">{m.value}</p>
              {m.trend ? <span className="text-xs font-medium text-[#197a43]">{m.trend}</span> : null}
            </div>
          </article>
        ))}
      </section>

      {/* QUICK ACTIONS entrepreneur */}
      <section>
        <SectionTitle title="Atajos para tu negocio" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
          title="Mi catálogo"
          subtitle={`${productCount} productos · ${serviceCount} servicios`}
          cta="Ver completo"
          href="/niar/perfil/catalogo"
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
          {profile.catalog.slice(0, 5).map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-[#E6DDD0] bg-white">
              <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
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
      <section className="grid gap-3 rounded-3xl border border-[#C8D4BF] bg-gradient-to-br from-[#F8F4FF] to-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#EEF3EA] px-2.5 py-1 text-xs font-semibold text-[#6E7F63]">
            <Crown size={12} /> Plan recomendado · Vender
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#1f241f] lg:text-xl">
            Potenciá tu negocio en Niar
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
      <section className="rounded-2xl border border-[#E6DDD0] bg-white p-4 text-sm text-[#666C60]">
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
