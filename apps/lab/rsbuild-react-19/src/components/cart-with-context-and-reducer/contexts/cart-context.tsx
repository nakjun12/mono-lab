import type React from "react";
import { createContext, useReducer, type ReactNode } from "react";
import type { CartItemType } from "../model/cart.type";

type CartState = {
  items: CartItemType[];
};

type CartAction =
  | { type: "ADD_ITEM"; item: CartItemType }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "UPDATE_QUANTITY"; id: number; quantity: number };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id)
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        )
      };
    default:
      return state;
  }
}

export const CartStateContext = createContext<CartState | undefined>(undefined);
export const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

type CartProviderProps = {
  children: ReactNode;
  initialItems?: CartItemType[];
};

export function CartProvider({
  children,
  initialItems = []
}: Readonly<CartProviderProps>) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: initialItems
  });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}
