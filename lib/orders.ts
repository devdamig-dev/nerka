import type { SellerCart } from "./cart-context";
import { sellerCartTotal } from "./cart-context";

export function formatPrice(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return `$${value.toLocaleString("es-AR")}`;
}

export function buildOrderMessage(cart: SellerCart, options?: { note?: string; siteName?: string }) {
  const siteName = options?.siteName ?? "NIAR";
  const total = sellerCartTotal(cart);
  const lines: string[] = [];
  lines.push(`Hola ${cart.profileName}, te escribo desde ${siteName} para hacer este pedido:`);
  lines.push("");
  for (const item of Object.values(cart.items)) {
    const priceTxt = item.price
      ? ` — ${formatPrice(item.price * item.quantity)}`
      : " — a coordinar";
    const unitTxt = item.unit ? ` (${item.unit})` : "";
    lines.push(`• ${item.name} x${item.quantity}${unitTxt}${priceTxt}`);
  }
  lines.push("");
  lines.push(`Total estimado: ${formatPrice(total) ?? "a confirmar"}`);
  if (options?.note) {
    lines.push("");
    lines.push(`Nota: ${options.note}`);
  }
  lines.push("");
  lines.push("¿Me confirmás disponibilidad y forma de entrega? ¡Gracias!");
  return lines.join("\n");
}

export function buildWhatsAppLink(cart: SellerCart, options?: { note?: string; siteName?: string }) {
  const text = buildOrderMessage(cart, options);
  const phone = cart.contactPhone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
