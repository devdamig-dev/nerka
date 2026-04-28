"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, ShoppingCart, Star } from "lucide-react";
import { BadgeTrust, EmptyState } from "@/components/nerka/ui";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";

type CartState = Record<string, number>;
const tabs = ["Catálogo", "Trabajos", "Reseñas", "Info"] as const;

export default function EntrepreneurProfilePage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Catálogo");
  const [cart, setCart] = useState<CartState>({});
  const entrepreneur = getEntrepreneurById(params.id);

  const cartItems = useMemo(() => {
    if (!entrepreneur) return [];
    return entrepreneur.catalog
      .filter((item) => cart[item.id])
      .map((item) => ({ ...item, quantity: cart[item.id] }));
  }, [cart, entrepreneur]);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0),
    [cartItems],
  );

  if (!entrepreneur) {
    return <main className="p-4"><EmptyState title="Perfil no encontrado" description="Este emprendimiento no existe o fue removido." cta="Explorar" href="/nerka/explorar" /></main>;
  }

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
  };

  const buildWhatsAppLink = () => {
    const lines = [
      "Hola, vi tu perfil en NERKA y quiero consultar por este pedido:",
      `Emprendimiento: ${entrepreneur.name}`,
      ...cartItems.map((item) => `- ${item.name} x${item.quantity} ${item.price ? `($${(item.price * item.quantity).toLocaleString("es-AR")})` : ""}`),
      `Total estimado: $${total.toLocaleString("es-AR")}`,
      `Perfil: /nerka/emprendedores/${entrepreneur.id}`,
    ];
    return `https://wa.me/${entrepreneur.contactPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <main className="pb-36 lg:px-8 lg:py-8 lg:pb-8">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
        <section>
          <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-44 w-full object-cover lg:h-64 lg:rounded-3xl" />
          <div className="relative px-4 pb-4 lg:px-0">
            <img src={entrepreneur.avatar} alt={entrepreneur.name} className="-mt-10 h-20 w-20 rounded-2xl border-4 border-[#FAFAFC] object-cover lg:-mt-14 lg:h-24 lg:w-24" />
            <h1 className="mt-3 text-xl font-semibold text-[#1f1833] lg:text-3xl">{entrepreneur.name}</h1>
            <p className="text-sm text-[#6F6A7C]">{entrepreneur.category} · {entrepreneur.subcategory}</p>
            <div className="mt-2 flex items-center gap-3 text-sm text-[#433d56]">
              <span className="inline-flex items-center gap-1"><Star size={14} className="fill-[#ffb547] text-[#ffb547]" /> {entrepreneur.rating}</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {entrepreneur.zone}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">{entrepreneur.badges.map((b) => <BadgeTrust key={b} badge={b} />)}</div>

            <div className="sticky top-0 z-20 mt-4 rounded-2xl bg-[#FAFAFC] py-2 lg:top-20">
              <div className="grid grid-cols-4 rounded-xl bg-white p-1">
                {tabs.map((item) => (
                  <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-2 py-2 text-xs ${tab === item ? "bg-[#F2ECFF] text-[#5B2EFF]" : "text-[#756f89]"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <section className="mt-4">
              {tab === "Catálogo" ? (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {entrepreneur.catalog.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                      <img src={item.image} alt={item.name} className="h-36 w-full rounded-xl object-cover" />
                      <p className="mt-2 font-medium text-[#1f1833]">{item.name}</p>
                      <p className="text-sm text-[#6F6A7C]">{item.description}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-sm text-[#433d56]">
                          {item.price ? `$${item.price.toLocaleString("es-AR")}${item.unit ? ` / ${item.unit}` : ""}` : "Precio a consultar"}
                        </p>
                        {!item.available ? (
                          <span className="rounded-lg bg-[#f1f1f1] px-3 py-1 text-xs text-[#8a8a8a]">No disponible</span>
                        ) : item.type === "product" && item.price ? (
                          <button onClick={() => addToCart(item.id)} className="rounded-xl bg-[#F2ECFF] px-3 py-1.5 text-sm text-[#5B2EFF]">Agregar al carrito</button>
                        ) : (
                          <Link href="/nerka/mensajes" className="rounded-xl bg-[#F2ECFF] px-3 py-1.5 text-sm text-[#5B2EFF]">Consultar</Link>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}

              {tab === "Trabajos" ? (
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                  {entrepreneurs.slice(0, 8).map((e) => <img key={e.id} src={e.cover} alt="Trabajo" className="h-24 w-full rounded-xl object-cover lg:h-32" />)}
                </div>
              ) : null}
              {tab === "Reseñas" ? (
                <div className="space-y-3">
                  {["Sofía R.", "Carla M.", "Micaela T."].map((name, i) => (
                    <article key={name} className="rounded-2xl border border-[#ece8f7] bg-white p-3">
                      <p className="font-medium text-[#1f1833]">{name}</p>
                      <p className="text-xs text-[#6F6A7C]">{i + 3} de abril</p>
                      <p className="mt-2 text-sm text-[#433d56]">Excelente servicio, súper puntual y muy buena predisposición.</p>
                    </article>
                  ))}
                </div>
              ) : null}
              {tab === "Info" ? (
                <article className="space-y-2 rounded-2xl border border-[#ece8f7] bg-white p-4 text-sm text-[#433d56]">
                  <p>{entrepreneur.about}</p>
                  <p><strong>Qué ofrece:</strong> {entrepreneur.offers.join(", ")}</p>
                  <p><strong>Cobertura:</strong> {entrepreneur.coverage}</p>
                  <p><strong>Tiempos de respuesta:</strong> {entrepreneur.responseTime}</p>
                  <p><strong>Modalidad:</strong> {entrepreneur.modality}</p>
                </article>
              ) : null}
            </section>
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-[#ece8f7] bg-white p-4">
            <p className="text-lg font-semibold text-[#2B174F]">Resumen del perfil</p>
            <p className="text-sm text-[#6F6A7C]">Rating {entrepreneur.rating} · {entrepreneur.reviews} reseñas</p>
            <p className="text-sm text-[#6F6A7C]">Zona: {entrepreneur.coverage}</p>
            <p className="text-sm text-[#6F6A7C]">WhatsApp: +{entrepreneur.contactPhone}</p>
            {cartItems.length ? (
              <div className="space-y-2 rounded-xl bg-[#FAFAFC] p-3">
                <p className="text-sm font-medium text-[#2B174F]">Carrito ({cartItems.length})</p>
                {cartItems.map((item) => (
                  <p key={item.id} className="text-xs text-[#6F6A7C]">{item.name} x{item.quantity}</p>
                ))}
                <p className="text-sm font-semibold text-[#5B2EFF]">Total estimado: ${total.toLocaleString("es-AR")}</p>
                <a href={buildWhatsAppLink()} target="_blank" className="block rounded-xl bg-[#25D366] px-3 py-2 text-center text-sm font-medium text-white">Pedir por WhatsApp</a>
              </div>
            ) : null}
            <Link href="/nerka/solicitudes/nueva" className="block rounded-2xl bg-[#5B2EFF] px-4 py-3 text-center font-medium text-white">Solicitar presupuesto</Link>
          </div>
        </aside>
      </div>

      {cartItems.length ? (
        <div className="fixed bottom-24 left-0 right-0 z-40 px-4 lg:hidden">
          <div className="rounded-2xl border border-[#d9cef8] bg-white p-3 shadow-lg">
            <p className="text-sm font-medium text-[#2B174F] inline-flex items-center gap-2"><ShoppingCart size={15} /> Carrito ({cartItems.length})</p>
            <p className="text-xs text-[#6F6A7C]">Total estimado: ${total.toLocaleString("es-AR")}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={buildWhatsAppLink()} target="_blank" className="rounded-xl bg-[#25D366] px-3 py-2 text-center text-sm font-medium text-white">Pedir por WhatsApp</a>
              <Link href="/nerka/solicitudes/nueva" className="rounded-xl bg-[#F2ECFF] px-3 py-2 text-center text-sm font-medium text-[#5B2EFF]">Solicitar presupuesto</Link>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
