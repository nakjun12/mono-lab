import { CartItemSeparated } from "src/components/cart-with-context-and-reducer/cart-item-separated";
import type { CartItemType } from "src/components/cart-with-context-and-reducer/model/cart.type";
import { CartItem } from "./cart-item";
import { useCartDispatch, useCartState } from "./hooks/useCart";

export const CartItems = () => {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const handleUpdatePlusParam = (item: CartItemType) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      id: item.id,
      quantity: item.quantity + 1
    });
  };

  const handleUpdateMinusParam = (item: CartItemType) => {
    if (item.quantity > 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        id: item.id,
        quantity: item.quantity - 1
      });
    }
  };

  const handleNoUpdateParam = (item: CartItemType) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      id: item.id,
      quantity: item.quantity
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id}>
          <CartItem
            item={item}
            onPlus={handleUpdatePlusParam}
            onMinus={handleUpdateMinusParam}
            onNoUpdate={handleNoUpdateParam}
          />
          <CartItemSeparated
            item={item}
            onPlus={handleUpdatePlusParam}
            onMinus={handleUpdateMinusParam}
            onNoUpdate={handleNoUpdateParam}
          />
        </div>
      ))}
    </div>
  );
};
