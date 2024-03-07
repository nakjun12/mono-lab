"use client";

import useMap, { INITIAL_CENTER } from "@/app/shared/hooks/use-naver-map"; // 임포트 경로 수정
import type { Coordinates, NaverMap } from "@/app/shared/types/map-types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { INITIAL_ZOOM } from "../../hooks/use-naver-map"; // 임포트 경로 수정
import getCurrentLocation from "../../lib/get-current-location";
import Markers from "./markers";
import NaverMapComponent from "./naver-map"; // `NaverMap`을 `NaverMapComponent`로 이름 변경하여 혼동 방지
const MapSection = () => {
  const { initializeMap } = useMap();
  //const { clearCurrentStore } = useCurrentStore();
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

    // 서치 파라미터가 존재하지 않는 경우에만 현재 위치로 이동합니다.
    if (!searchParams.get("lat") || !searchParams.get("lng")) {
      getCurrentLocation()
        .then(([latitude, longitude]) => {
          //TODO: 추후 리셋 값으로 관리해야함
          map.setCenter(new window.naver.maps.LatLng(latitude, longitude));
        })
        .catch((error) =>
          console.error("Error getting current location:", error)
        );
    }
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
