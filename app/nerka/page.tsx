"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Compass,
  Crown,
  Heart,
  ImagePlus,
  MessageCircle,
  PackagePlus,
  Send,
  Sparkles,
  Store,
} from "lucide-react";
import { EntrepreneurCard, EventCard } from "@/components/nerka/cards";
import {
  CategoryChips,
  NerkaHeader,
  QuickActionCard,
  SearchBar,
  SectionTitle,
} from "@/components/nerka/ui";
import { categories, entrepreneurs, events, popularProducts, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";

export default function NerkaHomePage() {
  const { isEntrepreneur, hydrated } = useRole();

  return (
    <main>
      <NerkaHeader />
      {/* Evita hydration mismatch: hasta hidratar localStorage, mostramos visitor (default). */}
      {!hydrated || !isEntrepreneur ? <VisitorHome /> : <EntrepreneurHome />}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VISITOR HOME
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
    .slice(0, 6);

  return (
    <div className="space-y-7 px-4 py-4 lg:space-y-10 lg:px-8 lg:py-8">
      {/* HERO visitor */}
      <section className="space-y-4 rounded-3xl bg-gradient-to-br from-[#5B2EFF] via-[#3f1bbd] to-[#2B174F] p-5 text-white lg:p-9">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <Sparkles size={12} /> Hola{user.name ? `, ${user.name}` : ""} · Marketplace local
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight lg:text-4xl">
            Descubrí emprendedores cerca tuyo
          </h1>
          <p className="mt-2 text-sm text-white/90 lg:text-base">
            Recorré catálogos, agregá productos al carrito y consultá directo por WhatsApp o
            mensajería interna. Sin pagos online, sin complicaciones.
          </p>
        </div>
        <SearchBar placeholder="Buscá por rubro, nombre o producto" />
        <CategoryChips items={["Gastronomía", "Moda", "Belleza", "Hogar y deco", "Regalería", "Servicios", "Mascotas", "Más"]} />
      </section>

      {/* QUICK ACTIONS visitor */}
      <section>
        <SectionTitle title="Atajos rápidos" subtitle="Lo que más se usa en Nerka" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <QuickActionCard
            href="/nerka/explorar"
            title="Explorar emprendedores"
            description="Buscá por rubro y zona"
            tone="bg-[#F2ECFF]"
            icon={<Compass size={18} />}
          />
          <QuickActionCard
            href="/nerka/explorar?type=Productos"
            title="Ver productos"
            description="Lo más pedido cerca"
            tone="bg-[#FFEFE7]"
            icon={<ImagePlus size={18} />}
          />
          <QuickActionCard
            href="/nerka/favoritos"
            title="Mis favoritos"
            description="Tus tiendas guardadas"
            tone="bg-[#FFEAF1]"
            icon={<Heart size={18} />}
          />
          <QuickActionCard
            href="/nerka/mensajes"
            title="Mis mensajes"
            description="Conversaciones abiertas"
            tone="bg-[#E8FFF5]"
            icon={<MessageCircle size={18} />}
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <SectionTitle title="Categorías" subtitle="Encontrá tu rubro" cta="Ver todas" href="/nerka/explorar" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.slice(0, 14).map((category) => (
            <Link
              key={category}
              href="/nerka/explorar"
              className="rounded-2xl border border-[#ece8f7] bg-white p-3 text-center text-sm font-medium text-[#2B174F] transition hover:border-[#d9cef8] hover:bg-[#F2ECFF]"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ENTREPRENEURS */}
      <section>
        <SectionTitle
          title="Tiendas destacadas en tu zona"
          subtitle="Verificadas, responden rápido"
          cta="Ver todos"
          href="/nerka/explorar"
        />
        <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible xl:grid-cols-4">
          {entrepreneurs.slice(0, 6).map((entrepreneur) => (
            <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} horizontal />
          ))}
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section>
        <SectionTitle title="Productos populares cerca tuyo" cta="Ver más" href="/nerka/explorar" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
          {popularProducts.slice(0, 10).map((product) => (
            <Link
              key={product.id}
              href={`/nerka/emprendedores/${product.entrepreneurId}`}
              className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md"
            >
              <img src={product.image} alt={product.name} className="h-28 w-full object-cover" />
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{product.name}</p>
                <p className="line-clamp-1 text-xs text-[#6F6A7C]">{product.entrepreneurName}</p>
                <p className="mt-1 text-sm font-semibold text-[#5B2EFF]">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section>
        <SectionTitle title="Servicios populares" subtitle="Coordinás detalles por mensaje" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/nerka/emprendedores/${s.entrepreneurId}`}
              className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-medium text-[#6F6A7C]">{s.entrepreneurName}</p>
              <p className="mt-1 text-sm font-semibold text-[#1f1833]">{s.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-[#6F6A7C]">{s.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#5B2EFF]">
                Ver detalle <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAVORITES (if any) */}
      {favoriteProfiles.length ? (
        <section>
          <SectionTitle title="Tus favoritos" cta="Ver todos" href="/nerka/favoritos" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProfiles.map((e) => (
              <EntrepreneurCard key={e.id} entrepreneur={e} />
            ))}
          </div>
        </section>
      ) : null}

      {/* SECONDARY: become entrepreneur */}
      <section className="grid gap-3 rounded-3xl border border-[#ece8f7] bg-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
        <div>
          <p className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E8] px-2.5 py-1 text-xs font-semibold text-[#9b5a00]">
            <Store size={12} /> Para emprendedores
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#1f1833] lg:text-xl">
            ¿Tenés un emprendimiento? Activá tu perfil comercial
          </h2>
          <p className="mt-1 text-sm text-[#6F6A7C]">
            Cargá tus productos, compartí el link de tu tienda y empezá a recibir pedidos por
            WhatsApp en minutos.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <button
            type="button"
            onClick={toggleRole}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-sm font-medium text-white"
          >
            Activar mi perfil <ArrowRight size={15} />
          </button>
          <Link href="/nerka/planes" className="text-center text-xs font-medium text-[#5B2EFF]">
            Ver planes →
          </Link>
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <SectionTitle title="Ferias y showrooms próximos" cta="Ver agenda" href="/nerka/eventos" />
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {events.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
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
            href={`/nerka/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]"
          >
            Ver mi tienda
          </Link>
          <Link
            href="/nerka/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <Link
            href="/nerka/mensajes"
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
            href="/nerka/perfil/nuevo-producto"
            title="Cargar producto"
            description="Sumá ítems a tu catálogo"
            tone="bg-[#F2ECFF]"
            icon={<PackagePlus size={18} />}
          />
          <QuickActionCard
            href="/nerka/perfil/catalogo"
            title="Editar catálogo"
            description="Gestioná disponibilidad"
            tone="bg-[#FFEFE7]"
            icon={<ImagePlus size={18} />}
          />
          <QuickActionCard
            href="/nerka/mensajes"
            title="Pedidos / mensajes"
            description="Respondé a tus clientes"
            tone="bg-[#E8FFF5]"
            icon={<Send size={18} />}
          />
          <QuickActionCard
            href="/nerka/planes"
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
          href="/nerka/perfil/catalogo"
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
            href="/nerka/perfil/nuevo-producto"
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
            <Crown size={12} /> Planes Pro y Negocio · Próximamente
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[#1f1833] lg:text-xl">
            Potenciá tu negocio en Nerka
          </h2>
          <p className="mt-1 text-sm text-[#6F6A7C]">
            Más visibilidad, métricas y herramientas para crecer. Sumate a la lista de
            interesados y te avisamos cuando esté disponible.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <Link
            href="/nerka/planes"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-sm font-medium text-white"
          >
            Quiero potenciar mi negocio <ArrowRight size={15} />
          </Link>
          <span className="text-center text-xs text-[#9088a3]">Sin pagos online por ahora</span>
        </div>
      </section>

      {/* AI placeholder */}
      <section className="overflow-hidden rounded-3xl border border-[#ece8f7] bg-white">
        <div className="flex items-start gap-3 p-5 lg:p-7">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#5B2EFF] text-white">
            <Sparkles size={18} />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#2B174F]">Asistente IA</p>
              <span className="rounded-full bg-[#F2ECFF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#5B2EFF]">
                Próximamente
              </span>
            </div>
            <p className="mt-1 text-sm text-[#433d56]">
              Mejorá tus publicaciones en segundos: títulos, descripciones y precios sugeridos
              según tu rubro y zona.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { t: "Generar descripción", d: "para un producto" },
                { t: "Sugerir precios", d: "según mercado" },
                { t: "Crear publicación", d: "para redes" },
              ].map((c) => (
                <button
                  key={c.t}
                  disabled
                  className="cursor-not-allowed rounded-xl border border-[#ece8f7] bg-[#FAFAFC] px-3 py-2 text-left text-xs text-[#433d56]"
                >
                  <p className="font-medium text-[#2B174F]">{c.t}</p>
                  <p className="text-[#6F6A7C]">{c.d}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* tip */}
      <section className="rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm text-[#6F6A7C]">
        <p className="font-medium text-[#2B174F]">¿Curioso por la otra punta?</p>
        <p className="mt-1">
          Probá la app{" "}
          <Link href="/nerka/explorar" className="font-medium text-[#5B2EFF]">
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
