import type { ReactNode } from "react";
import { NerkaAppShell } from "@/components/nerka/ui";
import { CartProvider } from "@/lib/cart-context";

export default function NerkaLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <NerkaAppShell>{children}</NerkaAppShell>
    </CartProvider>
  );
}
