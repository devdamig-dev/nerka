"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, useState } from "react";
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/orders";

type ProductCardProps = {
  product: Product;
  profileId: string;
  profileName: string;
  contactPhone: string;
  /** Si se omite, se arma con /niar/mensajes/nuevo?to=&product=. */
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
  const detailLink = `/niar/productos/${product.id}`;
  const router = useRouter();
  const { addItem, getSellerCart, updateQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const cart = getSellerCart(profileId);
  const quantity = cart?.items[product.id]?.quantity ?? 0;

  const canAddToCart = product.available && product.type === "product" && typeof product.price === "number";
  const stopCardNavigation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleCardNavigation = () => {
    router.push(detailLink);
  };

  const handleAdd = (event?: MouseEvent) => {
    event?.stopPropagation();
    addItem({ profileId, profileName, contactPhone, product });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article
      onClick={handleCardNavigation}
      className={`group niar-premium-card flex cursor-pointer flex-col ${justAdded ? "ring-2 ring-[#C8D4BF]" : ""}`}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") router.push(detailLink);
      }}
      aria-label={`Ver detalle de ${product.name}`}
    >
      <Link href={detailLink} onClick={stopCardNavigation} className="block focus-visible:rounded-[2.25rem]">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="niar-editorial-image h-64 w-full object-cover sm:h-72 lg:h-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,31,0.02)_0%,rgba(31,36,31,0.10)_45%,rgba(31,36,31,0.62)_100%)]" />
          <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
            {product.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/86 px-3.5 py-1.5 text-[11px] font-semibold text-[#6E7F63] shadow-sm ring-1 ring-white/70 backdrop-blur-md">
                <Sparkles size={12} /> Selección
              </span>
            ) : <span />}
            {!product.available ? (
              <span className="rounded-full bg-[#1f241f]/72 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                No disponible
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
            <span className="rounded-full bg-white/14 px-3 py-1 text-[11px] font-medium text-white/86 ring-1 ring-white/18 backdrop-blur-md">{product.type === "service" ? "Servicio" : "Producto"}</span>
            {product.price ? <span className="rounded-full bg-[#1f241f]/42 px-3 py-1.5 text-sm font-semibold backdrop-blur-md">{formatPrice(product.price)}</span> : null}
          </div>
        </div>
      </Link>
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
        {justAdded ? (
          <div className="niar-float-in rounded-2xl bg-[#E7F9EE] px-3 py-2 text-xs font-semibold text-[#197a43] ring-1 ring-[#BFE8CE]">
            Agregado al pedido · podés ajustar cantidades
          </div>
        ) : null}
        <Link href={detailLink} onClick={stopCardNavigation} className="group/title block">
          <p className="line-clamp-2 text-xl font-semibold tracking-[-0.035em] text-[#1f241f] transition group-hover/title:text-[#5D6F52]">{product.name}</p>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#666C60]">{product.description}</p>
          <span className="mt-2 inline-flex text-xs font-semibold text-[#6E7F63] transition group-hover/title:translate-x-1">Ver detalle y relacionados →</span>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            {product.price ? (
              <>
                <p className="text-xl font-semibold tracking-[-0.02em] text-[#1f241f]">
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
              <div className="flex items-center gap-2 rounded-xl bg-[#EEF3EA] p-1 ring-1 ring-[#C8D4BF]">
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); updateQuantity(profileId, product.id, quantity - 1); }}
                  className="rounded-lg bg-white p-1.5 text-[#6E7F63] shadow-sm transition hover:-translate-y-0.5"
                  aria-label="Quitar uno"
                >
                  <Minus size={14} />
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-[#1f241f]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); updateQuantity(profileId, product.id, quantity + 1); }}
                  className="rounded-lg bg-white p-1.5 text-[#6E7F63] shadow-sm transition hover:-translate-y-0.5"
                  aria-label="Agregar uno"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="niar-primary inline-flex items-center gap-1 rounded-2xl px-4 py-2.5 text-xs font-semibold active:scale-[0.98]"
              >
                <ShoppingBag size={14} /> Agregar
              </button>
            )
          ) : product.available ? (
            <Link
              href={consultLink}
              onClick={stopCardNavigation}
              className="niar-secondary inline-flex rounded-2xl px-4 py-2.5 text-xs font-semibold"
            >
              Consultar
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
