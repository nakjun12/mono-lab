import type { Marker } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const CURRENT_MARKER_KEY = "/current-marker";

//현재 선택한 마커 관리하는 함수
const useCurrentMarker = () => {
  const { data: currentMarker } = useSWR<Marker>(CURRENT_MARKER_KEY);
  //현재 마커 설정
  const setCurrentMarker = useCallback((marker: Marker) => {
    mutate(CURRENT_MARKER_KEY, marker);
  }, []);

  //현재 마커 초기화
  const clearCurrentMarker = useCallback(() => {
    console.log("clearCurrentMarker");
    mutate(CURRENT_MARKER_KEY, null);
  }, []);

  return {
    currentMarker,
    setCurrentMarker,
    clearCurrentMarker
  };
};
export default useCurrentMarker;
