import { createContext, useContext, useState, type ReactNode } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
interface BearStore {
  bears: number;
  actions: {
    increasePopulation: (by: number) => void;
    removeAllBears: () => void;
  };
}

const BearStoreContext = createContext<StoreApi<BearStore> | null>(null);

interface BearStoreProviderProps {
  children: ReactNode;
  initialBears: number;
}

const BearStoreProvider = ({
  children,
  initialBears
}: BearStoreProviderProps) => {
  const [store] = useState(() =>
    createStore<BearStore>((set) => ({
      bears: initialBears,
      actions: {
        increasePopulation: (by: number) =>
          set((state) => ({
            bears: state.bears + by
          })),
        removeAllBears: () => set({ bears: 0 })
      }
    }))
  );

  return (
    <BearStoreContext.Provider value={store}>
      {children}
    </BearStoreContext.Provider>
  );
};

type Selector<T> = (state: BearStore) => T;

const useBearStore = <T,>(selector: Selector<T>): T => {
  const store = useContext(BearStoreContext);
  if (!store) {
    throw new Error("Missing BearStoreProvider");
  }
  return useStore(store, selector);
};

export default useBearStore;
export { BearStoreContext, BearStoreProvider };
export type { BearStore };
