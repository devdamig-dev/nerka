"use client";

import { Heart } from "lucide-react";
import { EntrepreneurCard } from "@/components/nerka/cards";
import { EmptyState } from "@/components/nerka/ui";
import { entrepreneurs } from "@/lib/nerka-data";
import { useRole } from "@/lib/role-context";

export default function FavoritosPage() {
  const { user, hydrated } = useRole();
  const favorites = entrepreneurs.filter((e) => user.favorites.includes(e.id));

  return (
    <main className="px-4 py-5 lg:px-8 lg:py-8">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-[#2F3A2B] lg:text-2xl">Tus favoritos</h1>
        <p className="text-xs text-[#666C60] lg:text-sm">
          Tiendas guardadas para volver fácil cuando quieras consultarlas.
        </p>
      </div>

      {hydrated && favorites.length === 0 ? (
        <EmptyState
          icon={<Heart size={20} />}
          title="Todavía no agregaste favoritos"
          description="Tocá el corazón en un perfil para guardarlo acá."
          cta="Explorar tiendas"
          href="/niar/explorar"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((e) => (
            <EntrepreneurCard key={e.id} entrepreneur={e} />
          ))}
        </div>
      )}
    </main>
  );
}
