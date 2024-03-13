"use client";

import { INITIAL_CENTER, INITIAL_ZOOM } from "@/app/(router)/map/hooks/use-map";
import type { Coordinates, Map } from "@/app/shared/types/map-types";
import Script from "next/script";
import { useEffect, useRef } from "react";
type MapProps = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: Map) => void;
};

const Map: React.FC<MapProps> = ({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad
}) => {
  const mapRef = useRef<Map | null>(null);

  //네이버 맵 초기로드
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter), //초기 위치
      zoom: initialZoom, //초기 설정
      minZoom: 9, //최소 줌
      scaleControl: false, //스케일 컨트롤 표시 여부
      mapDataControl: false, //맵 데이터 컨트롤 표시 여부
      zoomControl: true, // 줌 컨트롤 표시여부
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
      }
    };
    //새로운 네이버 맵 인스턴스 생성
    const map = new window.naver.maps.Map(mapId, mapOptions);
    //맵 인스턴스 저장
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  //맵이 unmount되었을 때 맵 인스턴스 destory하기
  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wcursjl0rk`}
        onReady={initializeMap}
      />
      <div id={mapId} style={{ width: "100%", height: "500px" }} />
    </>
  );
};

export default Map;
