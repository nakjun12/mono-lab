import type { Marker } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import { mutate } from "swr";

export const CURRENT_MARKER_KEY = "/current-marker";

//현재 선택한 마커 관리하는 함수
const useCurrentMarker = () => {
  //현재 마커 설정
  const setCurrentMarker = useCallback((Marker: Marker) => {
    mutate(CURRENT_MARKER_KEY, Marker);
  }, []);

  //현재 마커 초기화
  const clearCurrentMarker = useCallback(() => {
    console.log("clearCurrentMarker");
    mutate(CURRENT_MARKER_KEY, null);
  }, []);

  return {
    setCurrentMarker,
    clearCurrentMarker
  };
};
export default useCurrentMarker;
