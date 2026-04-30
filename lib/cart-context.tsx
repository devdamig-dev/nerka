"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "./types";

const STORAGE_KEY = "nerka.cart.v1";

export type CartLineSnapshot = {
  productId: string;
  name: string;
  price?: number;
  unit?: string;
  image: string;
  quantity: number;
};

export type SellerCart = {
  profileId: string;
  profileName: string;
  contactPhone: string;
  items: Record<string, CartLineSnapshot>;
};

type CartState = Record<string, SellerCart>;

type AddItemArgs = {
  profileId: string;
  profileName: string;
  contactPhone: string;
  product: Product;
  quantity?: number;
};

type CartContextValue = {
  carts: CartState;
  addItem: (args: AddItemArgs) => void;
  removeItem: (profileId: string, productId: string) => void;
  updateQuantity: (profileId: string, productId: string, quantity: number) => void;
  clearCart: (profileId: string) => void;
  getSellerCart: (profileId: string) => SellerCart | undefined;
  totalItemsAcrossSellers: number;
  totalSellersWithItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carts, setCarts] = useState<CartState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setCarts(JSON.parse(raw) as CartState);
    } catch {
      // ignore corrupt cache
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
    } catch {
      // storage unavailable: noop
    }
  }, [carts, hydrated]);

  const addItem = useCallback(
    ({ profileId, profileName, contactPhone, product, quantity = 1 }: AddItemArgs) => {
      setCarts((prev) => {
        const existing = prev[profileId] ?? {
          profileId,
          profileName,
          contactPhone,
          items: {},
        };
        const current = existing.items[product.id]?.quantity ?? 0;
        return {
          ...prev,
          [profileId]: {
            ...existing,
            profileName,
            contactPhone,
            items: {
              ...existing.items,
              [product.id]: {
                productId: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
                image: product.image,
                quantity: current + quantity,
              },
            },
          },
        };
      });
    },
    [],
  );

  const removeItem = useCallback((profileId: string, productId: string) => {
    setCarts((prev) => {
      const cart = prev[profileId];
      if (!cart) return prev;
      const next = { ...cart.items };
      delete next[productId];
      if (Object.keys(next).length === 0) {
        const { [profileId]: _removed, ...rest } = prev;
        void _removed;
        return rest;
      }
      return { ...prev, [profileId]: { ...cart, items: next } };
    });
  }, []);

  const updateQuantity = useCallback(
    (profileId: string, productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(profileId, productId);
        return;
      }
      setCarts((prev) => {
        const cart = prev[profileId];
        const line = cart?.items[productId];
        if (!cart || !line) return prev;
        return {
          ...prev,
          [profileId]: {
            ...cart,
            items: { ...cart.items, [productId]: { ...line, quantity } },
          },
        };
      });
    },
    [removeItem],
  );

  const clearCart = useCallback((profileId: string) => {
    setCarts((prev) => {
      if (!prev[profileId]) return prev;
      const { [profileId]: _removed, ...rest } = prev;
      void _removed;
      return rest;
    });
  }, []);

  const getSellerCart = useCallback((profileId: string) => carts[profileId], [carts]);

  const totals = useMemo(() => {
    let totalItems = 0;
    let totalSellers = 0;
    for (const cart of Object.values(carts)) {
      const lines = Object.values(cart.items);
      if (lines.length > 0) totalSellers += 1;
      for (const line of lines) totalItems += line.quantity;
    }
    return { totalItems, totalSellers };
  }, [carts]);

  const value = useMemo<CartContextValue>(
    () => ({
      carts,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getSellerCart,
      totalItemsAcrossSellers: totals.totalItems,
      totalSellersWithItems: totals.totalSellers,
    }),
    [carts, addItem, removeItem, updateQuantity, clearCart, getSellerCart, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function sellerCartTotal(cart: SellerCart) {
  return Object.values(cart.items).reduce(
    (sum, line) => sum + (line.price ?? 0) * line.quantity,
    0,
  );
}

export function sellerCartItemCount(cart: SellerCart) {
  return Object.values(cart.items).reduce((sum, line) => sum + line.quantity, 0);
}
