"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Clock,
  Heart,
  MessageCircle,
  Send,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { BadgeTrust, EmptyState, SectionTitle } from "@/components/nerka/ui";
import { ProductCard } from "@/components/nerka/product-card";
import { entrepreneurs, getEntrepreneurById } from "@/lib/nerka-data";
import { useCart, sellerCartItemCount, sellerCartTotal } from "@/lib/cart-context";
import { buildWhatsAppLink, formatPrice } from "@/lib/orders";
import { useRole } from "@/lib/role-context";

const tabs = ["Catálogo", "Galería", "Reseñas", "Info"] as const;

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
      <main className="p-4">
        <EmptyState
          title="Perfil no encontrado"
          description="Este perfil comercial no existe o ya no está disponible."
          cta="Explorar Niar"
          href="/niar/explorar"
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
    <main className="mx-auto max-w-[1540px] pb-40 lg:px-10 lg:py-10 lg:pb-10 xl:px-12">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        <section>
          {/* HERO */}
          <div className="relative overflow-hidden bg-[#1f241f] lg:rounded-[2.75rem] lg:shadow-[0_30px_90px_rgba(79,89,68,0.18)]">
            <img src={entrepreneur.cover} alt={entrepreneur.name} className="h-96 w-full object-cover lg:h-[560px] xl:h-[640px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f241f] via-[#1f241f]/28 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white lg:p-10">
              <div className="flex items-end gap-4">
                <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-20 w-20 rounded-[1.5rem] border-4 border-white object-cover shadow-lg lg:h-28 lg:w-28" />
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {entrepreneur.badges.map((badge) => <BadgeTrust key={badge} badge={badge} />)}
                  </div>
                  <h1 className="truncate text-4xl font-semibold tracking-[-0.05em] lg:text-7xl">{entrepreneur.name}</h1>
                  <p className="mt-2 text-base text-white/80">{entrepreneur.category} · {entrepreneur.subcategory} · {entrepreneur.zone}</p>
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                  <button type="button" aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"} onClick={() => toggleFavorite(entrepreneur.id)} className={`rounded-2xl p-3 shadow-sm transition ${fav ? "bg-[#FFEAF1] text-[#b8344b]" : "bg-white text-[#1f241f] hover:bg-[#FFEAF1] hover:text-[#b8344b]"}`}>
                    <Heart size={17} className={fav ? "fill-current" : ""} />
                  </button>
                  <button
                    type="button"
                    aria-label="Compartir"
                    onClick={async () => {
                      const url = typeof window !== "undefined" ? window.location.href : "";
                      if (typeof navigator !== "undefined" && "share" in navigator) {
                        try {
                          await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({ title: entrepreneur.name, text: `Mirá la tienda de ${entrepreneur.name} en Niar`, url });
                          return;
                        } catch {
                          // fall through to copy
                        }
                      }
                      if (typeof navigator !== "undefined" && navigator.clipboard) await navigator.clipboard.writeText(url);
                    }}
                    className="rounded-2xl bg-white p-3 text-[#1f241f] shadow-sm"
                  >
                    <Share2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 lg:px-0">
            <div className="mt-8 grid gap-8 rounded-[2.25rem] border border-[#E6DDD0] bg-white/88 p-6 shadow-[0_22px_60px_rgba(79,89,68,0.09)] ring-1 ring-white/60 lg:grid-cols-[1fr_auto] lg:p-8">
              <div>
                <p className="max-w-3xl text-base leading-7 text-[#555C51]">{entrepreneur.about}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#555C51]">
                  <span className="inline-flex items-center gap-1"><Star size={14} className="fill-[#C9984A] text-[#C9984A]" /><strong className="text-[#1f241f]">{entrepreneur.rating}</strong><span className="text-[#666C60]">({entrepreneur.reviews} reseñas)</span></span>
                  <span className="inline-flex items-center gap-1 text-[#666C60]"><Clock size={14} /> {entrepreneur.responseTime}</span>
                  <span className="inline-flex items-center gap-1 text-[#666C60]"><Truck size={14} /> {entrepreneur.modalities.join(" · ")}</span>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
                <a href={directWhatsAppLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"><Send size={15} /> Consultar por WhatsApp</a>
                <Link href={`/niar/mensajes/nuevo?to=${entrepreneur.id}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#C8D4BF] bg-white px-4 py-3 text-sm font-semibold text-[#6E7F63]"><MessageCircle size={15} /> Mensaje interno</Link>
              </div>
            </div>

            {/* TABS */}
            <div className="sticky top-0 z-20 mt-8 rounded-[1.5rem] bg-[#FBF8F3]/88 py-2 backdrop-blur lg:top-20">
              <div className="grid grid-cols-4 rounded-full border border-[#E6DDD0] bg-white/82 p-1.5 shadow-[0_16px_45px_rgba(79,89,68,0.07)]">
                {tabs.map((item) => (
                  <button
                    key={item}
                    onClick={() => setTab(item)}
                    className={`rounded-full px-2 py-2.5 text-xs font-semibold ${
                      tab === item ? "bg-[#EEF3EA] text-[#6E7F63]" : "text-[#756f89]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <section className="mt-4">
              {tab === "Catálogo" ? (
                <div className="space-y-6">
                  {featured.length ? (
                    <div>
                      <SectionTitle
                        title="Productos destacados"
                        subtitle="Selección destacada del negocio"
                      />
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
                      description="Este perfil todavía no publicó su catálogo."
                    />
                  ) : null}
                </div>
              ) : null}

              {tab === "Galería" ? (
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                  {entrepreneurs.slice(0, 8).map((e) => (
                    <img
                      key={e.id}
                      src={e.cover}
                      alt="Trabajo"
                      className="h-24 w-full rounded-xl object-cover lg:h-32"
                    />
                  ))}
                </div>
              ) : null}

              {tab === "Reseñas" ? (
                <div className="space-y-3">
                  {["Sofía R.", "Carla M.", "Micaela T."].map((name, i) => (
                    <article key={name} className="rounded-2xl border border-[#E6DDD0] bg-white p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-[#1f241f]">{name}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-[#555C51]">
                          <Star size={12} className="fill-[#C9984A] text-[#C9984A]" /> 5,0
                        </span>
                      </div>
                      <p className="text-xs text-[#666C60]">{i + 3} de abril</p>
                      <p className="mt-2 text-sm text-[#555C51]">
                        Excelente servicio, súper puntual y muy buena predisposición.
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}

              {tab === "Info" ? (
                <article className="space-y-2 rounded-2xl border border-[#E6DDD0] bg-white p-4 text-sm text-[#555C51]">
                  <p>{entrepreneur.about}</p>
                  <p>
                    <strong className="text-[#1f241f]">Qué ofrece:</strong> {entrepreneur.offers.join(", ")}
                  </p>
                  <p>
                    <strong className="text-[#1f241f]">Cobertura:</strong> {entrepreneur.coverage}
                  </p>
                  <p>
                    <strong className="text-[#1f241f]">Tiempos de respuesta:</strong> {entrepreneur.responseTime}
                  </p>
                  <p>
                    <strong className="text-[#1f241f]">Modalidad:</strong> {entrepreneur.modality}
                  </p>
                  <p>
                    <strong className="text-[#1f241f]">WhatsApp:</strong> +{entrepreneur.contactPhone}
                  </p>
                </article>
              ) : null}
            </section>
          </div>
        </section>

        {/* DESKTOP SIDE PANEL */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4 rounded-[2rem] border border-[#E6DDD0] bg-white/90 p-5 shadow-[0_22px_60px_rgba(79,89,68,0.09)] ring-1 ring-white/60">
            <p className="text-base font-semibold text-[#1f241f]">Tu pedido</p>
            {cart && cartCount > 0 ? (
              <>
                <ul className="space-y-2">
                  {Object.values(cart.items).map((line) => (
                    <li key={line.productId} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-[#555C51]">
                        {line.name} <span className="text-[#8A8378]">x{line.quantity}</span>
                      </span>
                      <span className="text-[#1f241f]">
                        {line.price ? formatPrice(line.price * line.quantity) : "a coordinar"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E6DDD0] pt-2 text-sm">
                  <p className="flex justify-between text-[#666C60]">
                    <span>Total estimado</span>
                    <strong className="text-[#6E7F63]">{formatPrice(cartTotal)}</strong>
                  </p>
                </div>
                <a
                  href={buildWhatsAppLink(cart)}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Pedir por WhatsApp
                </a>
                <Link
                  href="/niar/carrito"
                  className="block rounded-2xl bg-[#EEF3EA] px-4 py-3 text-center text-sm font-semibold text-[#6E7F63]"
                >
                  Ver carrito completo
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-[#666C60]">
                  Agregá productos del catálogo y armá tu pedido. Lo enviás directo por WhatsApp.
                </p>
                <a
                  href={directWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Consultar al negocio
                </a>
              </>
            )}

            <div className="mt-2 rounded-xl bg-[#FBF8F3] p-3 text-xs text-[#666C60]">
              <p className="font-medium text-[#1f241f]">Por qué confiar</p>
              <ul className="mt-1 space-y-1">
                <li>· Negocio local de {entrepreneur.zone}</li>
                <li>· {entrepreneur.responseTime}</li>
                <li>· {entrepreneur.reviews} reseñas verificadas</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE STICKY CART BAR */}
      {cart && cartCount > 0 ? (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 lg:hidden">
          <div className="rounded-2xl border border-[#C8D4BF] bg-white p-3 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1f241f]">
                <ShoppingBag size={15} /> {cartCount} {cartCount === 1 ? "producto" : "productos"}
              </p>
              <p className="text-sm font-semibold text-[#6E7F63]">{formatPrice(cartTotal)}</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/niar/carrito"
                className="rounded-xl bg-[#EEF3EA] px-3 py-2 text-center text-sm font-medium text-[#6E7F63]"
              >
                Ver carrito
              </Link>
              <a
                href={buildWhatsAppLink(cart)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#25D366] px-3 py-2 text-sm font-medium text-white"
              >
                <Send size={14} /> Pedir
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 lg:hidden">
          <a
            href={directWhatsAppLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            <Sparkles size={15} /> Escribir por WhatsApp
          </a>
        </div>
      )}
    </main>
  );
}
