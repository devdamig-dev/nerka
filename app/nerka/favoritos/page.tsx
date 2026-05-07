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
    <main className="px-5 py-8 lg:px-2 lg:py-10">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--niar-ink-soft)]">
          Tu colección
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--niar-ink)] lg:text-[44px]">
          Tus favoritos
        </h1>
        <p className="mt-2 text-sm text-[var(--niar-ink-mute)]">
          Tiendas guardadas para volver fácil cuando quieras consultarlas.
        </p>
      </header>

      {hydrated && favorites.length === 0 ? (
        <EmptyState
          icon={<Heart size={20} />}
          title="Todavía no agregaste favoritos"
          description="Tocá el corazón en un perfil para guardarlo acá."
          cta="Descubrir tiendas"
          href="/nerka/explorar"
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((e) => (
            <EntrepreneurCard key={e.id} entrepreneur={e} />
          ))}
        </div>
      )}
    </main>
  );
}
