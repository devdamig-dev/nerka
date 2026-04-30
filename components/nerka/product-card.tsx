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
  consultHref?: string;
};

export function ProductCard({
  product,
  profileId,
  profileName,
  contactPhone,
  consultHref = "/nerka/mensajes",
}: ProductCardProps) {
  const { addItem, getSellerCart, updateQuantity } = useCart();
  const cart = getSellerCart(profileId);
  const quantity = cart?.items[product.id]?.quantity ?? 0;

  const canAddToCart = product.available && product.type === "product" && typeof product.price === "number";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
        {product.featured ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-[#5B2EFF] shadow-sm">
            <Sparkles size={12} /> Destacado
          </span>
        ) : null}
        {!product.available ? (
          <span className="absolute right-2 top-2 rounded-full bg-[#1f1833]/80 px-2 py-1 text-[11px] font-medium text-white">
            No disponible
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div>
          <p className="line-clamp-2 text-sm font-semibold text-[#1f1833]">{product.name}</p>
          <p className="mt-1 line-clamp-2 text-xs text-[#6F6A7C]">{product.description}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.price ? (
              <>
                <p className="text-base font-semibold text-[#2B174F]">
                  {formatPrice(product.price)}
                </p>
                {product.unit ? (
                  <p className="text-[11px] text-[#6F6A7C]">por {product.unit}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm font-medium text-[#5B2EFF]">A consultar</p>
            )}
          </div>
          {canAddToCart ? (
            quantity > 0 ? (
              <div className="flex items-center gap-2 rounded-xl bg-[#F2ECFF] p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity - 1)}
                  className="rounded-lg bg-white p-1.5 text-[#5B2EFF]"
                  aria-label="Quitar uno"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-[#2B174F]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(profileId, product.id, quantity + 1)}
                  className="rounded-lg bg-white p-1.5 text-[#5B2EFF]"
                  aria-label="Agregar uno"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addItem({ profileId, profileName, contactPhone, product })}
                className="inline-flex items-center gap-1 rounded-xl bg-[#5B2EFF] px-3 py-2 text-xs font-medium text-white"
              >
                <ShoppingBag size={14} /> Agregar
              </button>
            )
          ) : product.available ? (
            <Link
              href={consultHref}
              className="inline-flex rounded-xl bg-[#F2ECFF] px-3 py-2 text-xs font-medium text-[#5B2EFF]"
            >
              Consultar
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
