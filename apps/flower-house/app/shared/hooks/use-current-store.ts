import { useCallback } from "react";
import { mutate } from "swr";
import type { Store } from "../types/map-types";

export const CURRENT_STORE_KEY = "/current-store";

const useCurrentStore = () => {
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);

  const clearCurrentStore = useCallback(() => {
    console.log("clearCurrentStore");
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return {
    setCurrentStore,
    clearCurrentStore
  };
};
export default useCurrentStore;
