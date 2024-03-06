import { useCallback } from "react";
import { mutate } from "swr";
import type { Store } from "../types/map-types";
export const STORE_KEY = "/stores";

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores
  };
};
export default useStores;
