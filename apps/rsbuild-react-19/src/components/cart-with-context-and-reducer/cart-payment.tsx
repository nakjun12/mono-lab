import type React from "react";
import { useCartState } from "src/components/cart/hooks/useCart";

export const CartPayment: React.FC = () => {
  const { items } = useCartState();

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between items-center">
        <span>Total:</span>
        <span className="text-2xl font-bold">
          {totalAmount.toLocaleString()}원
        </span>
      </div>
      <button
        type="button"
        className="mt-4 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};
