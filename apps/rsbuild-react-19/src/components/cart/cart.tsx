import { CartHeader } from "./cart-header";
import { CartItem } from "./cart-item";
import { CartPayment } from "./cart-payment";
import { CartProvider } from "./contexts/cart-context";
import type { CartItemType } from "./model/cart.type";

type CartProps = {
  initialItems: CartItemType[];
};

export function Cart({ initialItems }: CartProps) {
  return (
    <CartProvider initialItems={initialItems}>
      <div>
        <CartHeader />
        <CartItem />
        <CartPayment />
      </div>
    </CartProvider>
  );
}
