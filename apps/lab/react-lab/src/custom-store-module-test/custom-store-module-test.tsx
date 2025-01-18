import { CounterWithModule2 } from "./counter1";
import { CounterWithModule } from "./counter2";

interface CustomStoreModuleTestProps {}

export function CustomStoreModuleTest({}: CustomStoreModuleTestProps) {
  return (
    <div>
      <CounterWithModule />
      <CounterWithModule2 />
    </div>
  );
}
