"use client";

import useMap, { INITIAL_CENTER } from "@/app/shared/hooks/use-naver-map"; // 임포트 경로 수정
import type { Coordinates, NaverMap } from "@/app/shared/types/map-types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import useCurrentStore from "../../hooks/use-current-store";
import { INITIAL_ZOOM } from "../../hooks/use-naver-map"; // 임포트 경로 수정
import Markers from "./markers";
import NaverMapComponent from "./naver-map"; // `NaverMap`을 `NaverMapComponent`로 이름 변경하여 혼동 방지

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  const searchParams = useSearchParams(); // 현재 URL의 검색 매개변수

  const initialZoom = useMemo(
    () =>
      searchParams.get("zoom")
        ? Number(searchParams.get("zoom"))
        : INITIAL_ZOOM,
    [searchParams]
  );

  const initialCenter = useMemo<Coordinates>(
    () =>
      searchParams.get("lat") && searchParams.get("lng")
        ? [Number(searchParams.get("lat")), Number(searchParams.get("lng"))]
        : INITIAL_CENTER,
    [searchParams]
  );
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, "click", clearCurrentStore);
  };
  console.log("MapSection render", initialZoom, initialCenter);

  return (
    <>
      <NaverMapComponent
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapSection;
