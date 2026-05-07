"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/orders";

type ProductCardProps = {
  product: Product;
  profileId: string;
  profileName: string;
  contactPhone: string;
  /** Si se omite, se arma con /nerka/mensajes/nuevo?to=&product=. */
  consultHref?: string;
};

export function ProductCard({
  product,
  profileId,
  profileName,
  contactPhone,
  consultHref,
}: ProductCardProps) {
  const { addItem, getSellerCart, updateQuantity } = useCart();
  const cart = getSellerCart(profileId);
  const quantity = cart?.items[product.id]?.quantity ?? 0;
  const consultLink =
    consultHref ?? `/nerka/mensajes/nuevo?to=${profileId}&product=${product.id}`;

  const canAddToCart =
    product.available && product.type === "product" && typeof product.price === "number";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] transition hover:-translate-y-0.5 hover:shadow-[var(--niar-shadow)]">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {product.featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--niar-surface)]/95 px-2.5 py-1 text-[11px] font-medium text-[var(--niar-lila-deep)] backdrop-blur">
            Destacado
          </span>
        ) : null}
        {!product.available ? (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--niar-ink)]/85 px-2.5 py-1 text-[11px] font-medium text-white">
            No disponible
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="line-clamp-2 text-sm font-semibold leading-tight text-[var(--niar-ink)]">
            {product.name}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-[var(--niar-ink-mute)]">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.price ? (
              <>
                <p className="font-display text-[17px] font-semibold leading-none text-[var(--niar-ink)]">
                  {formatPrice(product.price)}
                </p>
                {product.unit ? (
                  <p className="mt-1 text-[11px] text-[var(--niar-ink-soft)]">por {product.unit}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm font-medium text-[var(--niar-sage-on)]">A consultar</p>
            )}
          </div>

          {canAddToCart ? (
            quantity > 0 ? (
              <div className="flex items-center gap-1 rounded-full bg-[var(--niar-sage-mute)] p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity - 1)}
                  className="rounded-full bg-[var(--niar-surface)] p-1.5 text-[var(--niar-sage-on)]"
                  aria-label="Quitar uno"
                >
                  <Minus size={13} />
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-[var(--niar-sage-on)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity + 1)}
                  className="rounded-full bg-[var(--niar-surface)] p-1.5 text-[var(--niar-sage-on)]"
                  aria-label="Agregar uno"
                >
                  <Plus size={13} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addItem({ profileId, profileName, contactPhone, product })}
                className="inline-flex items-center gap-1 rounded-full bg-[var(--niar-ink)] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[var(--niar-sage-deep)]"
              >
                <ShoppingBag size={13} /> Agregar
              </button>
            )
          ) : product.available ? (
            <Link
              href={consultLink}
              className="inline-flex rounded-full bg-[var(--niar-sage-mute)] px-3.5 py-2 text-xs font-medium text-[var(--niar-sage-on)]"
            >
              Consultar
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
