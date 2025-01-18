import { store, useStoreSelector } from "./sync-store";

const selectCount = (state: ReturnType<typeof store.getState>) => state.count2;

export const Counter2 = () => {
  const state = useStoreSelector(store, selectCount);
  const inc = () => {
    store.setState((prev) => ({
      ...prev,
      count2: prev.count2 + 1
    }));
  };
  return (
    <div>
      Sync Store Count2: {state} <button onClick={inc}>+1</button>
    </div>
  );
};
