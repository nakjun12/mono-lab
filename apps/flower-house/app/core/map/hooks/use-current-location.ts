import type { Coordinates } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const CURRENT_LOCATION_KEY = "/current-location";

//현재 위치 관리하는 함수
const useCurrentLocation = () => {
  const { data: currentLocation } = useSWR<Coordinates>(CURRENT_LOCATION_KEY);

  //현재 위치 설정
  const setCurrentLocation = useCallback((coordinates: Coordinates) => {
    mutate(CURRENT_LOCATION_KEY, coordinates);
  }, []);

  //현재 위치 초기화
  const clearCurrentLocation = useCallback(() => {
    console.log("clearCurrentLocation");
    mutate(CURRENT_LOCATION_KEY, null);
  }, []);

  return {
    currentLocation,
    setCurrentLocation,
    clearCurrentLocation
  };
};
export default useCurrentLocation;
