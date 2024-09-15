import { CartHeader } from "./cart-header";
import { CartItems } from "./cart-items";
import { CartPayment } from "./cart-payment";
import { CartProvider } from "./contexts/cart-context";
import type { CartItemType } from "./model/cart.type";

type CartProps = {
  initialItems: CartItemType[];
};

export function Cart({ initialItems }: CartProps) {
  return (
    <CartProvider initialItems={initialItems}>
      <div className="px-80">
        <CartHeader />
        <CartItems />
        <CartPayment />
      </div>
    </CartProvider>
  );
}
