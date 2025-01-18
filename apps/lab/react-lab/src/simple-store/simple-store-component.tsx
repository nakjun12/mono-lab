import { Counter1 } from "./counter1";
import { Counter2 } from "./counter2";

export function SimpleStoreComponent() {
  return (
    <div className="counter-group">
      <Counter1 />
      <Counter2 />
    </div>
  );
}
