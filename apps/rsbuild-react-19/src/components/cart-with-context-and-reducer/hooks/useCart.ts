import { useContext } from "react";
import {
  CartDispatchContext,
  CartStateContext
} from "../contexts/cart-context";

export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCartState must be used within a CartProvider");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
}
