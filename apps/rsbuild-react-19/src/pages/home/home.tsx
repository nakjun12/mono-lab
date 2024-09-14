import { dummyCartItems } from "../../__mock__/dummy-data";
import { Cart } from "../../components/cart";

type HomeProps = {};

export function Home({}: HomeProps) {
  return (
    <div>
      <Cart initialItems={dummyCartItems} />
    </div>
  );
}
