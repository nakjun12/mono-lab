import { useCartState } from "./hooks/useCart";

export const CartHeader = () => {
  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between text-[20px]">
      <h3 className="font-bold">Shopping Cart</h3>
      <Price />
    </header>
  );
};

const Price = () => {
  const { items } = useCartState();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return <p>Total Items: {itemCount}</p>;
};
