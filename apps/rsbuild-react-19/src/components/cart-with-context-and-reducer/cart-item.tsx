import type { CartItemType } from "src/components/cart/model/cart.type";

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (item: CartItemType, quantity: number) => void;
};

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded">
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p>Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="px-2 py-1 bg-gray-300 text-white rounded"
          onClick={() => onUpdateQuantity(item, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          className="px-2 py-1 bg-gray-300 text-white rounded"
          onClick={() => onUpdateQuantity(item, item.quantity + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
