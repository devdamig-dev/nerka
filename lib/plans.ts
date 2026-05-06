import type { SubscriptionPlan } from "./types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "catalog",
    name: "Catálogo",
    tagline: "Entrar fácil y estar visible en tu zona",
    price: "$0",
    status: "available",
    features: [
      "Perfil público comercial",
      "Hasta 25 productos",
      "WhatsApp directo",
      "Categoría y zona",
      "Horarios, redes y modalidades",
      "Métricas básicas",
      "Link compartible",
    ],
    cta: { label: "Empezar con Catálogo", href: "/niar/perfil" },
  },
  {
    id: "sell",
    name: "Vender",
    tagline: "El plan ideal para convertir más consultas",
    price: "$14.900",
    status: "available",
    highlight: true,
    features: [
      "Todo lo de Catálogo",
      "Hasta 100 productos",
      "Carrito simple",
      "Pedido por WhatsApp",
      "Productos destacados y prioridad",
      "Badge responde rápido",
      "Promociones",
      "Métricas comerciales",
      "Variantes de productos",
    ],
    cta: { label: "Elegir Vender", href: "/niar/perfil" },
  },
  {
    id: "manage",
    name: "Gestionar",
    tagline: "Profesionalizar la atención comercial",
    price: "$29.900",
    status: "available",
    features: [
      "Todo lo de Vender",
      "Productos ilimitados",
      "Chat interno",
      "Multiusuario",
      "Plantillas de presupuesto",
      "Respuestas rápidas",
      "Estados: consulta, presupuesto enviado, confirmado y entregado",
      "Analytics avanzados",
      "Branding personalizado",
      "Prioridad máxima",
    ],
    cta: { label: "Elegir Gestionar", href: "/niar/perfil" },
  },
];

export const communityPlan = {
  name: "Niar para comunidades",
  tagline: "Redes comerciales locales para cámaras, municipios y comunidades",
  features: [
    "Mapa público de comercios y emprendedores",
    "Categorías, zonas y destacados locales",
    "Perfiles verificados y campañas comerciales",
    "Métricas agregadas de actividad y consultas",
  ],
  cta: { label: "Consultar por comunidades", href: "/instituciones" },
};

export const institutionPlan = communityPlan;

export function getPlanById(id: string) {
  return subscriptionPlans.find((p) => p.id === id);
}
