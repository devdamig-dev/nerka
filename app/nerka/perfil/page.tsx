"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChartBar,
  CheckCircle2,
  ExternalLink,
  Eye,
  Heart,
  Inbox,
  MessageCircle,
  PackagePlus,
  Pencil,
  ShoppingBag,
  Sparkles,
  Store,
} from "lucide-react";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { SectionTitle } from "@/components/nerka/ui";
import { useRole } from "@/lib/role-context";

const setupChecklist = [
  { id: "info", label: "Datos del emprendimiento", done: true },
  { id: "cover", label: "Foto de portada y logo", done: true },
  { id: "products", label: "Subir 3 productos al catálogo", done: true },
  { id: "whatsapp", label: "Conectar WhatsApp para pedidos", done: true },
  { id: "share", label: "Compartir el link de tu tienda", done: false },
];

const fakeOrders = [
  { id: "ord-1", buyer: "Sofía R.", channel: "WhatsApp" as const, total: 78000, items: 1, status: "Nuevo" },
  { id: "ord-2", buyer: "Carla M.", channel: "Mensaje" as const, total: 36500, items: 2, status: "Confirmado" },
  { id: "ord-3", buyer: "Micaela T.", channel: "WhatsApp" as const, total: 18500, items: 1, status: "Entregado" },
];

export default function PerfilPage() {
  const { isEntrepreneur, hydrated } = useRole();
  // Hasta hidratar localStorage, mostramos visitante por defecto.
  if (!hydrated || !isEntrepreneur) return <VisitorAccount />;
  return <EntrepreneurDashboard />;
}

// ─────────────────────────────────────────────────────────────────────
// VISITOR — Mi cuenta
// ─────────────────────────────────────────────────────────────────────
function VisitorAccount() {
  const { user, toggleRole } = useRole();
  const favorites = entrepreneurs.filter((e) => user.favorites.includes(e.id));

  return (
    <main className="px-4 py-5 pb-24 lg:px-8 lg:py-8 lg:pb-10">
      <section className="rounded-3xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-5 text-white lg:p-8">
        <p className="text-xs uppercase tracking-wide opacity-80">Mi cuenta</p>
        <h1 className="mt-1 text-2xl font-semibold lg:text-3xl">Hola, {user.name} 👋</h1>
        <p className="mt-1 text-sm opacity-90">
          Tus tiendas favoritas, mensajes y pedidos en un solo lugar.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link href="/nerka/favoritos" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]">
            <Heart size={15} /> Mis favoritos
          </Link>
          <Link href="/nerka/mensajes" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
            <MessageCircle size={15} /> Mensajes
          </Link>
          <Link href="/nerka/carrito" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
            <ShoppingBag size={15} /> Mi carrito
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* Favoritos */}
          <section>
            <SectionTitle
              title="Tus tiendas guardadas"
              subtitle={favorites.length ? `${favorites.length} tienda${favorites.length > 1 ? "s" : ""}` : "Todavía no guardaste ninguna"}
              cta="Explorar más"
              href="/nerka/explorar"
            />
            {favorites.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {favorites.slice(0, 4).map((e) => (
                  <Link
                    key={e.id}
                    href={`/nerka/emprendedores/${e.id}`}
                    className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md"
                  >
                    <img src={e.cover} alt={e.name} className="h-28 w-full object-cover" />
                    <div className="p-3">
                      <p className="text-sm font-semibold text-[#1f1833]">{e.name}</p>
                      <p className="text-xs text-[#6F6A7C]">{e.category} · {e.zone}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#ddd5f1] bg-white p-5 text-center text-sm text-[#6F6A7C]">
                Tocá el corazón en cualquier perfil para guardarlo acá.
              </div>
            )}
          </section>

          {/* Become entrepreneur */}
          <section className="grid gap-3 rounded-3xl border border-[#d9cef8] bg-gradient-to-br from-[#F8F4FF] to-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
            <div>
              <p className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E8] px-2.5 py-1 text-xs font-semibold text-[#9b5a00]">
                <Store size={12} /> Para emprendedores
              </p>
              <h2 className="mt-2 text-lg font-semibold text-[#1f1833] lg:text-xl">
                ¿Tenés un emprendimiento?
              </h2>
              <p className="mt-1 text-sm text-[#6F6A7C]">
                Activá tu perfil comercial. Cargá productos y empezá a recibir pedidos por
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
        </div>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <p className="text-sm font-semibold text-[#2B174F]">Mis datos</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-[#6F6A7C]">Nombre</span><strong className="text-[#1f1833]">{user.name}</strong></li>
              <li className="flex justify-between"><span className="text-[#6F6A7C]">Zona</span><strong className="text-[#1f1833]">{user.zone}</strong></li>
              <li className="flex justify-between"><span className="text-[#6F6A7C]">Tipo</span><strong className="text-[#5B2EFF]">Visitante</strong></li>
            </ul>
          </section>
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5 text-sm">
            <p className="font-semibold text-[#2B174F]">Más</p>
            <div className="mt-3 space-y-1">
              <Link href="/nerka/eventos" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">Ferias y eventos</Link>
              <Link href="/nerka/solicitudes" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">Mis solicitudes</Link>
              <Link href="/nerka/planes" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">Planes</Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ENTREPRENEUR — Mi negocio
// ─────────────────────────────────────────────────────────────────────
function EntrepreneurDashboard() {
  const { user } = useRole();
  const profile = getEntrepreneurById(user.businessProfileId ?? "dulce-tentacion") ?? entrepreneurs[0];
  const completed = setupChecklist.filter((i) => i.done).length;
  const totalSteps = setupChecklist.length;
  const productCount = profile.catalog.filter((c) => c.type === "product").length;
  const serviceCount = profile.catalog.filter((c) => c.type === "service").length;

  return (
    <main className="px-4 py-5 pb-24 lg:px-8 lg:py-8 lg:pb-8">
      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-5 text-white lg:p-8">
        <p className="text-xs uppercase tracking-wide opacity-80">Mi negocio</p>
        <h1 className="mt-1 text-2xl font-semibold lg:text-3xl">{profile.name}</h1>
        <p className="mt-1 text-sm opacity-90">
          Gestioná tu catálogo, pedidos, mensajes y tu plan en Nerka.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link
            href={`/nerka/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]"
          >
            <Eye size={15} /> Ver mi tienda
          </Link>
          <Link
            href="/nerka/perfil/nuevo-producto"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <PackagePlus size={15} /> Cargar producto
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <ExternalLink size={15} /> Compartir link
          </button>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {/* CHECKLIST */}
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2B174F]">Configuración inicial</p>
                <p className="text-xs text-[#6F6A7C]">{completed} de {totalSteps} listos</p>
              </div>
              <span className="text-sm font-semibold text-[#5B2EFF]">
                {Math.round((completed / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#F2ECFF]">
              <div className="h-full bg-[#5B2EFF] transition-all" style={{ width: `${(completed / totalSteps) * 100}%` }} />
            </div>
            <ul className="mt-4 space-y-2">
              {setupChecklist.map((item) => (
                <li key={item.id} className="flex items-center gap-3 rounded-xl border border-[#f1ecfb] bg-[#FAFAFC] px-3 py-2 text-sm">
                  <CheckCircle2 size={16} className={item.done ? "text-[#197a43]" : "text-[#c9c2db]"} />
                  <span className={item.done ? "text-[#1f1833] line-through" : "text-[#433d56]"}>{item.label}</span>
                  {!item.done ? (
                    <button className="ml-auto text-xs font-medium text-[#5B2EFF]">Hacer →</button>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          {/* AI PLACEHOLDER */}
          <section className="overflow-hidden rounded-2xl border border-[#d9cef8] bg-gradient-to-br from-[#F8F4FF] to-white">
            <div className="flex items-start gap-3 p-5">
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
                  Mejorá tus publicaciones en segundos: títulos, descripciones y precios.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    { t: "Generar descripción", d: "para un producto" },
                    { t: "Sugerir precios", d: "según mercado" },
                    { t: "Crear publicación", d: "para redes" },
                  ].map((c) => (
                    <button key={c.t} disabled className="cursor-not-allowed rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-left text-xs text-[#433d56]">
                      <p className="font-medium text-[#2B174F]">{c.t}</p>
                      <p className="text-[#6F6A7C]">{c.d}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CATALOG */}
          <section>
            <SectionTitle
              title="Mi catálogo"
              subtitle={`${productCount} productos · ${serviceCount} servicios`}
              cta="Ver catálogo completo"
              href="/nerka/perfil/catalogo"
            />
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {profile.catalog.slice(0, 5).map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white">
                  <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{item.name}</p>
                    <p className="text-xs text-[#5B2EFF]">{item.price ? formatPrice(item.price) : "A consultar"}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.available ? "bg-[#E7F9EE] text-[#197a43]" : "bg-[#f1f1f1] text-[#8a8a8a]"}`}>
                        {item.available ? "Disponible" : "Pausado"}
                      </span>
                      <button className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5B2EFF]"><Pencil size={11} /> Editar</button>
                    </div>
                  </div>
                </article>
              ))}
              <Link
                href="/nerka/perfil/nuevo-producto"
                className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d9cef8] bg-[#FAFAFC] p-3 text-sm font-medium text-[#5B2EFF] hover:bg-[#F2ECFF]"
              >
                <PackagePlus size={20} />
                Agregar producto
              </Link>
            </div>
          </section>

          {/* RECENT ORDERS */}
          <section id="estadisticas">
            <SectionTitle
              title="Pedidos recientes"
              subtitle="Recibidos por WhatsApp y mensajes internos"
              cta="Ver todos"
              href="/nerka/mensajes"
            />
            <div className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white">
              <ul className="divide-y divide-[#f1ecfb]">
                {fakeOrders.map((order) => (
                  <li key={order.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2ECFF] text-[#5B2EFF]"><Inbox size={16} /></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1f1833]">
                        {order.buyer} · {order.items} {order.items === 1 ? "producto" : "productos"}
                      </p>
                      <p className="text-xs text-[#6F6A7C]">vía {order.channel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#2B174F]">{formatPrice(order.total)}</p>
                      <p className="text-[11px] text-[#6F6A7C]">{order.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* SIDE */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <p className="inline-flex items-center gap-1 text-xs font-medium text-[#6F6A7C]"><ChartBar size={13} /> Esta semana</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center justify-between"><span className="text-[#6F6A7C]">Visitas a tu tienda</span><strong className="text-[#1f1833]">128</strong></li>
              <li className="flex items-center justify-between"><span className="text-[#6F6A7C]">Pedidos recibidos</span><strong className="text-[#1f1833]">7</strong></li>
              <li className="flex items-center justify-between"><span className="text-[#6F6A7C]">Total en pedidos</span><strong className="text-[#5B2EFF]">{formatPrice(196500)}</strong></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#d9cef8] bg-gradient-to-br from-[#F8F4FF] to-white p-5">
            <p className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#5B2EFF]">
              <Sparkles size={11} /> Plan actual: Gratis
            </p>
            <p className="mt-2 text-sm font-semibold text-[#2B174F]">
              Potenciá tu negocio
            </p>
            <p className="mt-1 text-xs text-[#6F6A7C]">
              Más visibilidad, métricas y herramientas para crecer.
            </p>
            <Link
              href="/nerka/planes"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
            >
              Ver planes <ArrowRight size={14} />
            </Link>
          </section>

          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <p className="text-sm font-semibold text-[#2B174F]">Tu tienda</p>
            <p className="mt-2 text-xs text-[#6F6A7C]">Compartí este link en redes para recibir más pedidos.</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#ece8f7] bg-[#FAFAFC] px-3 py-2 text-xs text-[#433d56]">
              <Store size={13} className="text-[#5B2EFF]" />
              <span className="truncate">nerka.app/nerka/emprendedores/{profile.id}</span>
            </div>
            <Link
              href={`/nerka/emprendedores/${profile.id}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-sm font-medium text-[#5B2EFF]"
            >
              Abrir mi tienda <ArrowRight size={14} />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
