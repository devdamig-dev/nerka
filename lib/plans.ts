import type { SubscriptionPlan } from "./types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratis",
    tagline: "Perfil público para empezar",
    price: "$0",
    status: "active",
    features: [
      "Perfil comercial público",
      "Catálogo básico (hasta 25 productos)",
      "Zona, rubro, horarios y modalidades",
      "Pedidos y consultas por WhatsApp",
      "Aparición en el explorador local",
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
      "Perfil destacado en el explorador",
      "Hasta 200 productos o servicios",
      "Badges de confianza y respuesta rápida",
      "Estadísticas básicas de visitas y consultas",
      "Prioridad en campañas locales",
    ],
    cta: { label: "Quiero Pro" },
  },
  {
    id: "business",
    name: "Negocio",
    tagline: "Herramientas para equipos comerciales",
    price: "Próximamente",
    status: "coming_soon",
    features: [
      "Catálogo avanzado con secciones destacadas",
      "Métricas completas y exportables",
      "Campañas, promociones y productos destacados",
      "Soporte prioritario para carga y mejoras",
      "Preparado para múltiples puntos de atención",
    ],
    cta: { label: "Sumarme a Negocio" },
  },
];

export const institutionPlan = {
  name: "Municipio / Cámara / Comunidad",
  tagline: "Una red local personalizada para ordenar y potenciar el ecosistema comercial",
  price: "Solicitar demo",
  features: [
    "Red local personalizada",
    "Carga o invitación de emprendedores",
    "Categorías y zonas administrables",
    "Métricas de actividad, visitas y consultas",
    "Perfiles verificados",
    "Campañas y destacados",
    "Landing pública de la comunidad",
    "Soporte de implementación",
  ],
  cta: { label: "Quiero implementarlo en mi zona", href: "/instituciones" },
};

export function getPlanById(id: string) {
  return subscriptionPlans.find((p) => p.id === id);
}
