import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NERKA",
  description: "Encontrá, compará y contratá emprendedores cerca tuyo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#FAFAFC] text-[#171321]">{children}</body>
    </html>
  );
}
