import getCurrentLocation from "@/app/core/map/libs/get-current-location";
import type { Coordinates, Map } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";
export const CURRENT_LOCATION_KEY = "/current-location";

//현재 위치 관리하는 함수
// useMap 의존성을 띄고 있음
const useCurrentLocation = () => {
  const { data: currentLocation } = useSWR<Coordinates>(CURRENT_LOCATION_KEY);

  //현재 위치 설정
  const setCurrentLocation = useCallback((inputMap: Map) => {
    const targetMap = inputMap; // inputMap이 존재하면 사용하고, 없으면 컴포넌트 상태의 map을 사용

    if (!targetMap) {
      console.log("map is not exist");
      return;
    }

    getCurrentLocation()
      .then(([latitude, longitude]) => {
        //현재 위치로 이동하는 버튼 만들기

        console.log("setCurrentLocation");
        targetMap.panTo(new window.naver.maps.LatLng(latitude, longitude));

        mutate(CURRENT_LOCATION_KEY, [latitude, longitude]);
      })
      .catch((error) =>
        console.error("Error getting current location:", error)
      );
  }, []);

  // 현재 위치와 다른 위치 사이의 거리를 계산하는 함수
  const calculateDistance = useCallback(
    (targetCoords: Coordinates, map: Map): number | undefined => {
      if (!currentLocation) return undefined;

      const proj = map.getProjection();
      const currentLatLng = new window.naver.maps.LatLng(
        currentLocation[0],
        currentLocation[1]
      );
      const targetLatLng = new window.naver.maps.LatLng(
        targetCoords[0],
        targetCoords[1]
      );

      const distance = proj.getDistance(currentLatLng, targetLatLng);

      return distance;
    },
    [currentLocation]
  );

  //현재 위치 초기화
  const clearCurrentLocation = useCallback(() => {
    console.log("clearCurrentLocation");
    mutate(CURRENT_LOCATION_KEY, null);
  }, []);

  return {
    currentLocation,
    setCurrentLocation,
    calculateDistance,
    clearCurrentLocation
  };
};
export default useCurrentLocation;
