import Link from "next/link";
import {
  ArrowRight,
  ChartBar,
  CheckCircle2,
  ExternalLink,
  Eye,
  Inbox,
  PackagePlus,
  Pencil,
  Sparkles,
  Store,
} from "lucide-react";
import { entrepreneurs } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";
import { SectionTitle } from "@/components/nerka/ui";

// Mock: el "yo" del emprendedor logueado es la primera tienda del seed.
// Cuando exista backend, esto vendrá de la sesión.
const mySellerProfile = entrepreneurs[0];

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
  const completed = setupChecklist.filter((i) => i.done).length;
  const totalSteps = setupChecklist.length;
  const profile = mySellerProfile;
  const productCount = profile.catalog.filter((c) => c.type === "product").length;
  const serviceCount = profile.catalog.filter((c) => c.type === "service").length;

  return (
    <main className="px-4 py-5 pb-24 lg:px-8 lg:py-8 lg:pb-8">
      {/* HERO BANNER */}
      <section className="rounded-3xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-5 text-white lg:p-7">
        <p className="text-xs uppercase tracking-wide opacity-80">Mi negocio</p>
        <h1 className="mt-1 text-2xl font-semibold lg:text-3xl">Hola, {profile.name} 👋</h1>
        <p className="mt-1 text-sm opacity-90">
          Gestioná tu catálogo, recibí pedidos y compartí tu tienda.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link
            href={`/nerka/emprendedores/${profile.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2B174F]"
          >
            <Eye size={15} /> Ver mi tienda
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
          >
            <PackagePlus size={15} /> Cargar producto
          </button>
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
          {/* SETUP CHECKLIST */}
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2B174F]">Configuración inicial</p>
                <p className="text-xs text-[#6F6A7C]">
                  {completed} de {totalSteps} listos · empezá a vender hoy
                </p>
              </div>
              <span className="text-sm font-semibold text-[#5B2EFF]">
                {Math.round((completed / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#F2ECFF]">
              <div
                className="h-full bg-[#5B2EFF] transition-all"
                style={{ width: `${(completed / totalSteps) * 100}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2">
              {setupChecklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-[#f1ecfb] bg-[#FAFAFC] px-3 py-2 text-sm"
                >
                  <CheckCircle2
                    size={16}
                    className={item.done ? "text-[#197a43]" : "text-[#c9c2db]"}
                  />
                  <span className={item.done ? "text-[#1f1833] line-through" : "text-[#433d56]"}>
                    {item.label}
                  </span>
                  {!item.done ? (
                    <button className="ml-auto text-xs font-medium text-[#5B2EFF]">
                      Hacer →
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          {/* AI ASSISTANT — placeholder */}
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
                  Mejorá tus publicaciones en segundos: títulos que venden, descripciones claras y
                  precios sugeridos según tu rubro y zona.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-left text-xs text-[#433d56]"
                  >
                    <p className="font-medium text-[#2B174F]">Generar descripción</p>
                    <p className="text-[#6F6A7C]">para un producto</p>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-left text-xs text-[#433d56]"
                  >
                    <p className="font-medium text-[#2B174F]">Sugerir precios</p>
                    <p className="text-[#6F6A7C]">según mercado</p>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-left text-xs text-[#433d56]"
                  >
                    <p className="font-medium text-[#2B174F]">Crear publicación</p>
                    <p className="text-[#6F6A7C]">para redes</p>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* MY CATALOG */}
          <section>
            <SectionTitle
              title="Mi catálogo"
              subtitle={`${productCount} productos · ${serviceCount} servicios`}
              cta="Cargar producto"
              href="#"
            />
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {profile.catalog.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white"
                >
                  <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{item.name}</p>
                    <p className="text-xs text-[#5B2EFF]">
                      {item.price ? formatPrice(item.price) : "A consultar"}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          item.available
                            ? "bg-[#E7F9EE] text-[#197a43]"
                            : "bg-[#f1f1f1] text-[#8a8a8a]"
                        }`}
                      >
                        {item.available ? "Disponible" : "Pausado"}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5B2EFF]"
                      >
                        <Pencil size={11} /> Editar
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d9cef8] bg-[#FAFAFC] p-3 text-sm font-medium text-[#5B2EFF] hover:bg-[#F2ECFF]"
              >
                <PackagePlus size={20} />
                Agregar producto
              </button>
            </div>
          </section>

          {/* RECENT ORDERS */}
          <section>
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
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2ECFF] text-[#5B2EFF]">
                      <Inbox size={16} />
                    </div>
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

        {/* SIDE COLUMN */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5">
            <p className="inline-flex items-center gap-1 text-xs font-medium text-[#6F6A7C]">
              <ChartBar size={13} /> Esta semana
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-[#6F6A7C]">Visitas a tu tienda</span>
                <strong className="text-[#1f1833]">128</strong>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#6F6A7C]">Pedidos recibidos</span>
                <strong className="text-[#1f1833]">7</strong>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#6F6A7C]">Total en pedidos</span>
                <strong className="text-[#5B2EFF]">{formatPrice(196500)}</strong>
              </li>
            </ul>
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
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white"
            >
              Abrir mi tienda <ArrowRight size={14} />
            </Link>
          </section>

          <section className="rounded-2xl border border-[#ece8f7] bg-white p-5 text-sm">
            <p className="font-semibold text-[#2B174F]">Más opciones</p>
            <div className="mt-3 space-y-1">
              <Link href="/nerka/solicitudes" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">
                Solicitudes recibidas
              </Link>
              <Link href="/nerka/mensajes" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">
                Conversaciones
              </Link>
              <Link href="/nerka/eventos" className="block rounded-lg px-2 py-2 text-[#433d56] hover:bg-[#F2ECFF]">
                Ferias y eventos
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
