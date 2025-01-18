import { Counter2 } from "./counter1";
import { Counter1 } from "./counter2";

export function SyncStoreComponent() {
  return (
    <div className="counter-group">
      <Counter1 />
      <Counter2 />
    </div>
  );
}
