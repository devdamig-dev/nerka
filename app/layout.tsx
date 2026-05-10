import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niar · Lo local, más cerca",
  description: "Descubrí emprendedores, comercios y servicios de tu zona en una vidriera digital local.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-[#FBF8F3] text-[#1f241f]">{children}</body>
    </html>
  );
}
