export type TrustBadge =
  | "Verificado"
  | "Responde rápido"
  | "Top en tu zona"
  | "Nuevo en Niar"
  | "Recomendado";

export type ConversationStatus =
  | "Presupuesto enviado"
  | "En conversación"
  | "Esperando respuesta"
  | "Propuesta aceptada";

export type RequestStatus = "Recibiendo propuestas" | "En evaluación" | "Cerrada";

export type CatalogItemType = "product" | "service";

export type Modality = "retiro" | "envío" | "atención a domicilio" | "online";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  type: CatalogItemType;
  available: boolean;
  unit?: string;
  featured?: boolean;
};

export type Profile = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  zone: string;
  coverage: string;
  cover: string;
  avatar: string;
  badges: TrustBadge[];
  about: string;
  offers: string[];
  responseTime: string;
  modality: string;
  contactPhone: string;
  modalities: Modality[];
  catalog: Product[];
};

// Alias kept for back-compat with existing code.
export type CatalogItem = Product;

// ─────────────────────────────────────────────────────────────────────
// Identity
// ─────────────────────────────────────────────────────────────────────

export type UserRole = "visitor" | "entrepreneur";

export type User = {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  zone?: string;
  /** Si role === 'entrepreneur', a qué Profile (BusinessProfile) pertenece. */
  businessProfileId?: string;
  favorites: string[]; // profileIds
};

// BusinessProfile = Profile en el modelo backend futuro.
export type BusinessProfile = Profile;

// ─────────────────────────────────────────────────────────────────────
// Cart / Orders
// ─────────────────────────────────────────────────────────────────────

export type OrderItem = {
  productId: string;
  name: string;
  price?: number;
  quantity: number;
  unit?: string;
};

export type CartItem = OrderItem;

export type OrderChannel = "whatsapp" | "internal";

export type OrderStatus =
  | "borrador"
  | "enviado"
  | "confirmado"
  | "completado"
  | "cancelado";

export type Order = {
  id: string;
  profileId: string;
  profileName: string;
  buyerId?: string;
  items: OrderItem[];
  total: number;
  channel: OrderChannel;
  status: OrderStatus;
  note?: string;
  createdAt: string;
};

// ─────────────────────────────────────────────────────────────────────
// Messaging
// ─────────────────────────────────────────────────────────────────────

export type Message = {
  id: string;
  conversationId: string;
  senderRole: UserRole;
  text: string;
  at: string; // display time
  createdAt: string; // ISO
};

export type Conversation = {
  id: string;
  /** Quién es el otro lado de la conversación, desde la perspectiva del usuario actual. */
  entrepreneurId: string;
  buyerId?: string;
  requestId?: string;
  productId?: string;
  lastMessage: string;
  status: ConversationStatus;
  summary: string;
  timestamp: string;
  unread?: number;
};

// ─────────────────────────────────────────────────────────────────────
// Subscription plans (visual / mock)
// ─────────────────────────────────────────────────────────────────────

export type PlanId = "free" | "pro" | "business";

export type PlanStatus = "active" | "coming_soon";

export type SubscriptionPlan = {
  id: PlanId;
  name: string;
  tagline: string;
  price: string;
  status: PlanStatus;
  highlight?: boolean;
  features: string[];
  cta: { label: string; href?: string };
};

// ─────────────────────────────────────────────────────────────────────
// Analytics (mock)
// ─────────────────────────────────────────────────────────────────────

export type AnalyticsMetric = {
  key: string;
  label: string;
  value: number;
  /** Cambio porcentual respecto al período anterior (visual). */
  trend?: number;
  format?: "number" | "currency";
};
