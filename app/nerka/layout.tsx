import type { ReactNode } from "react";
import { NiarAppShell } from "@/components/nerka/ui";
import { CartProvider } from "@/lib/cart-context";
import { RoleProvider } from "@/lib/role-context";

export default function NiarLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <CartProvider>
        <NiarAppShell>{children}</NiarAppShell>
      </CartProvider>
    </RoleProvider>
  );
}
