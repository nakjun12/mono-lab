import type { Marker } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import { mutate } from "swr";
export const MARKERS_KEY = "/markers";

//marker 업데이트함수
//markers 컴포넌트에서 이를 렌더링합니다.
const useMarkers = () => {
  const initializeMarkers = useCallback((Markers: Marker[]) => {
    mutate(MARKERS_KEY, Markers);
  }, []);

  return {
    initializeMarkers
  };
};
export default useMarkers;
