"use client";
import type { Coordinates, Map } from "@/app/core/types/map-types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 15;

export const MAP_KEY = "/map";

//맵 인스턴스를 관리하는 훅
const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);
  const router = useRouter();
  const pathname = usePathname();
  //초기 맵 설정
  const initializeMap = useCallback((map: Map) => {
    mutate(MAP_KEY, map);
  }, []);

  // 맵 초기화
  const resetMapOptions = useCallback(() => {
    router.replace(pathname);
    //TODO: 추후 정확한 리셋 값으로 수정 필요함
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  //맵 옵션 가져오기
  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions
  };
};
export default useMap;

//TODO: 타입 위치 랑 절대경로 수정
