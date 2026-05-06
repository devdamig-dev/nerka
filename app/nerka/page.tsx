"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Compass,
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
  const services = entrepreneurs
    .flatMap((e) =>
      e.catalog
        .filter((c) => c.type === "service" && c.available)
        .map((service) => ({ ...service, entrepreneurId: e.id, entrepreneurName: e.name, zone: e.zone })),
    )
    .slice(0, 6);
  const zones = ["Berazategui", "Quilmes", "Temperley", "Zona Sur"];

  return (
    <div className="space-y-10 px-4 py-4 lg:px-8 lg:py-8">
      <section className="overflow-hidden rounded-[2rem] bg-[#171321] text-white shadow-xl shadow-[#2B174F]/10">
        <div className="grid gap-8 p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-9 xl:p-12">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
              <Sparkles size={12} /> Vidriera digital local
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight lg:text-5xl">
              Descubrí, compará y consultá negocios cerca tuyo.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 lg:text-base">
              Niar reúne comercios, servicios, productos y catálogos locales en una experiencia simple: buscás, explorás y coordinás directo por WhatsApp.
            </p>
            <div className="mt-6 max-w-2xl rounded-3xl bg-white p-2 shadow-2xl shadow-black/20">
              <div className="grid gap-2 lg:grid-cols-[1fr_190px_auto]">
                <label className="flex items-center gap-2 rounded-2xl px-3 py-3 text-[#171321]">
                  <Search size={18} className="text-[#5B2EFF]" />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b95aa]" placeholder="Producto, servicio o comercio" />
                </label>
                <label className="flex items-center gap-2 rounded-2xl bg-[#FAFAFC] px-3 py-3 text-[#171321]">
                  <MapPin size={17} className="text-[#5B2EFF]" />
                  <select className="w-full bg-transparent text-sm outline-none">
                    {zones.map((zone) => <option key={zone}>{zone}</option>)}
                  </select>
                </label>
                <Link href="/niar/explorar" className="inline-flex items-center justify-center rounded-2xl bg-[#5B2EFF] px-5 py-3 text-sm font-semibold text-white">
                  Explorar
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Gastronomía", "Moda", "Belleza", "Servicios", "Hogar", "Regalería"].map((item) => (
                <Link key={item} href="/niar/explorar" className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:content-center">
            {popularProducts.slice(0, 4).map((product, index) => (
              <Link
                key={product.id}
                href={`/niar/emprendedores/${product.entrepreneurId}`}
                className={`group overflow-hidden rounded-[1.5rem] bg-white/10 ring-1 ring-white/10 backdrop-blur ${index === 0 ? "sm:col-span-2" : ""}`}
              >
                <img src={product.image} alt={product.name} className={`${index === 0 ? "h-52" : "h-36"} w-full object-cover transition group-hover:scale-[1.03]`} />
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{product.name}</p>
                  <p className="mt-1 text-xs text-white/62">{product.entrepreneurName}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-4">
        <QuickActionCard href="/niar/explorar" title="Explorar cerca" description="Comercios, productos y servicios" tone="bg-white ring-1 ring-[#ece8f7]" icon={<Compass size={18} />} />
        <QuickActionCard href="/niar/explorar?type=Productos" title="Productos" description="Catálogos visuales y compartibles" tone="bg-white ring-1 ring-[#ece8f7]" icon={<ImagePlus size={18} />} />
        <QuickActionCard href="/niar/explorar?type=Servicios" title="Servicios" description="Coordiná por mensaje o WhatsApp" tone="bg-white ring-1 ring-[#ece8f7]" icon={<MessageCircle size={18} />} />
        <button type="button" onClick={toggleRole} className="rounded-2xl bg-[#2B174F] p-4 text-left text-white transition hover:shadow-md">
          <div className="mb-3 inline-flex rounded-xl bg-white/10 p-2"><Store size={18} /></div>
          <p className="text-sm font-semibold">Vender en Niar</p>
          <p className="mt-1 text-xs text-white/70">Perfil, catálogo y pedidos simples</p>
        </button>
      </section>

      <section>
        <SectionTitle title="Categorías para descubrir" subtitle="Rubro, zona y disponibilidad en pocos clics" cta="Ver todas" href="/niar/explorar" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.slice(0, 14).map((category) => (
            <Link key={category} href="/niar/explorar" className="rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm font-semibold text-[#2B174F] transition hover:-translate-y-0.5 hover:border-[#d9cef8] hover:shadow-md">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Comercios destacados" subtitle="Perfiles verificados, visuales y listos para consultar" cta="Explorar todos" href="/niar/explorar" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entrepreneurs.slice(0, 6).map((entrepreneur) => <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />)}
        </div>
      </section>

      <section>
        <SectionTitle title="Productos populares cerca tuyo" subtitle="Cards grandes, precio claro y acceso al catálogo" cta="Ver productos" href="/niar/explorar?type=Productos" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {popularProducts.slice(0, 8).map((product) => (
            <Link key={product.id} href={`/niar/emprendedores/${product.entrepreneurId}`} className="group overflow-hidden rounded-[1.5rem] border border-[#ece8f7] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover transition group-hover:scale-[1.03] lg:h-48" />
              <div className="p-4">
                <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{product.name}</p>
                <p className="mt-1 line-clamp-1 text-xs text-[#6F6A7C]">{product.entrepreneurName}</p>
                <p className="mt-2 text-base font-semibold text-[#5B2EFF]">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Servicios para resolver cerca" subtitle="Consultá disponibilidad, presupuesto y modalidad" cta="Ver servicios" href="/niar/explorar?type=Servicios" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={`/niar/emprendedores/${service.entrepreneurId}`} className="rounded-[1.5rem] border border-[#ece8f7] bg-white p-5 shadow-sm transition hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8d86a2]">{service.zone}</p>
              <p className="mt-2 text-base font-semibold text-[#1f1833]">{service.name}</p>
              <p className="mt-1 text-sm text-[#6F6A7C]">{service.entrepreneurName}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#5B2EFF]">Consultar <ArrowRight size={14} /></span>
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

      <section className="grid gap-4 rounded-[1.75rem] border border-[#ece8f7] bg-white p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#F2ECFF] px-2.5 py-1 text-xs font-semibold text-[#5B2EFF]"><Store size={12} /> Para comercios</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1f1833]">Vendé con un catálogo simple y profesional</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#6F6A7C]">Publicá hasta 25 productos en el plan Catálogo o sumá carrito, destacados y promociones con Vender.</p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <button type="button" onClick={toggleRole} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B2EFF] px-5 py-3 text-sm font-semibold text-white">Activar perfil <ArrowRight size={15} /></button>
          <Link href="/niar/planes" className="text-center text-sm font-semibold text-[#5B2EFF]">Ver planes</Link>
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
      <section className="rounded-3xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-5 text-white lg:p-9">
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]"
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
          <article key={m.label} className="rounded-2xl border border-[#ece8f7] bg-white p-4">
            <p className="text-xs text-[#6F6A7C]">{m.label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-xl font-semibold text-[#2B174F]">{m.value}</p>
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
            tone="bg-[#F2ECFF]"
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
            <article key={item.id} className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white">
              <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
              <div className="space-y-1 p-3">
                <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{item.name}</p>
                <p className="text-xs text-[#5B2EFF]">
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
            className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d9cef8] bg-[#FAFAFC] p-3 text-sm font-medium text-[#5B2EFF] hover:bg-[#F2ECFF]"
          >
            <PackagePlus size={20} />
            Nuevo producto
          </Link>
        </div>
      </section>

      {/* PLANS CTA */}
      <section className="grid gap-3 rounded-3xl border border-[#d9cef8] bg-gradient-to-br from-[#F8F4FF] to-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#F2ECFF] px-2.5 py-1 text-xs font-semibold text-[#5B2EFF]">
            <Crown size={12} /> Plan recomendado · Vender
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#1f1833] lg:text-xl">
            Potenciá tu negocio en Niar
          </h2>
          <p className="mt-1 text-sm text-[#6F6A7C]">
            Más visibilidad, carrito simple, promociones y métricas comerciales para convertir mejor.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <Link
            href="/niar/planes"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-sm font-medium text-white"
          >
            Quiero potenciar mi negocio <ArrowRight size={15} />
          </Link>
          <span className="text-center text-xs text-[#9088a3]">Sin pagos ni logística integrados</span>
        </div>
      </section>

      {/* tip */}
      <section className="rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm text-[#6F6A7C]">
        <p className="font-medium text-[#2B174F]">¿Curioso por la otra punta?</p>
        <p className="mt-1">
          Probá la app{" "}
          <Link href="/niar/explorar" className="font-medium text-[#5B2EFF]">
            como visitante
          </Link>{" "}
          para ver cómo te encuentran tus clientes.
          <span className="ml-1 inline-flex items-center gap-1 text-xs text-[#9088a3]">
            <BarChart3 size={12} /> insight: cuanto más completo tu perfil, más pedidos recibís.
          </span>
        </p>
      </section>
    </div>
  );
}
