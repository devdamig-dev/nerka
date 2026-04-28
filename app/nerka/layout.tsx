import type { ReactNode } from "react";
import { NerkaAppShell } from "@/components/nerka/ui";

export default function NerkaLayout({ children }: { children: ReactNode }) {
  return <NerkaAppShell>{children}</NerkaAppShell>;
}
