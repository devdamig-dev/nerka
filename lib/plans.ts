import type { SubscriptionPlan } from "./types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratis",
    tagline: "Empezá a vender hoy",
    price: "$0",
    status: "active",
    features: [
      "Perfil comercial público",
      "Catálogo básico (hasta 25 productos)",
      "Pedidos por WhatsApp",
      "Mensajería interna Nerka",
      "Aparición en explorador local",
    ],
    cta: { label: "Plan actual" },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Más visibilidad en tu zona",
    price: "Próximamente",
    status: "coming_soon",
    highlight: true,
    features: [
      "Perfil destacado en explorador",
      "Hasta 200 productos en catálogo",
      "Estadísticas básicas de visitas y pedidos",
      "Prioridad en resultados de búsqueda",
      "Soporte prioritario",
    ],
    cta: { label: "Quiero potenciar mi negocio" },
  },
  {
    id: "business",
    name: "Negocio",
    tagline: "Herramientas para escalar",
    price: "Próximamente",
    status: "coming_soon",
    features: [
      "Catálogo avanzado con variantes",
      "Métricas completas y exportables",
      "Campañas y promociones",
      "Asistente IA para descripciones y precios",
      "Dominio personalizado (futuro)",
    ],
    cta: { label: "Sumarme a Negocio" },
  },
];

export function getPlanById(id: string) {
  return subscriptionPlans.find((p) => p.id === id);
}
