# Nerka — Notas de desarrollo

Estado actual: **MVP funcional, sin backend**. Toda la data viene de
`lib/nerka-data.ts` (mock estático) y el carrito persiste en `localStorage`
vía `lib/cart-context.tsx`.

El producto está orientado a que un emprendedor local pueda:

1. Crear su perfil comercial (mock).
2. Cargar productos / servicios (mock — el dashboard muestra el flujo).
3. Compartir su tienda como link público.
4. Recibir pedidos por **WhatsApp** o **mensajería interna** (mock).

> Nerka **no procesa pagos**, **no gestiona envíos**, **no maneja dominios
> personalizados**. El cierre de la operación es siempre conversacional.

---

## Stack

- Next.js 16.2.4 (App Router, Turbopack) — ver `node_modules/next/dist/docs/`.
- React 19 (con React Compiler activo — evitar `useMemo` manual cuando se pueda).
- Tailwind v4.
- TypeScript estricto.
- `lucide-react` para iconos.

## Estructura

```
app/
  page.tsx                  Landing pública (vendé / explorá)
  nerka/
    layout.tsx              CartProvider + AppShell
    page.tsx                Home logueado
    carrito/page.tsx        Carrito multi-emprendedor + WhatsApp/interno
    perfil/page.tsx         Dashboard de vendedor (checklist, IA, catálogo)
    explorar/page.tsx       Búsqueda y filtros de tiendas
    emprendedores/[id]/     Tienda pública del emprendedor
    mensajes/               Bandeja + chat
    solicitudes/            Solicitudes (etapa anterior, se mantiene)
    eventos/                Ferias (etapa anterior, se mantiene)
components/nerka/
  ui.tsx                    Shell, nav, header, search, empty states
  cards.tsx                 EntrepreneurCard, EventCard, etc.
  product-card.tsx          Card de producto con add-to-cart
  chat.tsx                  Vista de propuesta
lib/
  types.ts                  Profile, Product, Order, OrderItem, etc.
  nerka-data.ts             Mock data + re-exports
  cart-context.tsx          CartProvider + useCart hook + localStorage
  orders.ts                 buildOrderMessage, buildWhatsAppLink, formatPrice
```

## Modelo de datos (lib/types.ts)

- **Profile** — perfil comercial: id, name, category, subcategory, zone,
  coverage, rating, reviews, badges, about, offers, responseTime, modality,
  contactPhone (E.164 sin +), modalities, catalog: Product[].
- **Product** — id, name, description, image, price?, type
  (`product` | `service`), available, unit?, featured?.
- **Order / OrderItem / OrderChannel / OrderStatus** — definidos para futura
  persistencia. El flujo actual genera mensajes de pedido pero no guarda el
  Order en el cliente (solo el carrito).

## Carrito (`lib/cart-context.tsx`)

- Un carrito **por emprendedor** (`Record<profileId, SellerCart>`).
- Persiste en `localStorage` bajo la clave `nerka.cart.v1`.
- Reglas:
  - `addItem` requiere snapshot mínimo del producto (id, nombre, precio, unidad, imagen).
  - `updateQuantity(qty <= 0)` elimina la línea.
  - Si se vacía un seller cart, se descarta la entrada completa.
- `buildWhatsAppLink(cart, { note })` arma mensaje automático con productos,
  cantidades, total estimado y nota opcional.

## Pendientes sugeridos (siguiente etapa)

### Backend mínimo
Endpoints necesarios para reemplazar el mock:

- `GET /api/profiles` — listado público (filtros: zone, category, type).
- `GET /api/profiles/:id` — perfil completo + catálogo.
- `POST /api/profiles` (auth) — crear/editar mi perfil.
- `POST /api/profiles/:id/products` (auth) — alta de producto.
- `PUT /api/products/:id` — editar (toggle availability, editar precio).
- `DELETE /api/products/:id`.
- `POST /api/orders` — registrar la intención de pedido (channel:
  `whatsapp` | `internal`), incluso cuando termine en WhatsApp, para métricas.
- `GET /api/orders/me` (auth) — pedidos recibidos como vendedor.
- `POST /api/messages` (auth) — mensajes internos por orden.

Stack sugerido: Vercel + Postgres (Neon) + Drizzle/Prisma + NextAuth.
Mantener Vercel para deploy (no requiere config adicional).

### Auth y multi-perfil
- Una persona puede ser **comprador** y **vendedor** al mismo tiempo.
- En `app/nerka/perfil/page.tsx` se asume que el usuario logueado es
  `entrepreneurs[0]`. Reemplazar por sesión real (NextAuth) y un `useMyProfile()`.

### Mejoras de catálogo
- Subida de imágenes (UploadThing / S3).
- Variantes (tamaños / colores) — opcional, sólo si lo piden los emprendedores.
- Stock numérico (no sólo `available: boolean`).
- Categorías configurables por emprendedor.

### Mensajería interna real
- El `/nerka/carrito` ya tiene un botón "Enviar por mensaje interno" que es
  visual. Conectar con `POST /api/messages` y crear conversación si no existe.
- WebSocket / SSE para mensajes en vivo.

### IA (placeholder ya cargado)
- En `/nerka/perfil` hay una sección "Asistente IA" como UX placeholder.
- Endpoints sugeridos:
  - `POST /api/ai/describe` — input: nombre + categoría → descripción del producto.
  - `POST /api/ai/price-suggestion` — input: producto + zona → rango de precio.
  - `POST /api/ai/social-post` — genera caption para redes con el link.
- Integrar con Claude API (`@anthropic-ai/sdk`) usando prompt caching para
  los prompts del sistema.

### Mini tienda avanzada (fuera de scope actual)
Sólo si emprendedores lo piden:
- Pagos online (MercadoPago Checkout Pro).
- Gestión de envíos (Andreani / Correo Argentino).
- Dominio propio (`misitio.nerka.app` o `misitio.com.ar`).

### UX / Performance
- Reemplazar `<img>` por `next/image` en el catálogo público (los warnings de
  lint vienen de ahí). Hoy se mantienen para no agregar complejidad de
  configuración de remotePatterns para Unsplash.
- Skeletons de carga mientras se hidrata el carrito.
- Empty states del seller dashboard para nuevos usuarios (catálogo vacío).

### Métricas
- Eventos: `view_profile`, `add_to_cart`, `cart_open`, `order_sent_whatsapp`,
  `order_sent_internal`.
- Mostrar en dashboard del vendedor (la card "Esta semana" hoy es mock).

## Convenciones

- Datos en `lib/nerka-data.ts` están tipados desde `lib/types.ts`. Cuando se
  reemplace por backend, mantener los tipos en `lib/types.ts` para que el UI
  siga funcionando.
- Cuando se agregan nuevas páginas con estado de cliente, recordar que el
  `CartProvider` envuelve `app/nerka/layout.tsx` — no envolver de nuevo.
- React Compiler está activo (Next 16). Evitar `useMemo` / `useCallback`
  manuales salvo que haya un motivo claro (estabilidad de referencia para
  `useEffect`, etc.).
