"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User, UserRole } from "./types";

const STORAGE_KEY = "nerka.user.v1";

const defaultUser: User = {
  id: "u-default",
  name: "Martina",
  role: "visitor",
  zone: "Berazategui",
  favorites: [],
};

type RoleContextValue = {
  user: User;
  isEntrepreneur: boolean;
  isVisitor: boolean;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  toggleFavorite: (profileId: string) => void;
  isFavorite: (profileId: string) => boolean;
  hydrated: boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<User>;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser({ ...defaultUser, ...parsed });
      }
    } catch {
      // ignore corrupt cache
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user, hydrated]);

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => ({
      ...prev,
      role,
      // si pasa a emprendedor, asignar el perfil mock por defecto.
      businessProfileId:
        role === "entrepreneur" ? prev.businessProfileId ?? "dulce-tentacion" : undefined,
      // si era el name por defecto y pasa a entrepreneur, ajustamos
      name:
        role === "entrepreneur" && prev.name === "Martina" ? "Dulce Tentación" : prev.name,
    }));
  }, []);

  const toggleRole = useCallback(() => {
    setUser((prev) => {
      const nextRole: UserRole = prev.role === "visitor" ? "entrepreneur" : "visitor";
      return {
        ...prev,
        role: nextRole,
        businessProfileId:
          nextRole === "entrepreneur" ? prev.businessProfileId ?? "dulce-tentacion" : undefined,
        name:
          nextRole === "entrepreneur" && prev.name === "Martina"
            ? "Dulce Tentación"
            : nextRole === "visitor" && prev.name === "Dulce Tentación"
              ? "Martina"
              : prev.name,
      };
    });
  }, []);

  const toggleFavorite = useCallback((profileId: string) => {
    setUser((prev) => {
      const has = prev.favorites.includes(profileId);
      return {
        ...prev,
        favorites: has
          ? prev.favorites.filter((id) => id !== profileId)
          : [...prev.favorites, profileId],
      };
    });
  }, []);

  const isFavorite = useCallback(
    (profileId: string) => user.favorites.includes(profileId),
    [user.favorites],
  );

  const value = useMemo<RoleContextValue>(
    () => ({
      user,
      isEntrepreneur: user.role === "entrepreneur",
      isVisitor: user.role === "visitor",
      setRole,
      toggleRole,
      toggleFavorite,
      isFavorite,
      hydrated,
    }),
    [user, setRole, toggleRole, toggleFavorite, isFavorite, hydrated],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}
