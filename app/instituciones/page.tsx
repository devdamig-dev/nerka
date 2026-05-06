import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Layers3,
  MapPinned,
  Megaphone,
  MessageCircle,
  ShieldCheck,
  Store,
} from "lucide-react";

const benefits = [
  { title: "Base comercial ordenada por rubro y zona", icon: Layers3 },
  { title: "Perfiles públicos con catálogo y WhatsApp", icon: MessageCircle },
  { title: "Mayor visibilidad para emprendedores locales", icon: Store },
  { title: "Métricas de consultas, visitas y actividad", icon: BarChart3 },
  { title: "Campañas de promoción local", icon: Megaphone },
  { title: "Red escalable por barrios, localidades o corredores", icon: MapPinned },
];

const implementation = [
  "Landing pública de la comunidad con identidad local.",
  "Carga inicial o invitación de emprendedores, comercios y prestadores.",
  "Categorías, zonas, destacados y perfiles verificados.",
  "Panel visual con actividad, visitas y consultas por WhatsApp.",
  "Acompañamiento para lanzamiento, comunicación y adopción.",
];

export default function InstitucionesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] text-[#171321]">
      <header className="border-b border-[#ece8f7] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-[#2B174F]">Niar</Link>
          <nav className="hidden items-center gap-5 text-sm text-[#433d56] md:flex">
            <Link href="/niar/explorar" className="hover:text-[#5B2EFF]">Explorar</Link>
            <Link href="/niar/planes" className="hover:text-[#5B2EFF]">Planes</Link>
            <Link href="/niar" className="hover:text-[#5B2EFF]">Entrar</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[radial-gradient(circle_at_top_left,#efe7ff,transparent_35%),linear-gradient(180deg,#fff,#FAFAFC)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5B2EFF] shadow-sm ring-1 ring-[#ece8f7]">
              <Building2 size={12} /> Para municipios, cámaras y comunidades
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#1f1833] lg:text-6xl">
              Impulsá el comercio local con una vidriera digital propia.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6F6A7C] lg:text-lg">
              Niar ayuda a municipios, cámaras y comunidades a ordenar, visibilizar y medir su ecosistema de emprendedores, comercios y prestadores.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/niar/planes#instituciones" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-5 py-3 text-sm font-semibold text-white">
                Solicitar demo <ArrowRight size={15} />
              </Link>
              <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-[#d9cef8] bg-white px-5 py-3 text-sm font-semibold text-[#5B2EFF]">
                Ver vidriera pública
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ece8f7] bg-white p-5 shadow-xl shadow-[#2B174F]/10">
            <div className="rounded-3xl bg-[#2B174F] p-5 text-white">
              <p className="text-sm font-semibold text-white/70">Red local personalizada</p>
              <h2 className="mt-2 text-2xl font-semibold">Berazategui comercial</h2>
              <p className="mt-2 text-sm text-white/75">Comercios, servicios, ferias y emprendedores organizados por localidad, rubro y estado de verificación.</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["248", "perfiles"],
                ["1.9k", "visitas"],
                ["386", "consultas"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-[#FAFAFC] p-4">
                  <p className="text-2xl font-semibold text-[#2B174F]">{value}</p>
                  <p className="text-xs text-[#6F6A7C]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold text-[#5B2EFF]">Beneficios institucionales</p>
          <h2 className="mt-1 text-3xl font-semibold text-[#1f1833]">Ordená y potenciá el ecosistema comercial de tu zona</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-[#ece8f7] bg-white p-5 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2ECFF] text-[#5B2EFF]"><Icon size={20} /></span>
              <h3 className="mt-4 font-semibold text-[#1f1833]">{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[#5B2EFF]">Implementación</p>
            <h2 className="mt-1 text-3xl font-semibold text-[#1f1833]">Una infraestructura comercial local, no solo una landing</h2>
            <p className="mt-4 text-[#6F6A7C]">
              La red puede activarse por municipio, cámara, feria, comunidad barrial o corredor comercial, con una experiencia pública para vecinos y un modelo operativo para equipos locales.
            </p>
          </div>
          <div className="space-y-3">
            {implementation.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[#ece8f7] bg-[#FAFAFC] p-4 text-sm text-[#433d56]">
                <CheckCircle2 size={18} className="shrink-0 text-[#197a43]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-[2rem] bg-[#2B174F] p-8 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><ShieldCheck size={12} /> Niar institucional</p>
              <h2 className="mt-4 text-3xl font-semibold">Activá la vidriera digital de tu zona.</h2>
              <p className="mt-3 max-w-2xl text-white/75">Solicitá una demo para evaluar alcance, carga inicial, campañas y métricas de la red local.</p>
            </div>
            <Link href="/niar/planes#instituciones" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#2B174F]">
              Quiero implementarlo en mi zona <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
