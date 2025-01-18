import { store, useStoreSelector } from "./sync-store";

const selectCount = (state: ReturnType<typeof store.getState>) => state.count2;

export const Counter1 = () => {
  const state = useStoreSelector(store, selectCount);
  const inc = () => {
    store.setState((prev) => ({
      ...prev,
      count2: prev.count2 + 2
    }));
  };
  return (
    <div>
      Sync Store Count1: {state} <button onClick={inc}>+2</button>
    </div>
  );
};
