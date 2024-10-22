import { CartItemButtonSeparated } from "src/components/cart-with-context-and-reducer/cart-item-separated/cart-item-button-separated";
import { CartItemQuantitySeparted } from "src/components/cart-with-context-and-reducer/cart-item-separated/cart-item-quantity-separated";
import { ItemInfoSeparated } from "src/components/cart-with-context-and-reducer/cart-item-separated/item-info-separated";
import { useCartDispatch } from "src/components/cart-with-context-and-reducer/hooks/useCart";
import type { CartItemType } from "../model/cart.type";

type CartItemProps = {
  item: CartItemType;
  onNoUpdate: (item: CartItemType) => void;
  onPlus: (item: CartItemType) => void;
  onMinus: (item: CartItemType) => void;
};

export const CartItemSeparated = ({
  item,
  onMinus,
  onPlus,
  onNoUpdate
}: Readonly<CartItemProps>) => {
  const dispatch = useCartDispatch();

  const handleUpdatePlusClosure = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      id: item.id,
      quantity: item.quantity + 1
    });
  };

  const handleUpdateMinusClosure = () => {
    if (item.quantity > 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        id: item.id,
        quantity: item.quantity - 1
      });
    }
  };

  const handleNoUpdateClosure = () => {
    if (item.quantity > 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        id: item.id,
        quantity: item.quantity
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <ItemInfoSeparated name={item.name} price={item.price} />
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-2">
          <span className="w-40">Closure-based:</span>
          <CartItemButtonSeparated onClick={handleNoUpdateClosure}>
            no Change
          </CartItemButtonSeparated>
          <CartItemQuantitySeparted quantity={item.quantity} />
          <CartItemButtonSeparated onClick={handleUpdateMinusClosure}>
            -
          </CartItemButtonSeparated>
          <CartItemButtonSeparated onClick={handleUpdatePlusClosure}>
            +
          </CartItemButtonSeparated>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="w-40">Parameter-based:</span>
          <CartItemButtonSeparated isParameter onClick={() => onNoUpdate(item)}>
            no Change
          </CartItemButtonSeparated>
          <CartItemQuantitySeparted quantity={item.quantity} />
          <CartItemButtonSeparated isParameter onClick={() => onMinus(item)}>
            -
          </CartItemButtonSeparated>
          <CartItemButtonSeparated isParameter onClick={() => onPlus(item)}>
            +
          </CartItemButtonSeparated>
        </div>
      </div>
    </div>
  );
};
