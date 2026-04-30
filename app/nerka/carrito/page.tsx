"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Send, ShoppingBag, Trash2 } from "lucide-react";
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
      <main className="px-4 py-6 lg:px-8 lg:py-10">
        <h1 className="mb-4 text-xl font-semibold text-[#2B174F] lg:text-2xl">Tu carrito</h1>
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Todavía no agregaste productos"
          description="Explorá emprendimientos cerca tuyo y armá tu pedido. Lo enviás por WhatsApp en un toque."
          cta="Explorar tiendas"
          href="/nerka/explorar"
        />
      </main>
    );
  }

  return (
    <main className="px-4 py-6 pb-32 lg:px-8 lg:py-10 lg:pb-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#2B174F] lg:text-2xl">Tu carrito</h1>
          <p className="mt-1 text-sm text-[#6F6A7C]">
            {grandItems} {grandItems === 1 ? "producto" : "productos"} de {sellerCarts.length}{" "}
            {sellerCarts.length === 1 ? "emprendimiento" : "emprendimientos"} · Total estimado{" "}
            <strong className="text-[#5B2EFF]">{formatPrice(grandTotal)}</strong>
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {sellerCarts.map((cart) => {
          const total = sellerCartTotal(cart);
          const items = Object.values(cart.items);
          const note = notes[cart.profileId] ?? "";
          const sent = sentInternal[cart.profileId];

          return (
            <section
              key={cart.profileId}
              className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm"
            >
              <header className="flex items-center justify-between gap-2 border-b border-[#f1ecfb] px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8d86a2]">Pedido a</p>
                  <Link
                    href={`/nerka/emprendedores/${cart.profileId}`}
                    className="text-sm font-semibold text-[#2B174F] hover:underline"
                  >
                    {cart.profileName}
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => clearCart(cart.profileId)}
                  className="inline-flex items-center gap-1 rounded-xl bg-[#fff1f1] px-3 py-1.5 text-xs font-medium text-[#b8344b]"
                >
                  <Trash2 size={13} /> Vaciar
                </button>
              </header>

              <ul className="divide-y divide-[#f1ecfb]">
                {items.map((line) => (
                  <li key={line.productId} className="flex gap-3 px-4 py-3">
                    <img
                      src={line.image}
                      alt={line.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#1f1833]">{line.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(cart.profileId, line.productId)}
                          className="text-[#9088a3] hover:text-[#b8344b]"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-[#6F6A7C]">
                        {line.price ? `${formatPrice(line.price)} c/u` : "Precio a consultar"}
                        {line.unit ? ` · ${line.unit}` : ""}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-xl bg-[#F2ECFF] p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity - 1)}
                            className="rounded-lg bg-white p-1.5 text-[#5B2EFF]"
                            aria-label="Quitar uno"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold text-[#2B174F]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity + 1)}
                            className="rounded-lg bg-white p-1.5 text-[#5B2EFF]"
                            aria-label="Agregar uno"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[#2B174F]">
                          {line.price ? formatPrice(line.price * line.quantity) : "—"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-[#f1ecfb] bg-[#FAFAFC] px-4 py-3">
                <label className="block text-xs font-medium text-[#2B174F]">
                  Nota para {cart.profileName} <span className="text-[#9088a3]">(opcional)</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNotes((p) => ({ ...p, [cart.profileId]: e.target.value }))}
                    className="mt-1 min-h-16 w-full rounded-xl border border-[#ece8f7] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9b95aa]"
                    placeholder="Ej: necesito el pedido para el sábado, retiro yo."
                  />
                </label>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6F6A7C]">Total estimado</span>
                  <strong className="text-base text-[#5B2EFF]">{formatPrice(total)}</strong>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={buildWhatsAppLink(cart, { note })}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white"
                  >
                    <Send size={15} /> Pedir por WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSentInternal((p) => ({ ...p, [cart.profileId]: true }))}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9cef8] bg-white px-3 py-2.5 text-sm font-medium text-[#5B2EFF]"
                  >
                    {sent ? "✓ Pedido enviado por mensaje" : "Enviar por mensaje interno"}
                  </button>
                </div>
                {sent ? (
                  <p className="rounded-xl bg-[#E7F9EE] px-3 py-2 text-xs text-[#197a43]">
                    Listo. Tu pedido aparece como conversación en{" "}
                    <Link href="/nerka/mensajes" className="font-semibold underline">
                      Mensajes
                    </Link>
                    . El emprendedor te va a responder por ese canal.
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-[#9088a3]">
        Nerka no procesa pagos online. El precio y la entrega se confirman directo con cada
        emprendedor.
      </p>
    </main>
  );
}
