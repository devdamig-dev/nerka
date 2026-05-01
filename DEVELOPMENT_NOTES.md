# Nerka — Notas de desarrollo

Estado actual: **MVP funcional sin backend**, ahora con **doble entrada** (visitante + emprendedor) y arquitectura preparada para auth, billing y mensajería real.

## Visión

Nerka es el puente entre **emprendedores locales** y **clientes reales**. NO es una tienda online completa: el cierre de la operación siempre es conversacional (WhatsApp o mensajería interna).

- **Visitante / cliente** → descubre, recorre catálogos, agrega productos al carrito, consulta.
- **Emprendedor** → crea perfil comercial, carga catálogo, recibe pedidos, gestiona mensajes y plan.

---

## Stack

- Next.js 16.2.4 (App Router, Turbopack) — docs en `node_modules/next/dist/docs/`.
- React 19 con React Compiler activo (evitar `useMemo`/`useCallback` salvo motivo claro).
- Tailwind v4.
- TypeScript estricto.
- `lucide-react` para iconos.

## Estructura

```
app/
  page.tsx                          Landing pública (doble entrada)
  nerka/
    layout.tsx                      RoleProvider → CartProvider → AppShell
    page.tsx                        Home — VisitorHome | EntrepreneurHome
    carrito/page.tsx                Carrito multi-tienda + WhatsApp/interno
    favoritos/page.tsx              Tiendas guardadas (visitante)
    perfil/
      page.tsx                      Mi cuenta (visitante) | Mi negocio (emprendedor)
      catalogo/page.tsx             Catálogo del emprendedor
      nuevo-producto/page.tsx       Form de alta de producto (mock)
    planes/page.tsx                 Free / Pro (próximamente) / Negocio (próximamente)
    explorar/page.tsx               Marketplace con filtros
    emprendedores/[id]/page.tsx     Storefront pública del emprendedor
    mensajes/
      page.tsx                      Bandeja
      nuevo/page.tsx                Iniciar conversación con prellenado (perfil/producto)
      [id]/page.tsx                 Chat existente
    eventos/                        (etapa anterior, se mantiene)
    solicitudes/                    (etapa anterior, se mantiene)

components/nerka/
  ui.tsx                            Shell, nav role-based, header, search, badges, RoleBadge
  cards.tsx                         EntrepreneurCard (con CTA mensaje), EventCard, RequestCard, ConversationCard
  product-card.tsx                  Card de producto con add-to-cart + Consultar prefilled
  chat.tsx                          Vista de propuesta

lib/
  types.ts                          User, UserRole, BusinessProfile, Product, CartItem, Order, Conversation, Message, SubscriptionPlan, AnalyticsMetric
  nerka-data.ts                     Seed de emprendedores, eventos, solicitudes, conversaciones
  cart-context.tsx                  CartProvider + useCart (localStorage)
  role-context.tsx                  RoleProvider + useRole (localStorage) + favorites
  orders.ts                         buildWhatsAppLink, buildOrderMessage, formatPrice
  plans.ts                          subscriptionPlans seed
  messages-mock.ts                  Drafts en localStorage para "Enviar mensaje"
```

## Modelo de datos (`lib/types.ts`)

### Identity / roles
- **`User`** — `id`, `name`, `avatar?`, `role: 'visitor' | 'entrepreneur'`, `zone?`, `businessProfileId?` (si role=entrepreneur), `favorites: string[]`.
- **`UserRole`** = `'visitor' | 'entrepreneur'`.
- **`BusinessProfile`** = `Profile` (alias para nomenclatura backend).

### Catálogo
- **`Profile`** — perfil comercial con catálogo, badges, modalidades, etc.
- **`Product`** — `id`, `name`, `description`, `image`, `price?`, `type: 'product' | 'service'`, `available`, `unit?`, `featured?`.
- **`TrustBadge`** — `'Verificado' | 'Responde rápido' | 'Top en tu zona' | 'Nuevo en Nerka' | 'Recomendado'`.
- **`Modality`** — `'retiro' | 'envío' | 'atención a domicilio' | 'online'`.

### Pedidos
- **`CartItem`** = **`OrderItem`** — `productId`, `name`, `price?`, `quantity`, `unit?`.
- **`OrderChannel`** — `'whatsapp' | 'internal'`.
- **`OrderStatus`** — `'borrador' | 'enviado' | 'confirmado' | 'completado' | 'cancelado'`.
- **`Order`** — todo lo necesario para persistir un pedido (no se persiste hoy; sólo se materializa el mensaje al destinatario).

### Mensajería
- **`Conversation`** — `id`, `entrepreneurId`, `buyerId?`, `requestId?`, `productId?`, `lastMessage`, `status`, `summary`, `timestamp`, `unread?`.
- **`Message`** — `id`, `conversationId`, `senderRole`, `text`, `at`, `createdAt`.
- **`ConversationStatus`** — `'Presupuesto enviado' | 'En conversación' | ...`.

### Planes y métricas
- **`SubscriptionPlan`** — `id: 'free' | 'pro' | 'business'`, `name`, `tagline`, `price`, `status: 'active' | 'coming_soon'`, `features`, `cta`.
- **`AnalyticsMetric`** — `key`, `label`, `value`, `trend?`, `format?`.

## Lógica de roles (mock)

`lib/role-context.tsx` provee `useRole()`:

- `user`, `isEntrepreneur`, `isVisitor`, `setRole`, `toggleRole`, `toggleFavorite`, `isFavorite`.
- Persiste en `localStorage` clave `nerka.user.v1`.
- Default: `visitor` con nombre "Martina", zona "Berazategui".
- Cuando se cambia a `entrepreneur`, asigna por defecto `businessProfileId = 'dulce-tentacion'` y nombre "Dulce Tentación" (para demo).

**Componentes reaccionan al rol:**

- `DesktopSidebar` y `NerkaBottomNav` muestran navegación distinta.
- Topbar dinámico con título contextual según ruta y rol.
- `/nerka/page.tsx` renderiza `VisitorHome` o `EntrepreneurHome`.
- `/nerka/perfil/page.tsx` renderiza `VisitorAccount` o `EntrepreneurDashboard`.

**Toggle visible en:**
- Sidebar desktop: pill "Estás como X · cambiar".
- Topbar desktop: botón "Soy emprendedor" / "Ver como visitante".
- Home visitor: card secundaria "¿Tenés un emprendimiento? Activar mi perfil".
- Mi cuenta (visitor): mismo CTA.

## Carrito

`lib/cart-context.tsx`:
- Carrito **por emprendedor** (`Record<profileId, SellerCart>`).
- Persiste en `localStorage` (`nerka.cart.v1`).
- `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `getSellerCart`.
- En `/nerka/carrito` se ve resumen multi-tienda con WhatsApp + mensaje interno por seller.

## Flujo "Enviar mensaje"

Antes el botón llevaba a `/nerka/mensajes` (bandeja general). Hoy:

- Desde **perfil emprendedor** → `/nerka/mensajes/nuevo?to=<id>` con prellenado:
  > "Hola {Nombre}, vi tu perfil en Nerka y quería consultarte."
- Desde **producto** (botón Consultar) → `/nerka/mensajes/nuevo?to=<id>&product=<productId>` con prellenado:
  > "Hola {Nombre}, vi este producto en tu catálogo: \"{Producto}\". ¿Está disponible?"
- Desde **EntrepreneurCard** del listado → `/nerka/mensajes/nuevo?to=<id>` (icono mensaje).

`/nerka/mensajes/nuevo`:
- Permite editar el mensaje sugerido.
- Quick replies (¿Está disponible? · ¿Hacés envíos? · etc.).
- 2 botones de envío: **mensaje interno** (mock que pushea a `localStorage` `nerka.drafts.v1`) y **WhatsApp** (link real).
- Al enviar interno, redirige a `/nerka/mensajes` y muestra el draft como conversación nueva (banner violeta).

## Planes

`/nerka/planes` muestra:
- **Gratis** (active) — perfil + catálogo + pedidos por WhatsApp + mensajería interna.
- **Pro** (coming_soon, highlight) — visibilidad, métricas, prioridad.
- **Negocio** (coming_soon) — catálogo avanzado, IA, métricas completas.

CTA "Quiero potenciar mi negocio" registra interés en `localStorage` (`nerka.interest.v1`) + `console.log`. Ningún pago real.

## Trust signals

Badges actuales:
- `Verificado` (verde)
- `Responde rápido` (naranja)
- `Top en tu zona` (violeta)
- `Recomendado` (rosa)
- `Nuevo en Nerka` (azul)

Otras señales en perfil: rating, reviews, zone, response time, modalities, productCount.

---

## Roadmap backend

### Auth y multi-perfil
- NextAuth.js con magic link / Google.
- Tabla `users` y `business_profiles` separadas (1 user puede tener N perfiles comerciales en el futuro).
- Reemplazar `RoleProvider.user.businessProfileId` por sesión real.
- Permisos:
  - **visitor** → lectura pública, escribir mensajes propios, gestionar carrito y favoritos propios.
  - **entrepreneur** → todo lo anterior + CRUD del propio `BusinessProfile` y sus `Products`, lectura de `Orders` y `Conversations` que lo tengan como destinatario.

### Endpoints sugeridos

```
# Perfiles
GET    /api/profiles                              listado público con filtros
GET    /api/profiles/:id                          detalle + catálogo
POST   /api/profiles                  (auth)      activar perfil de emprendedor
PUT    /api/profiles/:id              (auth)      editar mi perfil

# Productos
GET    /api/profiles/:id/products
POST   /api/profiles/:id/products     (auth)      alta
PUT    /api/products/:id              (auth)      editar (toggle availability, etc.)
DELETE /api/products/:id              (auth)

# Carrito (server-backed opcional para sync entre devices)
GET    /api/cart                      (auth)
POST   /api/cart/items                (auth)
PATCH  /api/cart/items/:id            (auth)
DELETE /api/cart/items/:id            (auth)

# Pedidos
POST   /api/orders                    (auth)      crear order (channel: whatsapp | internal)
GET    /api/orders/me                 (auth)      como vendedor
GET    /api/orders/buyer              (auth)      como comprador

# Mensajería
GET    /api/conversations             (auth)
POST   /api/conversations             (auth)      crear o reusar conversación con un perfil
GET    /api/conversations/:id/messages
POST   /api/conversations/:id/messages

# Favoritos
GET    /api/favorites                 (auth)
POST   /api/favorites                 (auth)
DELETE /api/favorites/:profileId      (auth)

# Planes
GET    /api/plans
POST   /api/plans/interest            (auth)      registrar interés en Pro/Negocio

# IA (futuro)
POST   /api/ai/describe               (auth)      genera descripción
POST   /api/ai/price-suggestion       (auth)      rango de precio sugerido
POST   /api/ai/social-post            (auth)      caption para redes
```

### Stack sugerido
- **DB**: Postgres (Neon o Supabase) + Drizzle.
- **Auth**: NextAuth.
- **Storage** (imágenes catálogo): UploadThing o S3.
- **Realtime mensajería**: Pusher / Ably (futuro).
- **IA**: Anthropic SDK (`@anthropic-ai/sdk`) con prompt caching para los prompts de sistema.

### Migración de mocks → backend

| Mock actual                                  | Backend equivalente                          |
|----------------------------------------------|----------------------------------------------|
| `lib/role-context.tsx` user state            | session + `users` table                       |
| `lib/cart-context.tsx` localStorage carts    | `/api/cart` server-backed (opcional)          |
| `lib/messages-mock.ts` drafts                | `POST /api/conversations` + `/messages`       |
| `lib/plans.ts` static plans                  | `GET /api/plans` (mismo shape)                |
| `lib/nerka-data.ts` entrepreneurs/events/... | `/api/profiles`, `/api/events`, etc.          |

Mantener los **tipos** de `lib/types.ts` para que la UI siga funcionando sin cambios.

---

## Próximas fases

### Fase 2 — Backend mínimo
- Auth + perfil propio editable.
- CRUD de productos.
- Pedidos persistidos (sólo metadata, el cierre sigue siendo por WhatsApp).
- Mensajería interna real (con notificaciones in-app).

### Fase 3 — Monetización
- Activar Pro y Negocio (Stripe / MercadoPago Suscripciones).
- Dashboard de métricas reales para el emprendedor.

### Fase 4 — Capa IA
- Generación de descripciones, sugerencias de precio, captions para redes.
- Recomendador de tiendas para visitantes.

### Fase 5 — Avanzado (sólo si lo piden los usuarios)
- Pagos online dentro de Nerka.
- Integración con logística (Andreani, Correo Argentino).
- Dominio personalizado (`misitio.nerka.app` o `misitio.com.ar`).

---

## Convenciones

- **No agregar `useMemo`/`useCallback`** salvo cuando el lint de React Compiler lo pida. Para hidratación de localStorage, el patrón estándar es `useEffect` + `setState` con `// eslint-disable-next-line react-hooks/set-state-in-effect`.
- **`useSearchParams`** debe envolverse en `<Suspense>` (rutas: `/nerka/explorar` y `/nerka/mensajes/nuevo` ya lo hacen).
- **Tipos** centralizados en `lib/types.ts`. `lib/nerka-data.ts` los re-exporta.
- **`<img>` warnings** se aceptan porque las imágenes son de Unsplash externo. Cuando haya backend con uploads propios, migrar a `next/image` con `remotePatterns`.
- Cualquier nueva ruta cliente que use estado debe respetar el orden de providers: `RoleProvider → CartProvider → AppShell`.
