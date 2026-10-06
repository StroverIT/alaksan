import type { TCartItem } from "@/types";

export type TCartContextValue = {
  items: TCartItem[];
  itemCount: number;
  addItem: (item: TCartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};
