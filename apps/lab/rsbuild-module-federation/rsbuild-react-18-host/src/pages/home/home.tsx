import { dummyCartItems } from "src/__mock__/dummy-data";
import { Cart } from "src/components/cart-with-context-and-reducer";

export function Home() {
  return (
    <div>
      <Cart initialItems={dummyCartItems} />
    </div>
  );
}
