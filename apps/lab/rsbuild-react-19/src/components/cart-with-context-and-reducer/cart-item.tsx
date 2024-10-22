import { useCartDispatch } from "src/components/cart-with-context-and-reducer/hooks/useCart";
import type { CartItemType } from "./model/cart.type";

type CartItemProps = {
  item: CartItemType;
  onNoUpdate: (item: CartItemType) => void;
  onPlus: (item: CartItemType) => void;
  onMinus: (item: CartItemType) => void;
};

export const CartItem = ({
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
      <ItemInfo name={item.name} price={item.price} />
      <div className="flex flex-col gap-2">
        <ExpensiveCalculation quantity={item.quantity} />
        <div className="flex justify-center items-center gap-2">
          <span className="w-40">Closure-based:</span>
          <CartItemButton onClick={handleNoUpdateClosure}>
            no Change
          </CartItemButton>
          <QuantityDisplay quantity={item.quantity} />
          <CartItemButton onClick={handleUpdateMinusClosure}>-</CartItemButton>
          <CartItemButton onClick={handleUpdatePlusClosure}>+</CartItemButton>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="w-40">Parameter-based:</span>
          <CartItemButton isParameter onClick={() => onNoUpdate(item)}>
            no Change
          </CartItemButton>
          <QuantityDisplay quantity={item.quantity} />
          <CartItemButton isParameter onClick={() => onMinus(item)}>
            -
          </CartItemButton>
          <CartItemButton isParameter onClick={() => onPlus(item)}>
            +
          </CartItemButton>
        </div>
      </div>
    </div>
  );
};

const ItemInfo = ({ name, price }: { name: string; price: number }) => (
  <div>
    <h2 className="text-lg font-semibold">{name}</h2>
    <p> {price.toLocaleString()}원 </p>
  </div>
);

const calculateExpensiveFibonacci = (n: number): number => {
  if (n <= 1) return n;
  return (
    calculateExpensiveFibonacci(n - 1) + calculateExpensiveFibonacci(n - 2)
  );
};

const ExpensiveCalculation = ({ quantity }: { quantity: number }) => {
  const expensiveResult = calculateExpensiveFibonacci(quantity + 20);

  return <div>비용이 많이 드는 계산 결과: {expensiveResult}</div>;
};

const CartItemButton = ({
  onClick,
  children,
  isParameter = false
}: {
  onClick: () => void;
  children: React.ReactNode;
  isParameter?: boolean;
}) => (
  <button
    type="button"
    className={`px-2 py-1 ${isParameter ? "bg-green-500" : "bg-orange-400"} text-white rounded`}
    onClick={onClick}>
    {children}
  </button>
);

const QuantityDisplay = ({ quantity }: { quantity: number }) => (
  <span>{quantity}</span>
);
