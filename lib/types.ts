export type TrustBadge = "Verificado" | "Responde rápido" | "Top en tu zona";

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

export type OrderItem = {
  productId: string;
  name: string;
  price?: number;
  quantity: number;
  unit?: string;
};

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
  items: OrderItem[];
  total: number;
  channel: OrderChannel;
  status: OrderStatus;
  note?: string;
  createdAt: string;
};

// CatalogItem kept for back-compat with existing code.
export type CatalogItem = Product;
