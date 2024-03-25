"use client";

import MapComponent from "@/app/core/map/components/map"; // `Map`을 `MapComponent`로 이름 변경하여 혼동 방지
import Markers from "@/app/core/map/components/markers";
import useCurrentLocation from "@/app/core/map/hooks/use-current-location";
import useMap, {
  INITIAL_CENTER,
  INITIAL_ZOOM
} from "@/app/core/map/hooks/use-map"; // 임포트 경로 수정
import useMarkers from "@/app/core/map/hooks/use-markers";
import { MARKERS } from "@/app/core/shared/constants/dummy";
import type { Coordinates, Map } from "@/app/core/shared/types/map-types";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

//맵 초기 설정 및 마커 렌더링 컴포넌트
const MapInitializer = () => {
  const { initializeMarkers } = useMarkers();
  const { initializeMap } = useMap();
  const { setCurrentLocation } = useCurrentLocation();
  //const { clearCurrentMarker } = useCurrentMarker();
  const searchParams = useSearchParams(); // 현재 URL의 검색 매개변수

  useEffect(() => {
    //초기 마커 더미로 설정함
    //추후 서버로 업데이트 예정
    initializeMarkers(MARKERS); //전역 상태 업데이트
  }, [initializeMarkers]);

  //초기 줌을 설정합니다.
  const initialZoom = useMemo(
    () =>
      searchParams.get("zoom")
        ? Number(searchParams.get("zoom"))
        : INITIAL_ZOOM,
    [searchParams]
  );

  //초기 위치를 설정합니다.
  const initialCenter = useMemo<Coordinates>(
    () =>
      searchParams.get("lat") && searchParams.get("lng")
        ? [Number(searchParams.get("lat")), Number(searchParams.get("lng"))]
        : INITIAL_CENTER,
    [searchParams]
  );

  const onLoadMap = (map: Map) => {
    initializeMap(map);

    if (!searchParams.get("lat") || !searchParams.get("lng")) {
      console.log("setCurrentLocation");
      setCurrentLocation(map); // 서치 파라미터가 존재하지 않는 경우에만 현재 위치로 이동합니다.
    }
    // 서치 파라미터가 존재하지 않는 경우에만 현재 위치로 이동합니다.
  };

  // console.log("MapSection render", initialZoom, initialCenter);

  return (
    <>
      <MapComponent
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapInitializer;
