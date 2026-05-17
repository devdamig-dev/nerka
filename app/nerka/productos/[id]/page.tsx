"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/nerka/product-card";
import { BadgeTrust, EmptyState, SectionTitle } from "@/components/nerka/ui";
import { getProductById, getRelatedProducts } from "@/lib/nerka-data";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/orders";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const match = getProductById(params.id);
  const related = getRelatedProducts(params.id, 12);
  const { addItem, getSellerCart, updateQuantity } = useCart();

  if (!match) {
    return (
      <main className="niar-page">
        <EmptyState
          title="Producto no encontrado"
          description="Este producto ya no está disponible o cambió de catálogo."
          cta="Volver a explorar"
          href="/niar/explorar"
        />
      </main>
    );
  }

  const { product, entrepreneur } = match;
  const cart = getSellerCart(entrepreneur.id);
  const quantity = cart?.items[product.id]?.quantity ?? 0;
  const canAddToCart = product.available && product.type === "product" && typeof product.price === "number";
  const gallery = [product.image, entrepreneur.cover, entrepreneur.avatar];
  const sameBusiness = entrepreneur.catalog.filter((item) => item.id !== product.id).slice(0, 3);
  const productRelated = related.filter(({ entrepreneur: owner, reason }) => owner.id !== entrepreneur.id && reason === "Categoría cercana").slice(0, 4);
  const similarNearby = related.filter(({ entrepreneur: owner, reason }) => owner.id !== entrepreneur.id && reason === "Similar cerca tuyo").slice(0, 4);
  const whatsAppLink = `https://wa.me/${entrepreneur.contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hola ${entrepreneur.name}, vi ${product.name} en NIAR y quería consultar disponibilidad.`,
  )}`;

  return (
    <main className="niar-page pb-36 lg:pb-12">
      <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="niar-link mb-5 inline-flex items-center gap-2 text-sm">
        <ArrowLeft size={15} /> Volver a {entrepreneur.name}
      </Link>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.72fr)] lg:items-start">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-[#1f241f] shadow-[0_30px_90px_rgba(79,89,68,0.16)]">
            <img src={product.image} alt={product.name} className="h-[430px] w-full object-cover lg:h-[680px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f241f]/72 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/92 px-3.5 py-1.5 text-xs font-bold text-[#2F3A2B] ring-1 ring-white/80 backdrop-blur">{entrepreneur.category}</span>
              {product.featured ? <span className="rounded-full bg-[#1f241f]/72 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">Tendencia esta semana</span> : null}
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="inline-flex items-center gap-1 text-sm font-medium text-white/92"><MapPin size={14} /> {entrepreneur.zone} · Abierto ahora</p>
              <h1 className="mt-2 max-w-4xl text-4xl font-semibold tracking-[-0.05em] lg:text-6xl">{product.name}</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {gallery.map((image, index) => (
              <img key={image} src={image} alt={`${product.name} ${index + 1}`} className="h-28 rounded-[1.4rem] object-cover ring-1 ring-[#E6DDD0] lg:h-40" />
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="niar-card space-y-6 p-5 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#2F3A2B]">{entrepreneur.subcategory}</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#1f241f]">{product.name}</h2>
                <Link href={`/niar/emprendedores/${entrepreneur.id}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#4F554B]">
                  <img src={entrepreneur.avatar} alt={entrepreneur.name} className="h-8 w-8 rounded-full object-cover" />
                  {entrepreneur.name}
                </Link>
              </div>
              {entrepreneur.badges.includes("Verificado") ? (
                <span className="niar-badge"><ShieldCheck size={13} /> Verificado</span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {entrepreneur.badges.map((badge) => <BadgeTrust key={badge} badge={badge} />)}
            </div>

            <p className="text-base leading-7 text-[#555C51]">
              {product.description} Una propuesta curada por {entrepreneur.name}, pensada para descubrir opciones locales con compra simple y conversación directa.
            </p>

            <div className="rounded-[1.5rem] bg-[#F7F2EA] p-4 ring-1 ring-[#E6DDD0]">
              {product.price ? (
                <p className="text-3xl font-semibold tracking-[-0.03em] text-[#1f241f]">{formatPrice(product.price)}</p>
              ) : (
                <p className="text-xl font-semibold text-[#1f241f]">Precio a coordinar</p>
              )}
              <p className="mt-1 text-sm text-[#4F554B]">{product.unit ? `por ${product.unit}` : "Se confirma disponibilidad con el negocio"}</p>
            </div>

            <div className="grid gap-3 text-sm text-[#555C51] sm:grid-cols-2">
              <InfoPill icon={<Truck size={15} />} title="Entrega / retiro" text={entrepreneur.modality} />
              <InfoPill icon={<Clock size={15} />} title="Respuesta" text={entrepreneur.responseTime} />
              <InfoPill icon={<Sparkles size={15} />} title="Variantes" text="Personalizable según stock" />
              <InfoPill icon={<CheckCircle2 size={15} />} title="Zona" text={entrepreneur.coverage} />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#1f241f]">Opciones disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.type === "product" ? ["Tamaño estándar", "Color de temporada", "Retiro", "Envío coordinado"].map((label) => (
                  <span key={label} className="rounded-full border border-[#E6DDD0] bg-white px-3 py-1.5 text-xs font-medium text-[#4F554B]">{label}</span>
                )) : ["Presupuesto", "Agenda", "A domicilio", "Brief simple"].map((label) => (
                  <span key={label} className="rounded-full border border-[#E6DDD0] bg-white px-3 py-1.5 text-xs font-medium text-[#4F554B]">{label}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {canAddToCart ? (
                quantity > 0 ? (
                  <div className="flex items-center justify-between rounded-2xl bg-[#EEF3EA] p-2 ring-1 ring-[#C8D4BF] sm:col-span-2">
                    <button type="button" onClick={() => updateQuantity(entrepreneur.id, product.id, quantity - 1)} className="rounded-xl bg-white p-2 text-[#2F3A2B] shadow-sm transition hover:-translate-y-0.5" aria-label="Quitar uno"><Minus size={16} /></button>
                    <span className="text-sm font-semibold text-[#1f241f]">{quantity} en tu carrito</span>
                    <button type="button" onClick={() => updateQuantity(entrepreneur.id, product.id, quantity + 1)} className="rounded-xl bg-white p-2 text-[#2F3A2B] shadow-sm transition hover:-translate-y-0.5" aria-label="Agregar uno"><Plus size={16} /></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => addItem({ profileId: entrepreneur.id, profileName: entrepreneur.name, contactPhone: entrepreneur.contactPhone, product })} className="niar-primary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold sm:col-span-2">
                    <ShoppingBag size={16} /> Agregar al carrito
                  </button>
                )
              ) : null}
              <a href={whatsAppLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm">
                <Send size={16} /> Pedir por WhatsApp
              </a>
              <Link href={`/niar/mensajes/nuevo?to=${entrepreneur.id}&product=${product.id}`} className="niar-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
                <MessageCircle size={16} /> Consultar
              </Link>
              <button type="button" className="niar-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
                <Bookmark size={16} /> Guardar
              </button>
              <button type="button" onClick={() => navigator?.clipboard?.writeText(window.location.href)} className="niar-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold">
                <Share2 size={16} /> Compartir
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        <article className="niar-card p-6">
          <Heart className="text-[#6E7F63]" size={20} />
          <h3 className="mt-4 text-xl font-semibold text-[#1f241f]">Confianza local</h3>
          <p className="mt-2 text-sm leading-6 text-[#666C60]">{entrepreneur.name} acumula {entrepreneur.reviews} reseñas y suele responder con ritmo comercial claro.</p>
        </article>
        <article className="niar-card p-6">
          <ShoppingBag className="text-[#6E7F63]" size={20} />
          <h3 className="mt-4 text-xl font-semibold text-[#1f241f]">Pedido sin fricción</h3>
          <p className="mt-2 text-sm leading-6 text-[#666C60]">Agregá productos, armá tu carrito y cerrá detalles por WhatsApp o mensaje interno.</p>
        </article>
        <article className="niar-card p-6">
          <MapPin className="text-[#6E7F63]" size={20} />
          <h3 className="mt-4 text-xl font-semibold text-[#1f241f]">Exploración cercana</h3>
          <p className="mt-2 text-sm leading-6 text-[#666C60]">Descubrí alternativas de la misma categoría, negocios cercanos y productos del mismo perfil.</p>
        </article>
      </section>

      {sameBusiness.length ? (
        <section className="mt-12">
          <SectionTitle title="Más del mismo negocio" subtitle={`Seguí explorando el catálogo de ${entrepreneur.name}`} />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sameBusiness.map((item) => (
              <ProductCard key={item.id} product={item} profileId={entrepreneur.id} profileName={entrepreneur.name} contactPhone={entrepreneur.contactPhone} />
            ))}
          </div>
        </section>
      ) : null}

      {productRelated.length ? (
        <section className="mt-12">
          <SectionTitle title="Productos relacionados" subtitle={`Más opciones de ${entrepreneur.category.toLowerCase()} para comparar antes de consultar`} />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {productRelated.map(({ item, entrepreneur: owner, reason }) => (
              <div key={`${owner.id}-${item.id}`} className="space-y-2">
                <span className="niar-badge">{reason}</span>
                <ProductCard product={item} profileId={owner.id} profileName={owner.name} contactPhone={owner.contactPhone} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {similarNearby.length ? (
        <section className="mt-12">
          <SectionTitle title="Similares cerca tuyo" subtitle="Alternativas locales por tipo de producto o servicio, pensadas para seguir descubriendo sin salir de NIAR" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {similarNearby.map(({ item, entrepreneur: owner, reason }) => (
              <div key={`${owner.id}-${item.id}`} className="space-y-2">
                <span className="niar-badge">{reason}</span>
                <ProductCard product={item} profileId={owner.id} profileName={owner.name} contactPhone={owner.contactPhone} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoPill({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#DCD2C5] bg-white p-3 shadow-sm">
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F3A2B]">{icon}{title}</p>
      <p className="mt-1 text-sm text-[#555C51]">{text}</p>
    </div>
  );
}
