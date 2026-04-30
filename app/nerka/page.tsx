import Link from "next/link";
import {
  ArrowRight,
  Compass,
  ImagePlus,
  PackagePlus,
  Send,
  Sparkles,
  Store,
} from "lucide-react";
import { EntrepreneurCard, EventCard } from "@/components/nerka/cards";
import {
  CategoryChips,
  NerkaHeader,
  QuickActionCard,
  SearchBar,
  SectionTitle,
} from "@/components/nerka/ui";
import { categories, entrepreneurs, events, popularProducts } from "@/lib/nerka-data";
import { formatPrice } from "@/lib/orders";

export default function NerkaHomePage() {
  return (
    <main>
      <NerkaHeader />
      <div className="space-y-7 px-4 py-4 lg:space-y-10 lg:px-8 lg:py-8">
        {/* HERO */}
        <section className="space-y-4 rounded-3xl bg-gradient-to-br from-[#5B2EFF] via-[#3f1bbd] to-[#2B174F] p-5 text-white lg:p-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
              <Sparkles size={12} /> Marketplace local
            </p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight lg:text-3xl">
              Comprá a emprendedores cerca tuyo. <span className="opacity-80">O empezá a vender hoy.</span>
            </h1>
            <p className="mt-2 text-sm text-white/90 lg:text-base">
              Catálogos reales, pedidos por WhatsApp, sin pagos online ni complicaciones.
            </p>
          </div>
          <SearchBar placeholder="Buscá por rubro, nombre o producto" />
          <CategoryChips items={["Gastronomía", "Moda", "Belleza", "Hogar y deco", "Regalería", "Servicios", "Mascotas", "Más"]} />
        </section>

        {/* SELLER CTA — prominent */}
        <section className="grid gap-3 rounded-3xl border border-[#ece8f7] bg-white p-5 lg:grid-cols-[1fr_auto] lg:items-center lg:p-7">
          <div>
            <p className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E8] px-2.5 py-1 text-xs font-semibold text-[#9b5a00]">
              <Store size={12} /> Para emprendedores
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#1f1833] lg:text-2xl">
              Empezá a vender en minutos
            </h2>
            <p className="mt-1 text-sm text-[#6F6A7C]">
              Creá tu perfil, cargá productos, compartí el link de tu tienda y recibí pedidos por
              WhatsApp. Sin saber nada técnico.
            </p>
            <ul className="mt-3 grid gap-1 text-sm text-[#433d56] sm:grid-cols-3">
              <li className="inline-flex items-center gap-1.5"><PackagePlus size={14} className="text-[#5B2EFF]" /> Catálogo simple</li>
              <li className="inline-flex items-center gap-1.5"><Send size={14} className="text-[#5B2EFF]" /> Pedidos por WhatsApp</li>
              <li className="inline-flex items-center gap-1.5"><Sparkles size={14} className="text-[#5B2EFF]" /> Mejorá con IA</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <Link
              href="/nerka/perfil"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-sm font-medium text-white"
            >
              Crear mi tienda <ArrowRight size={15} />
            </Link>
            <Link
              href="/nerka/perfil"
              className="text-center text-xs font-medium text-[#5B2EFF]"
            >
              Ver mi panel
            </Link>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>
          <SectionTitle
            title="Qué querés hacer hoy"
            subtitle="Atajos rápidos para comprar y vender"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <QuickActionCard
              href="/nerka/explorar"
              title="Buscar emprendimientos"
              description="Compará tiendas por zona y rubro"
              tone="bg-[#F2ECFF]"
              icon={<Compass size={18} />}
            />
            <QuickActionCard
              href="/nerka/perfil"
              title="Cargar productos"
              description="Sumá productos a tu catálogo"
              tone="bg-[#FFEFE7]"
              icon={<PackagePlus size={18} />}
            />
            <QuickActionCard
              href="/nerka/perfil"
              title="Mejorar publicaciones"
              description="Generá descripciones con IA"
              tone="bg-[#E8FFF5]"
              icon={<Sparkles size={18} />}
            />
            <QuickActionCard
              href="/nerka/carrito"
              title="Ver mi carrito"
              description="Enviá tu pedido por WhatsApp"
              tone="bg-[#FFFBE7]"
              icon={<ImagePlus size={18} />}
            />
          </div>
        </section>

        {/* CATEGORIES */}
        <section>
          <SectionTitle
            title="Categorías"
            subtitle="Encontrá tu rubro"
            cta="Ver todas"
            href="/nerka/explorar"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href="/nerka/explorar"
                className="rounded-2xl border border-[#ece8f7] bg-white p-3 text-sm font-medium text-[#2B174F] transition hover:border-[#d9cef8] hover:bg-[#F2ECFF]"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED ENTREPRENEURS */}
        <section>
          <SectionTitle
            title="Tiendas destacadas en tu zona"
            subtitle="Emprendimientos verificados que responden rápido"
            cta="Ver todos"
            href="/nerka/explorar"
          />
          <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible xl:grid-cols-4">
            {entrepreneurs.slice(0, 5).map((entrepreneur) => (
              <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} horizontal />
            ))}
          </div>
        </section>

        {/* POPULAR PRODUCTS */}
        <section>
          <SectionTitle
            title="Productos populares cerca tuyo"
            cta="Ver más"
            href="/nerka/explorar"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {popularProducts.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                href={`/nerka/emprendedores/${product.entrepreneurId}`}
                className="overflow-hidden rounded-2xl border border-[#ece8f7] bg-white shadow-sm transition hover:shadow-md"
              >
                <img src={product.image} alt={product.name} className="h-28 w-full object-cover" />
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-semibold text-[#1f1833]">{product.name}</p>
                  <p className="line-clamp-1 text-xs text-[#6F6A7C]">{product.entrepreneurName}</p>
                  <p className="mt-1 text-sm font-semibold text-[#5B2EFF]">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* EVENTS */}
        <section>
          <SectionTitle title="Ferias y showrooms próximos" cta="Ver agenda" href="/nerka/eventos" />
          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {events.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
