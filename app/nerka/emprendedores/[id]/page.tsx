"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Send,
  Share2,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { BadgeTrust, EmptyState, SectionTitle } from "@/components/nerka/ui";
import { ProductCard } from "@/components/nerka/product-card";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { useCart, sellerCartItemCount, sellerCartTotal } from "@/lib/cart-context";
import { buildWhatsAppLink, formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";

const tabs = ["Catálogo", "Trabajos", "Reseñas", "Info"] as const;

export default function EntrepreneurProfilePage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Catálogo");
  const entrepreneur = getEntrepreneurById(params.id);
  const { getSellerCart } = useCart();
  const { isFavorite, toggleFavorite } = useRole();
  const fav = entrepreneur ? isFavorite(entrepreneur.id) : false;

  const cart = entrepreneur ? getSellerCart(entrepreneur.id) : undefined;
  const cartCount = cart ? sellerCartItemCount(cart) : 0;
  const cartTotal = cart ? sellerCartTotal(cart) : 0;

  const featured = entrepreneur?.catalog.filter((c) => c.featured && c.available) ?? [];

  if (!entrepreneur) {
    return (
      <main className="px-5 py-8">
        <EmptyState
          title="Tienda no encontrada"
          description="Este emprendimiento no existe o ya no está disponible."
          cta="Explorar tiendas"
          href="/nerka/explorar"
        />
      </main>
    );
  }

  const productList = entrepreneur.catalog.filter((c) => c.type === "product");
  const serviceList = entrepreneur.catalog.filter((c) => c.type === "service");

  const directWhatsAppLink = `https://wa.me/${entrepreneur.contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola ${entrepreneur.name}, te escribo desde NIAR. Quería consultarte por tu catálogo.`,
  )}`;

  return (
    <main className="pb-40 lg:pb-12">
      {/* HERO BAR — premium, sin overlay agresivo */}
      <div className="relative">
        <img
          src={entrepreneur.cover}
          alt={entrepreneur.name}
          className="aspect-[16/7] w-full object-cover lg:rounded-3xl"
        />
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <button
            type="button"
            aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
            onClick={() => toggleFavorite(entrepreneur.id)}
            className={`rounded-full p-2.5 backdrop-blur transition ${
              fav
                ? "bg-[var(--niar-error-soft)] text-[var(--niar-error)]"
                : "bg-white/90 text-[var(--niar-ink)] hover:bg-[var(--niar-error-soft)] hover:text-[var(--niar-error)]"
            }`}
          >
            <Heart size={16} className={fav ? "fill-current" : ""} />
          </button>
          <button
            type="button"
            aria-label="Compartir"
            onClick={async () => {
              const url = typeof window !== "undefined" ? window.location.href : "";
              if (typeof navigator !== "undefined" && "share" in navigator) {
                try {
                  await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
                    title: entrepreneur.name,
                    text: `Mirá la tienda de ${entrepreneur.name} en NIAR`,
                    url,
                  });
                  return;
                } catch {
                  /* fall through */
                }
              }
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                await navigator.clipboard.writeText(url);
              }
            }}
            className="rounded-full bg-white/90 p-2.5 text-[var(--niar-ink)] backdrop-blur"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid gap-8 px-5 pb-8 pt-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:px-2 lg:pt-8">
        {/* LEFT: brand + content */}
        <section>
          <div className="-mt-16 flex items-end gap-4 lg:-mt-20">
            <img
              src={entrepreneur.avatar}
              alt={entrepreneur.name}
              className="h-24 w-24 rounded-3xl border-4 border-[var(--niar-bg)] object-cover lg:h-28 lg:w-28"
            />
            <div className="pb-1">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
                {entrepreneur.category} · {entrepreneur.subcategory}
              </p>
            </div>
          </div>

          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-[var(--niar-ink)] lg:text-[44px]">
            {entrepreneur.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[var(--niar-ink-mute)]">
            {entrepreneur.about}
          </p>

          {/* Meta strip */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--niar-ink-mute)]">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="fill-[#f0a93f] text-[#f0a93f]" />
              <strong className="text-[var(--niar-ink)]">{entrepreneur.rating}</strong>
              <span className="text-[var(--niar-ink-soft)]">({entrepreneur.reviews} reseñas)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {entrepreneur.zone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {entrepreneur.responseTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck size={14} /> {entrepreneur.modalities.join(" · ")}
            </span>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entrepreneur.badges.map((b) => (
              <BadgeTrust key={b} badge={b} />
            ))}
          </div>

          {/* TABS */}
          <div className="sticky top-0 z-20 mt-8 -mx-5 bg-[var(--niar-bg)] px-5 py-3 lg:-mx-2 lg:px-2 lg:top-20">
            <div className="inline-flex items-center gap-1 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] p-1">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    tab === item
                      ? "bg-[var(--niar-ink)] text-white"
                      : "text-[var(--niar-ink-mute)] hover:text-[var(--niar-ink)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <section className="mt-6">
            {tab === "Catálogo" ? (
              <div className="space-y-10">
                {featured.length ? (
                  <div>
                    <SectionTitle title="Destacados" subtitle="Los más pedidos" />
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                      {featured.map((item) => (
                        <ProductCard
                          key={item.id}
                          product={item}
                          profileId={entrepreneur.id}
                          profileName={entrepreneur.name}
                          contactPhone={entrepreneur.contactPhone}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {productList.length ? (
                  <div>
                    <SectionTitle title="Productos" />
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                      {productList.map((item) => (
                        <ProductCard
                          key={item.id}
                          product={item}
                          profileId={entrepreneur.id}
                          profileName={entrepreneur.name}
                          contactPhone={entrepreneur.contactPhone}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {serviceList.length ? (
                  <div>
                    <SectionTitle
                      title="Servicios"
                      subtitle="Coordiná detalles y presupuesto por mensaje"
                    />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {serviceList.map((item) => (
                        <ProductCard
                          key={item.id}
                          product={item}
                          profileId={entrepreneur.id}
                          profileName={entrepreneur.name}
                          contactPhone={entrepreneur.contactPhone}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {!productList.length && !serviceList.length ? (
                  <EmptyState
                    title="Sin productos cargados"
                    description="Este emprendimiento todavía no publicó su catálogo."
                  />
                ) : null}
              </div>
            ) : null}

            {tab === "Trabajos" ? (
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-3">
                {entrepreneurs.slice(0, 8).map((e) => (
                  <img
                    key={e.id}
                    src={e.cover}
                    alt="Trabajo"
                    className="aspect-square w-full rounded-2xl object-cover lg:rounded-3xl"
                  />
                ))}
              </div>
            ) : null}

            {tab === "Reseñas" ? (
              <div className="space-y-3">
                {["Sofía R.", "Carla M.", "Micaela T."].map((name, i) => (
                  <article
                    key={name}
                    className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[var(--niar-ink)]">{name}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--niar-ink-mute)]">
                        <Star size={12} className="fill-[#f0a93f] text-[#f0a93f]" /> 5,0
                      </span>
                    </div>
                    <p className="text-xs text-[var(--niar-ink-soft)]">{i + 3} de abril</p>
                    <p className="mt-2 text-sm text-[var(--niar-ink)]">
                      Excelente servicio, súper puntual y muy buena predisposición.
                    </p>
                  </article>
                ))}
              </div>
            ) : null}

            {tab === "Info" ? (
              <article className="space-y-3 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-6 text-sm text-[var(--niar-ink)]">
                <p>{entrepreneur.about}</p>
                <p>
                  <strong>Qué ofrece:</strong>{" "}
                  <span className="text-[var(--niar-ink-mute)]">
                    {entrepreneur.offers.join(", ")}
                  </span>
                </p>
                <p>
                  <strong>Cobertura:</strong>{" "}
                  <span className="text-[var(--niar-ink-mute)]">{entrepreneur.coverage}</span>
                </p>
                <p>
                  <strong>Tiempos de respuesta:</strong>{" "}
                  <span className="text-[var(--niar-ink-mute)]">{entrepreneur.responseTime}</span>
                </p>
                <p>
                  <strong>Modalidad:</strong>{" "}
                  <span className="text-[var(--niar-ink-mute)]">{entrepreneur.modality}</span>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <span className="text-[var(--niar-ink-mute)]">+{entrepreneur.contactPhone}</span>
                </p>
              </article>
            ) : null}
          </section>
        </section>

        {/* RIGHT: side panel desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            {/* Primary CTA card */}
            <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
                Contactar al emprendimiento
              </p>
              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--niar-wa)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--niar-wa-deep)]"
              >
                <Send size={15} /> Escribir por WhatsApp
              </a>
              <Link
                href={`/nerka/mensajes/nuevo?to=${entrepreneur.id}`}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm font-medium text-[var(--niar-ink)] hover:border-[var(--niar-sage)]"
              >
                <MessageCircle size={15} /> Mensaje interno
              </Link>
              <div className="mt-4 border-t border-[var(--niar-border-soft)] pt-3 text-xs text-[var(--niar-ink-mute)]">
                <p className="inline-flex items-center gap-1.5">
                  <Clock size={12} /> {entrepreneur.responseTime}
                </p>
              </div>
            </div>

            {/* Cart preview */}
            {cart && cartCount > 0 ? (
              <div className="rounded-3xl border border-[var(--niar-sage)] bg-[var(--niar-sage-mute)] p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-sage-on)]">
                  Tu pedido
                </p>
                <ul className="mt-3 space-y-2">
                  {Object.values(cart.items).map((line) => (
                    <li
                      key={line.productId}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="text-[var(--niar-ink)]">
                        {line.name}{" "}
                        <span className="text-[var(--niar-ink-soft)]">x{line.quantity}</span>
                      </span>
                      <span className="text-[var(--niar-ink)]">
                        {line.price ? formatPrice(line.price * line.quantity) : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--niar-border-soft)] pt-3 text-sm">
                  <span className="text-[var(--niar-ink-mute)]">Total estimado</span>
                  <strong className="font-display text-base text-[var(--niar-ink)]">
                    {formatPrice(cartTotal)}
                  </strong>
                </div>
                <a
                  href={buildWhatsAppLink(cart)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--niar-wa)] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Pedir por WhatsApp
                </a>
                <Link
                  href="/nerka/carrito"
                  className="mt-2 inline-flex w-full items-center justify-center gap-1 text-xs font-medium text-[var(--niar-sage-on)]"
                >
                  Ver carrito completo →
                </Link>
              </div>
            ) : null}

            {/* Trust */}
            <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
                Confianza
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--niar-ink-mute)]">
                <li>· Emprendimiento de {entrepreneur.zone}</li>
                <li>· {entrepreneur.responseTime}</li>
                <li>· {entrepreneur.reviews} reseñas verificadas</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE STICKY ACTIONS */}
      <div className="fixed bottom-20 left-0 right-0 z-40 px-4 lg:hidden">
        {cart && cartCount > 0 ? (
          <div className="rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-4 shadow-[var(--niar-shadow-lg)]">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--niar-ink)]">
                <ShoppingBag size={15} className="text-[var(--niar-sage-on)]" /> {cartCount}{" "}
                {cartCount === 1 ? "producto" : "productos"}
              </p>
              <p className="font-display text-base font-semibold text-[var(--niar-ink)]">
                {formatPrice(cartTotal)}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href="/nerka/carrito"
                className="rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-3 py-2.5 text-center text-sm font-medium text-[var(--niar-ink)]"
              >
                Ver carrito
              </Link>
              <a
                href={buildWhatsAppLink(cart)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-full bg-[var(--niar-wa)] px-3 py-2.5 text-sm font-semibold text-white"
              >
                <Send size={14} /> Pedir
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 rounded-3xl border border-[var(--niar-border)] bg-[var(--niar-surface)] p-2 shadow-[var(--niar-shadow-lg)]">
            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--niar-wa)] px-4 py-3 text-sm font-semibold text-white"
            >
              <Send size={15} /> WhatsApp
            </a>
            <Link
              href={`/nerka/mensajes/nuevo?to=${entrepreneur.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--niar-border)] bg-[var(--niar-surface)] px-4 py-3 text-sm font-medium text-[var(--niar-ink)]"
            >
              <MessageCircle size={15} /> Mensaje
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
