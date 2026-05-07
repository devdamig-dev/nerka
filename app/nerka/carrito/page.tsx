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
      <main className="px-5 py-8 lg:px-2 lg:py-10">
        <h1 className="font-display mb-6 text-3xl font-semibold text-[var(--niar-ink)] lg:text-4xl">
          Tu carrito
        </h1>
        <EmptyState
          icon={<ShoppingBag size={20} />}
          title="Todavía no agregaste productos"
          description="Recorré las tiendas y armá tu pedido. Lo enviás por WhatsApp en un toque."
          cta="Descubrir tiendas"
          href="/nerka/explorar"
        />
      </main>
    );
  }

  return (
    <main className="px-5 py-8 pb-32 lg:px-2 lg:py-10 lg:pb-12">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Tu pedido
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Tu carrito
        </h1>
        <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
          {grandItems} {grandItems === 1 ? "producto" : "productos"} de {sellerCarts.length}{" "}
          {sellerCarts.length === 1 ? "emprendimiento" : "emprendimientos"} · Total estimado{" "}
          <strong className="text-[var(--niar-ink)]">{formatPrice(grandTotal)}</strong>
        </p>
      </header>

      <div className="space-y-6">
        {sellerCarts.map((cart) => {
          const total = sellerCartTotal(cart);
          const items = Object.values(cart.items);
          const note = notes[cart.profileId] ?? "";
          const sent = sentInternal[cart.profileId];

          return (
            <section
              key={cart.profileId}
              className="overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)]"
            >
              <header className="flex items-center justify-between gap-2 border-b border-[var(--niar-border-soft)] px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--niar-ink-soft)]">
                    Pedido a
                  </p>
                  <Link
                    href={`/nerka/emprendedores/${cart.profileId}`}
                    className="font-display text-lg font-semibold text-[var(--niar-ink)] hover:text-[var(--niar-sage-on)]"
                  >
                    {cart.profileName}
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => clearCart(cart.profileId)}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-1.5 text-xs font-medium text-[var(--niar-error)] hover:bg-[var(--niar-error-soft)]"
                >
                  <Trash2 size={13} /> Vaciar
                </button>
              </header>

              <ul className="divide-y divide-[var(--niar-border-soft)]">
                {items.map((line) => (
                  <li key={line.productId} className="flex gap-4 px-5 py-4">
                    <img
                      src={line.image}
                      alt={line.name}
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[var(--niar-ink)]">{line.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(cart.profileId, line.productId)}
                          className="text-[var(--niar-ink-soft)] hover:text-[var(--niar-error)]"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-[var(--niar-ink-mute)]">
                        {line.price ? `${formatPrice(line.price)} c/u` : "Precio a consultar"}
                        {line.unit ? ` · ${line.unit}` : ""}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-[var(--niar-sage-mute)] p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity - 1)}
                            className="rounded-full bg-[var(--niar-surface)] p-1.5 text-[var(--niar-sage-on)]"
                            aria-label="Quitar uno"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold text-[var(--niar-sage-on)]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(cart.profileId, line.productId, line.quantity + 1)}
                            className="rounded-full bg-[var(--niar-surface)] p-1.5 text-[var(--niar-sage-on)]"
                            aria-label="Agregar uno"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                          {line.price ? formatPrice(line.price * line.quantity) : "—"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-[var(--niar-border-soft)] bg-[var(--niar-bg)] px-5 py-4">
                <label className="block text-xs font-medium text-[var(--niar-ink)]">
                  Nota para {cart.profileName}{" "}
                  <span className="text-[var(--niar-ink-soft)]">(opcional)</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNotes((p) => ({ ...p, [cart.profileId]: e.target.value }))}
                    className="mt-1.5 min-h-16 w-full rounded-2xl border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-2 text-sm outline-none placeholder:text-[var(--niar-ink-soft)] focus:border-[var(--niar-sage)]"
                    placeholder="Ej: necesito el pedido para el sábado, retiro yo."
                  />
                </label>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--niar-ink-mute)]">Total estimado</span>
                  <strong className="font-display text-lg text-[var(--niar-ink)]">
                    {formatPrice(total)}
                  </strong>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={buildWhatsAppLink(cart, { note })}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-wa)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--niar-wa-deep)]"
                  >
                    <Send size={15} /> Pedir por WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSentInternal((p) => ({ ...p, [cart.profileId]: true }))}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm font-medium text-[var(--niar-ink)] hover:border-[var(--niar-sage)]"
                  >
                    {sent ? "✓ Pedido enviado por mensaje" : "Enviar por mensaje interno"}
                  </button>
                </div>
                {sent ? (
                  <p className="rounded-2xl bg-[var(--niar-success-soft)] px-3 py-2 text-xs text-[var(--niar-success)]">
                    Listo. Tu pedido aparece en{" "}
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

      <p className="mt-8 text-center text-xs text-[var(--niar-ink-soft)]">
        NIAR no procesa pagos online. El precio y la entrega se confirman directo con cada
        emprendedor.
      </p>
    </main>
  );
}
