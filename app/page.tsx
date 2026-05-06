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
    <main className="min-h-screen bg-[#FAFAFC] text-[#171321]">
      <header className="sticky top-0 z-30 border-b border-[#ece8f7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-[#2B174F]">
            Niar
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-[#433d56] lg:flex">
            <Link href="/niar/explorar" className="hover:text-[#5B2EFF]">Explorar</Link>
            <Link href="#comercios" className="hover:text-[#5B2EFF]">Comercios</Link>
            <Link href="#servicios" className="hover:text-[#5B2EFF]">Servicios</Link>
            <Link href="/niar/perfil" className="hover:text-[#5B2EFF]">Vender en Niar</Link>
            <Link href="/instituciones" className="hover:text-[#5B2EFF]">Para municipios/cámaras</Link>
            <Link href="/niar/planes" className="hover:text-[#5B2EFF]">Planes</Link>
          </nav>
          <Link
            href="/niar"
            className="inline-flex items-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
          >
            Entrar <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#ece8f7]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#efe7ff,transparent_34%),linear-gradient(180deg,#F8F4FF_0%,#FAFAFC_80%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5B2EFF] shadow-sm ring-1 ring-[#ece8f7]">
              <Sparkles size={12} /> Lo local, más cerca.
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#1f1833] lg:text-6xl">
              Encontrá emprendedores, comercios y servicios cerca tuyo.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6F6A7C] lg:text-lg">
              Niar reúne la oferta local de tu zona en una vidriera digital simple, ordenada y conectada por WhatsApp.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6F6A7C] lg:text-base">
              Descubrí emprendedores, comercios y servicios de tu zona. Explorá catálogos, contactá por WhatsApp y comprá directo a quienes están cerca tuyo.
            </p>

            <div className="mt-7 rounded-3xl border border-[#ece8f7] bg-white p-3 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-[1fr_210px_auto]">
                <label className="flex items-center gap-2 rounded-2xl bg-[#FAFAFC] px-4 py-3 text-sm text-[#9088a3]">
                  <Search size={18} className="text-[#5B2EFF]" />
                  <span>¿Qué estás buscando?</span>
                </label>
                <label className="flex items-center gap-2 rounded-2xl bg-[#FAFAFC] px-4 py-3 text-sm text-[#2B174F]">
                  <MapPin size={18} className="text-[#5B2EFF]" />
                  <select className="w-full bg-transparent outline-none">
                    {zones.map((zone) => <option key={zone}>{zone}</option>)}
                  </select>
                </label>
                <Link href="/niar/explorar" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B2EFF] px-5 py-3 text-sm font-semibold text-white">
                  Explorar cerca mío <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/niar/perfil" className="inline-flex items-center justify-center rounded-xl border border-[#d9cef8] bg-white px-4 py-3 text-sm font-semibold text-[#5B2EFF]">
                Sumar mi negocio
              </Link>
              <Link href="/instituciones" className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-[#433d56] hover:bg-white">
                Quiero implementarlo en mi zona
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ece8f7] bg-white p-4 shadow-xl shadow-[#2B174F]/10">
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredEntrepreneurs.slice(0, 4).map((business) => (
                <Link key={business.id} href={`/niar/emprendedores/${business.id}`} className="overflow-hidden rounded-3xl border border-[#ece8f7] bg-[#FAFAFC]">
                  <img src={business.cover} alt={business.name} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-[#1f1833]">{business.name}</p>
                    <p className="mt-1 text-xs text-[#6F6A7C]">{business.category} · {business.zone}</p>
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
            <p className="text-sm font-semibold text-[#5B2EFF]">Categorías visuales</p>
            <h2 className="text-2xl font-semibold text-[#1f1833]">Explorá la vidriera local por rubro</h2>
          </div>
          <Link href="/niar/explorar" className="hidden text-sm font-semibold text-[#5B2EFF] sm:inline">Ver todo →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 12).map((category) => (
            <Link key={category} href="/niar/explorar" className="rounded-3xl border border-[#ece8f7] bg-white p-4 text-sm font-semibold text-[#2B174F] transition hover:border-[#d9cef8] hover:bg-[#F2ECFF]">
              <Store className="mb-3 text-[#5B2EFF]" size={19} /> {category}
            </Link>
          ))}
        </div>
      </section>

      <section id="comercios" className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Destacados" title="Emprendedores y comercios destacados" cta="Explorar comercios" href="/niar/explorar" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEntrepreneurs.map((business) => (
              <Link key={business.id} href={`/niar/emprendedores/${business.id}`} className="overflow-hidden rounded-3xl border border-[#ece8f7] bg-[#FAFAFC] shadow-sm transition hover:shadow-md">
                <img src={business.cover} alt={business.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#1f1833]">{business.name}</p>
                      <p className="text-sm text-[#6F6A7C]">{business.category} · {business.zone}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2B174F]"><Star size={14} className="fill-[#ffb547] text-[#ffb547]" /> {business.rating}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-[#6F6A7C]">{business.about}</p>
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
            <Link key={product.id} href={`/niar/emprendedores/${product.entrepreneurId}`} className="overflow-hidden rounded-3xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md">
              <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="line-clamp-1 font-semibold text-[#1f1833]">{product.name}</p>
                <p className="line-clamp-1 text-xs text-[#6F6A7C]">{product.entrepreneurName}</p>
                <p className="mt-2 text-sm font-semibold text-[#5B2EFF]">{formatPrice(product.price)}</p>
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
              <Link key={`${service.businessId}-${service.id}`} href={`/niar/emprendedores/${service.businessId}`} className="rounded-3xl border border-[#ece8f7] bg-[#FAFAFC] p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5B2EFF]">{service.zone}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#1f1833]">{service.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#6F6A7C]">{service.description}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#5B2EFF]">Consultar por WhatsApp <MessageCircle size={14} /></p>
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

      <section className="bg-[#2B174F] py-14 text-white">
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
        <h2 className="text-3xl font-semibold text-[#1f1833] lg:text-5xl">Activá la vidriera digital de tu zona.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#6F6A7C]">Sumá comercios, servicios y emprendedores a una red local ordenada, visible y conectada por WhatsApp.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/instituciones" className="rounded-xl bg-[#5B2EFF] px-5 py-3 text-sm font-semibold text-white">Solicitar demo</Link>
          <Link href="/niar/perfil" className="rounded-xl border border-[#d9cef8] bg-white px-5 py-3 text-sm font-semibold text-[#5B2EFF]">Sumar mi negocio</Link>
        </div>
      </section>

      <footer className="border-t border-[#ece8f7] bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-[#6F6A7C] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Niar — Lo local, más cerca.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/niar/explorar" className="hover:text-[#5B2EFF]">Explorar</Link>
            <Link href="/niar/perfil" className="hover:text-[#5B2EFF]">Vender en Niar</Link>
            <Link href="/instituciones" className="hover:text-[#5B2EFF]">Municipios y cámaras</Link>
            <Link href="/niar/planes" className="hover:text-[#5B2EFF]">Planes</Link>
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
        <p className="text-sm font-semibold text-[#5B2EFF]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#1f1833] lg:text-3xl">{title}</h2>
      </div>
      {cta && href ? <Link href={href} className="hidden text-sm font-semibold text-[#5B2EFF] sm:inline">{cta} →</Link> : null}
    </div>
  );
}

function HowCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-[#ece8f7] bg-white p-6 shadow-sm">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2ECFF] text-[#5B2EFF]">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold text-[#1f1833]">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-[#6F6A7C]">
        {items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#197a43]" /> {item}</li>)}
      </ul>
    </article>
  );
}
