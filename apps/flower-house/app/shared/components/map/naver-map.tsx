"use client";

import { INITIAL_CENTER, INITIAL_ZOOM } from "@/app/shared/hooks/use-naver-map";
import Script from "next/script";
import { useEffect, useRef } from "react";
import type { Coordinates, NaverMap } from "../../types/map-types";
type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const NaverMap = ({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT
      }
    };
    //새로운 네이버 맵 인스턴스 생성
    const map = new window.naver.maps.Map(mapId, mapOptions);
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
      <div id={mapId} style={{ width: "500px", height: "500px" }} />
    </>
  );
};

export default NaverMap;
