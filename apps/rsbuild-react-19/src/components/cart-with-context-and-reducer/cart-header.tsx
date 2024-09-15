import { useCartState } from "src/components/cart/hooks/useCart";

export const CartHeader = () => {
  const { items } = useCartState();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between text-[20px]">
      <h3 className="font-bold">Shopping Cart</h3>
      <p>Total Items: {itemCount}</p>
    </header>
  );
};
