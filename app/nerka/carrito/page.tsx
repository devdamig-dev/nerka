"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Compass, Minus, Plus, Send, ShoppingBag, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/nerka/ui";
import { useCart, sellerCartItemCount, sellerCartTotal } from "@/lib/cart-context";
import { buildWhatsAppLink, formatPrice } from "@/lib/orders";

export default function CarritoPage() {
  const { carts, updateQuantity, removeItem, clearCart } = useCart();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [sentInternal, setSentInternal] = useState<Record<string, boolean>>({});

  const sellerCarts = Object.values(carts);
  const grandTotal = sellerCarts.reduce((sum, c) => sum + sellerCartTotal(c), 0);
  const grandItems = sellerCarts.reduce((sum, c) => sum + sellerCartItemCount(c), 0);

  if (sellerCarts.length === 0) {
    return (
      <main className="niar-page">
        <h1 className="mb-4 text-2xl font-semibold tracking-[-0.03em] text-[#1f241f] lg:text-4xl">Tu carrito</h1>
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Todavía no agregaste productos"
          description="Explorá comercios y servicios cerca tuyo, armá tu pedido y envialo por WhatsApp."
          cta="Explorar tiendas"
          href="/niar/explorar"
        />
      </main>
    );
  }

  return (
    <main className="niar-page pb-32 lg:pb-12">
      <section className="relative mb-8 overflow-hidden rounded-[2.65rem] bg-[#1f241f] p-6 text-white shadow-[0_34px_105px_rgba(79,89,68,0.18)] lg:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#EEF3EA]/12 blur-3xl" />
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15"><ShoppingBag size={13} /> Carrito activo</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] lg:text-6xl">Tu selección ya se siente real</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72 lg:text-base">
              {grandItems} {grandItems === 1 ? "producto" : "productos"} de {sellerCarts.length} {sellerCarts.length === 1 ? "negocio" : "negocios"}. NIAR mantiene la compra simple: confirmás detalles directo con cada comercio.
            </p>
          </div>
          <div className="rounded-[1.85rem] bg-white/12 p-5 ring-1 ring-white/18 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-white/56">Mini resumen</p>
            <p className="mt-1 text-3xl font-semibold tracking-[-0.03em]">{formatPrice(grandTotal)}</p>
            <p className="mt-2 text-xs text-white/60">Sin pagos online ni logística agregada.</p>
            <Link href="/niar/explorar" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1f241f] transition hover:-translate-y-0.5">
              Seguir explorando <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          {sellerCarts.map((cart) => {
            const total = sellerCartTotal(cart);
            const items = Object.values(cart.items);
            const note = notes[cart.profileId] ?? "";
            const sent = sentInternal[cart.profileId];

            return (
              <section key={cart.profileId} className="niar-float-in overflow-hidden rounded-[2.15rem] border border-[#E6DDD0]/82 bg-white/92 shadow-[0_22px_66px_rgba(79,89,68,0.10)] ring-1 ring-white/70">
                <header className="flex items-center justify-between gap-2 border-b border-[#E9E0D3] bg-[#F7F2EA]/78 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#8A8378]">Pedido a</p>
                    <Link href={`/niar/emprendedores/${cart.profileId}`} className="inline-flex items-center gap-1 text-base font-semibold text-[#1f241f] hover:text-[#5D6F52]">
                      {cart.profileName} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <button type="button" onClick={() => clearCart(cart.profileId)} className="inline-flex items-center gap-1 rounded-xl bg-[#FFF1EC] px-3 py-1.5 text-xs font-medium text-[#B45A4F]">
                    <Trash2 size={13} /> Vaciar
                  </button>
                </header>

                <ul className="divide-y divide-[#E9E0D3]">
                  {items.map((line) => (
                    <li key={line.productId} className="flex gap-4 px-5 py-4">
                      <Link href={`/niar/productos/${line.productId}`} className="shrink-0">
                        <img src={line.image} alt={line.name} className="h-20 w-20 rounded-[1.35rem] object-cover shadow-[0_14px_32px_rgba(79,89,68,0.12)] lg:h-24 lg:w-24" />
                      </Link>
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/niar/productos/${line.productId}`} className="text-sm font-semibold text-[#1f241f] hover:text-[#5D6F52] lg:text-base">{line.name}</Link>
                            <p className="mt-1 text-xs text-[#666C60]">
                              {line.price ? `${formatPrice(line.price)} c/u` : "Precio a consultar"}{line.unit ? ` · ${line.unit}` : ""}
                            </p>
                          </div>
                          <button type="button" onClick={() => removeItem(cart.profileId, line.productId)} className="text-[#8A8378] hover:text-[#B45A4F]" aria-label="Eliminar">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 rounded-xl bg-[#EEF3EA] p-1 ring-1 ring-[#C8D4BF]">
                            <button type="button" onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity - 1)} className="rounded-lg bg-white p-1.5 text-[#6E7F63] shadow-sm transition hover:-translate-y-0.5" aria-label="Quitar uno"><Minus size={13} /></button>
                            <span className="min-w-6 text-center text-sm font-semibold text-[#1f241f]">{line.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity + 1)} className="rounded-lg bg-white p-1.5 text-[#6E7F63] shadow-sm transition hover:-translate-y-0.5" aria-label="Agregar uno"><Plus size={13} /></button>
                          </div>
                          <p className="text-sm font-semibold text-[#1f241f]">{line.price ? formatPrice(line.price * line.quantity) : "—"}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-[#E9E0D3] bg-[linear-gradient(180deg,#FBF8F3,#F7F2EA)] px-5 py-4">
                  <label className="block text-xs font-medium text-[#1f241f]">
                    Nota para {cart.profileName} <span className="text-[#8A8378]">(opcional)</span>
                    <textarea value={note} onChange={(e) => setNotes((p) => ({ ...p, [cart.profileId]: e.target.value }))} className="mt-1 min-h-16 w-full rounded-xl border border-[#E6DDD0] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#8A8378]" placeholder="Ej: necesito el pedido para el sábado, retiro yo." />
                  </label>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#666C60]">Total estimado</span>
                    <strong className="text-base text-[#5D6F52]">{formatPrice(total)}</strong>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <a href={buildWhatsAppLink(cart, { note })} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white shadow-[0_14px_32px_rgba(37,211,102,0.20)] transition hover:-translate-y-0.5">
                      <Send size={15} /> Pedir por WhatsApp
                    </a>
                    <button type="button" onClick={() => setSentInternal((p) => ({ ...p, [cart.profileId]: true }))} className="niar-secondary inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium">
                      {sent ? "✓ Pedido enviado por mensaje" : "Enviar por mensaje interno"}
                    </button>
                  </div>
                  {sent ? (
                    <p className="rounded-xl bg-[#E7F9EE] px-3 py-2 text-xs text-[#197a43]">
                      Listo. Tu pedido aparece como conversación en <Link href="/niar/mensajes" className="font-semibold underline">Mensajes</Link>. El emprendedor te va a responder por ese canal.
                    </p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-28 space-y-4 rounded-[2.15rem] border border-[#C8D4BF]/85 bg-[#EEF3EA]/82 p-5 shadow-[0_24px_70px_rgba(79,89,68,0.13)] backdrop-blur">
            <p className="text-lg font-semibold text-[#1f241f]">Progreso del pedido</p>
            <p className="text-xs leading-5 text-[#666C60]">Una compra simple, directa y con continuidad visual para volver al descubrimiento cuando quieras.</p>
            <div className="h-2 overflow-hidden rounded-full bg-white/70"><div className="h-full w-1/3 rounded-full bg-[#6E7F63]" /></div>
            {["Elegiste productos", "Confirmás con el negocio", "Coordinan pago y entrega"].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-2xl bg-white/78 p-3 shadow-sm ring-1 ring-white/70">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#6E7F63] text-white"><CheckCircle2 size={16} /></span>
                <div>
                  <p className="text-sm font-semibold text-[#1f241f]">{step}</p>
                  <p className="text-xs text-[#666C60]">Paso {index + 1} simple, sin pagos ni logística dentro de NIAR.</p>
                </div>
              </div>
            ))}
            <Link href="/niar/explorar" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f241f] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              <Compass size={15} /> Seguir explorando
            </Link>
          </div>
        </aside>
      </div>

      <p className="mt-6 text-center text-xs text-[#8A8378]">NIAR no procesa pagos online. El precio y la entrega se confirman directo con cada emprendedor.</p>
    </main>
  );
}
