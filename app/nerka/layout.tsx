import type { ReactNode } from "react";
import { NerkaAppShell } from "@/components/nerka/ui";
import { CartProvider } from "@/lib/cart-context";
import { RoleProvider } from "@/lib/role-context";

export default function NerkaLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <CartProvider>
        <NerkaAppShell>{children}</NerkaAppShell>
      </CartProvider>
    </RoleProvider>
  );
}
