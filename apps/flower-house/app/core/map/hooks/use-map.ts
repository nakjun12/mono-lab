"use client";
import type { Coordinates, Map } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 15;

export const MAP_KEY = "/map";

//맵 인스턴스를 관리하는 훅
const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);
  //초기 맵 설정
  const initializeMap = useCallback((map: Map) => {
    mutate(MAP_KEY, map);
  }, []);

  //맵 옵션 가져오기
  const getMapOptions = useCallback(() => {
    if (!map) {
      return { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
    }
    const mapCenter = map.getCenter();
    const center: Coordinates = [mapCenter.y, mapCenter.x];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    map,
    initializeMap,
    getMapOptions
  };
};
export default useMap;

//TODO: 타입 위치 랑 절대경로 수정
