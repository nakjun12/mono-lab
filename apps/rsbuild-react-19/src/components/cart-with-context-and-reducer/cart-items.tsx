import { CartItem } from "src/components/cart/cart-item";
import {
  useCartDispatch,
  useCartState
} from "src/components/cart/hooks/useCart";
import type { CartItemType } from "src/components/cart/model/cart.type";

export const CartItems = () => {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const handleUpdateQuantity = (item: CartItemType, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", id: item.id, quantity });
    }
  };
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ))}
    </div>
  );
};
