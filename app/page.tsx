import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { entrepreneurs, popularProducts, categories } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";

const zones = ["Berazategui", "Hudson", "Quilmes", "Zona Sur"];

export default function LandingPage() {
  const featuredEntrepreneurs = entrepreneurs.slice(0, 6);
  const featuredProducts = popularProducts.slice(0, 8);
  const popularServices = entrepreneurs
    .flatMap((business) =>
      business.catalog
        .filter((item) => item.type === "service" && item.available)
        .map((service) => ({ ...service, businessId: business.id, businessName: business.name, zone: business.zone })),
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1f241f]">
      <header className="sticky top-0 z-30 border-b border-[#E6DDD0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-[#2F3A2B]">
            Niar
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-[#4F554B] lg:flex">
            <Link href="/niar/explorar" className="hover:text-[#6E7F63]">Explorar</Link>
            <Link href="#comercios" className="hover:text-[#6E7F63]">Comercios</Link>
            <Link href="#servicios" className="hover:text-[#6E7F63]">Servicios</Link>
            <Link href="/niar/perfil" className="hover:text-[#6E7F63]">Vender en Niar</Link>
            <Link href="/instituciones" className="hover:text-[#6E7F63]">Para municipios/cámaras</Link>
            <Link href="/niar/planes" className="hover:text-[#6E7F63]">Planes</Link>
          </nav>
          <Link
            href="/niar"
            className="inline-flex items-center gap-1 rounded-xl bg-[#6E7F63] px-3 py-2 text-sm font-medium text-white"
          >
            Entrar <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#E6DDD0]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#EEF3EA,transparent_34%),linear-gradient(180deg,#FBF8F3_0%,#FBF8F3_80%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6E7F63] shadow-sm ring-1 ring-[#E6DDD0]">
              <Sparkles size={12} /> Lo local, más cerca.
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#1f241f] lg:text-6xl">
              Encontrá emprendedores, comercios y servicios cerca tuyo.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#666C60] lg:text-lg">
              Niar reúne la oferta local de tu zona en una vidriera digital simple, ordenada y conectada por WhatsApp.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666C60] lg:text-base">
              Descubrí emprendedores, comercios y servicios de tu zona. Explorá catálogos, contactá por WhatsApp y comprá directo a quienes están cerca tuyo.
            </p>

            <div className="mt-7 rounded-3xl border border-[#E6DDD0] bg-white p-3 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-[1fr_210px_auto]">
                <label className="flex items-center gap-2 rounded-2xl bg-[#FBF8F3] px-4 py-3 text-sm text-[#8A8378]">
                  <Search size={18} className="text-[#6E7F63]" />
                  <span>¿Qué estás buscando?</span>
                </label>
                <label className="flex items-center gap-2 rounded-2xl bg-[#FBF8F3] px-4 py-3 text-sm text-[#2F3A2B]">
                  <MapPin size={18} className="text-[#6E7F63]" />
                  <select className="w-full bg-transparent outline-none">
                    {zones.map((zone) => <option key={zone}>{zone}</option>)}
                  </select>
                </label>
                <Link href="/niar/explorar" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6E7F63] px-5 py-3 text-sm font-semibold text-white">
                  Explorar cerca mío <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/niar/perfil" className="inline-flex items-center justify-center rounded-xl border border-[#C8D4BF] bg-white px-4 py-3 text-sm font-semibold text-[#6E7F63]">
                Sumar mi negocio
              </Link>
              <Link href="/instituciones" className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-[#4F554B] hover:bg-white">
                Quiero implementarlo en mi zona
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E6DDD0] bg-white p-4 shadow-xl shadow-[#2F3A2B]/10">
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredEntrepreneurs.slice(0, 4).map((business) => (
                <Link key={business.id} href={`/niar/emprendedores/${business.id}`} className="overflow-hidden rounded-3xl border border-[#E6DDD0] bg-[#FBF8F3]">
                  <img src={business.cover} alt={business.name} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-[#1f241f]">{business.name}</p>
                    <p className="mt-1 text-xs text-[#666C60]">{business.category} · {business.zone}</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#E8FFF5] px-2 py-1 text-[10px] font-semibold text-[#197a43]">
                      <ShieldCheck size={11} /> Verificado
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#6E7F63]">Categorías visuales</p>
            <h2 className="text-2xl font-semibold text-[#1f241f]">Explorá la vidriera local por rubro</h2>
          </div>
          <Link href="/niar/explorar" className="hidden text-sm font-semibold text-[#6E7F63] sm:inline">Ver todo →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 12).map((category) => (
            <Link key={category} href="/niar/explorar" className="rounded-3xl border border-[#E6DDD0] bg-white p-4 text-sm font-semibold text-[#2F3A2B] transition hover:border-[#C8D4BF] hover:bg-[#EEF3EA]">
              <Store className="mb-3 text-[#6E7F63]" size={19} /> {category}
            </Link>
          ))}
        </div>
      </section>

      <section id="comercios" className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Destacados" title="Emprendedores y comercios destacados" cta="Explorar comercios" href="/niar/explorar" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEntrepreneurs.map((business) => (
              <Link key={business.id} href={`/niar/emprendedores/${business.id}`} className="overflow-hidden rounded-3xl border border-[#E6DDD0] bg-[#FBF8F3] shadow-sm transition hover:shadow-md">
                <img src={business.cover} alt={business.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#1f241f]">{business.name}</p>
                      <p className="text-sm text-[#666C60]">{business.category} · {business.zone}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2F3A2B]"><Star size={14} className="fill-[#ffb547] text-[#ffb547]" /> {business.rating}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-[#666C60]">{business.about}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionHeading eyebrow="Productos" title="Productos populares cerca tuyo" cta="Ver productos" href="/niar/explorar?type=Productos" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/niar/emprendedores/${product.entrepreneurId}`} className="overflow-hidden rounded-3xl border border-[#E6DDD0] bg-white shadow-sm transition hover:shadow-md">
              <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="line-clamp-1 font-semibold text-[#1f241f]">{product.name}</p>
                <p className="line-clamp-1 text-xs text-[#666C60]">{product.entrepreneurName}</p>
                <p className="mt-2 text-sm font-semibold text-[#6E7F63]">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="servicios" className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Servicios" title="Servicios populares de tu zona" cta="Ver servicios" href="/niar/explorar?type=Servicios" />
          <div className="grid gap-4 md:grid-cols-3">
            {popularServices.map((service) => (
              <Link key={`${service.businessId}-${service.id}`} href={`/niar/emprendedores/${service.businessId}`} className="rounded-3xl border border-[#E6DDD0] bg-[#FBF8F3] p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6E7F63]">{service.zone}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#1f241f]">{service.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#666C60]">{service.description}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#6E7F63]">Consultar por WhatsApp <MessageCircle size={14} /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionHeading eyebrow="Cómo funciona" title="Una experiencia simple para cada actor local" />
        <div className="grid gap-4 lg:grid-cols-3">
          <HowCard icon={<ShoppingBag size={20} />} title="Para compradores" items={["Buscan por rubro, producto o zona", "Ven catálogos públicos", "Consultan y compran directo por WhatsApp"]} />
          <HowCard icon={<Store size={20} />} title="Para emprendedores" items={["Activan perfil y catálogo", "Muestran zona, horarios y modalidades", "Reciben consultas sin fricción"]} />
          <HowCard icon={<Building2 size={20} />} title="Para municipios y cámaras" items={["Ordenan la base comercial", "Impulsan campañas locales", "Miden visitas, consultas y actividad"]} />
        </div>
      </section>

      <section className="bg-[#2F3A2B] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><Users size={12} /> Infraestructura comercial local</p>
            <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">Una red comercial local para municipios, cámaras y comunidades</h2>
            <p className="mt-4 max-w-2xl text-white/80">
              Niar permite ordenar perfiles, catálogos, rubros, zonas, consultas y actividad comercial en una vidriera digital pública lista para escalar por barrios, localidades o corredores.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Perfiles verificados", "Categorías y zonas", "Campañas y destacados", "Métricas de actividad"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold"><CheckCircle2 className="mb-2" size={18} /> {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center">
        <h2 className="text-3xl font-semibold text-[#1f241f] lg:text-5xl">Activá la vidriera digital de tu zona.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#666C60]">Sumá comercios, servicios y emprendedores a una red local ordenada, visible y conectada por WhatsApp.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/instituciones" className="rounded-xl bg-[#6E7F63] px-5 py-3 text-sm font-semibold text-white">Solicitar demo</Link>
          <Link href="/niar/perfil" className="rounded-xl border border-[#C8D4BF] bg-white px-5 py-3 text-sm font-semibold text-[#6E7F63]">Sumar mi negocio</Link>
        </div>
      </section>

      <footer className="border-t border-[#E6DDD0] bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-[#666C60] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Niar — Lo local, más cerca.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/niar/explorar" className="hover:text-[#6E7F63]">Explorar</Link>
            <Link href="/niar/perfil" className="hover:text-[#6E7F63]">Vender en Niar</Link>
            <Link href="/instituciones" className="hover:text-[#6E7F63]">Municipios y cámaras</Link>
            <Link href="/niar/planes" className="hover:text-[#6E7F63]">Planes</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title, cta, href }: { eyebrow: string; title: string; cta?: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[#6E7F63]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#1f241f] lg:text-3xl">{title}</h2>
      </div>
      {cta && href ? <Link href={href} className="hidden text-sm font-semibold text-[#6E7F63] sm:inline">{cta} →</Link> : null}
    </div>
  );
}

function HowCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-[#E6DDD0] bg-white p-6 shadow-sm">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF3EA] text-[#6E7F63]">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold text-[#1f241f]">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-[#666C60]">
        {items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#197a43]" /> {item}</li>)}
      </ul>
    </article>
  );
}
