"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
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
  const consultLink =
    consultHref ?? `/niar/mensajes/nuevo?to=${profileId}&product=${product.id}`;
  const { addItem, getSellerCart, updateQuantity } = useCart();
  const cart = getSellerCart(profileId);
  const quantity = cart?.items[product.id]?.quantity ?? 0;

  const canAddToCart = product.available && product.type === "product" && typeof product.price === "number";

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.75rem] border border-[#E6DDD0] bg-white shadow-[0_14px_36px_rgba(79,89,68,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(79,89,68,0.14)]">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover transition duration-500 hover:scale-[1.03] lg:h-64"
        />
        {product.featured ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#6E7F63] shadow-sm">
            <Sparkles size={12} /> Destacado
          </span>
        ) : null}
        {!product.available ? (
          <span className="absolute right-2 top-2 rounded-full bg-[#1f241f]/80 px-2 py-1 text-[11px] font-medium text-white">
            No disponible
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="line-clamp-2 text-base font-semibold text-[#1f241f]">{product.name}</p>
          <p className="mt-1 line-clamp-2 text-sm text-[#666C60]">{product.description}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.price ? (
              <>
                <p className="text-lg font-semibold text-[#1f241f]">
                  {formatPrice(product.price)}
                </p>
                {product.unit ? (
                  <p className="text-[11px] text-[#666C60]">por {product.unit}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm font-medium text-[#6E7F63]">A consultar</p>
            )}
          </div>
          {canAddToCart ? (
            quantity > 0 ? (
              <div className="flex items-center gap-2 rounded-xl bg-[#EEF3EA] p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity - 1)}
                  className="rounded-lg bg-white p-1.5 text-[#6E7F63]"
                  aria-label="Quitar uno"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-[#1f241f]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity + 1)}
                  className="rounded-lg bg-white p-1.5 text-[#6E7F63]"
                  aria-label="Agregar uno"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addItem({ profileId, profileName, contactPhone, product })}
                className="inline-flex items-center gap-1 rounded-2xl bg-[#6E7F63] px-4 py-2.5 text-xs font-semibold text-white"
              >
                <ShoppingBag size={14} /> Agregar
              </button>
            )
          ) : product.available ? (
            <Link
              href={consultLink}
              className="inline-flex rounded-2xl bg-[#EEF3EA] px-4 py-2.5 text-xs font-semibold text-[#6E7F63]"
            >
              Consultar
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
