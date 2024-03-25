import type { SimplifiedGeocodeAddress } from "@/app/core/map/libs/get-reverseGeocode";
import { getReverseGeocode } from "@/app/core/map/libs/get-reverseGeocode";
import type { Coordinates, Map } from "@/app/core/shared/types/map-types";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

export const ADDRESS_FETCH_KEY = "reverseGeocode";
// 데이터 패칭을 위한 fetcher 함수
const fetchReverseGeocode = async (map: Map) => {
  // 네이버 맵 API와 좌표의 유효성을 확인합니다.
  if (!window.naver || !window.naver.maps || !map) {
    throw new Error("Invalid coordinates or Naver Maps API not loaded");
  }
  const mapCenter = map.getCenter();
  const center: Coordinates = [mapCenter.y, mapCenter.x];

  return await getReverseGeocode(center);
};

//위치 이동 시 갱신을 위한 훅
//TODO: 캐싱 메모리 관리하는 방법 고려할 것, 에러 처리 신경쓸 것
export function useAddressOnMove(map: Map) {
  const { data: result, error } = useSWR<SimplifiedGeocodeAddress[], Error>(
    ADDRESS_FETCH_KEY,
    () => fetchReverseGeocode(map),
    {}
  );

  useEffect(() => {
    if (map) {
      const listener = window.naver.maps.Event.addListener(
        map,
        "dragend",
        () => {
          fetchReverseGeocode(map)
            .then((result) => {
              console.log("result", result);
              mutate(ADDRESS_FETCH_KEY, result, false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
      return () => window.naver.maps.Event.removeListener(listener);
    }
  }, [map]);

  const reverseGeocodeResults = result?.[0];

  return {
    reverseGeocodeResults,
    isLoading: !error && !result,
    isError: error
  };
}
