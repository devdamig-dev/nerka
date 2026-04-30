import Link from "next/link";
import { ArrowRight, MessageCircle, PackagePlus, Sparkles, Store } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] text-[#171321]">
      <header className="border-b border-[#ece8f7] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <p className="text-xl font-semibold tracking-tight text-[#2B174F]">nerka</p>
          <Link
            href="/nerka"
            className="inline-flex items-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
          >
            Abrir app <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="px-5 py-12 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-1 rounded-full bg-[#F2ECFF] px-3 py-1 text-xs font-semibold text-[#5B2EFF]">
            <Sparkles size={12} /> Marketplace local · Argentina
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#1f1833] lg:text-5xl">
            Empezá a vender hoy, <span className="text-[#5B2EFF]">sin saber nada técnico</span>.
          </h1>
          <p className="mt-3 text-base text-[#6F6A7C] lg:text-lg">
            Nerka te ayuda a crear tu perfil, mostrar tu catálogo y recibir pedidos por WhatsApp.
            Sin pagos online, sin envíos complicados. Tu negocio, tu manera.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/nerka/perfil"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-5 py-3 text-sm font-medium text-white sm:w-auto"
            >
              <Store size={16} /> Crear mi tienda
            </Link>
            <Link
              href="/nerka"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9cef8] bg-white px-5 py-3 text-sm font-medium text-[#5B2EFF] sm:w-auto"
            >
              Explorar emprendimientos
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            {
              icon: <PackagePlus size={18} />,
              title: "Cargá tus productos",
              desc: "Sumá fotos, precios y disponibilidad en minutos.",
            },
            {
              icon: <Store size={18} />,
              title: "Compartí tu tienda",
              desc: "Un link único para mostrar tu catálogo en redes.",
            },
            {
              icon: <MessageCircle size={18} />,
              title: "Recibí pedidos",
              desc: "WhatsApp o mensaje interno, vos elegís.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#ece8f7] bg-white p-5">
              <div className="inline-flex rounded-xl bg-[#F2ECFF] p-2 text-[#5B2EFF]">{item.icon}</div>
              <p className="mt-3 text-sm font-semibold text-[#1f1833]">{item.title}</p>
              <p className="mt-1 text-sm text-[#6F6A7C]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#ece8f7] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-6 text-center text-xs text-[#9088a3]">
          Hecho con ♥ para emprendedores locales.
        </div>
      </footer>
    </main>
  );
}
