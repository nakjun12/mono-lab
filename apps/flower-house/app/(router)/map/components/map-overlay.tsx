"use client";

import useCopyAndReplaceMap from "@/app/(router)/map/hooks/use-copy-and-replace-map";
import useMap from "@/app/(router)/map/hooks/use-map";
import useMarkers from "@/app/(router)/map/hooks/use-markers";
import { MARKERS } from "@/app/shared/lib/dummy";
import { useEffect } from "react";

import React, { ReactNode } from "react";

interface MapOverlayProps {
  children: ReactNode;
}

const MapOverlay: React.FC<MapOverlayProps> = ({ children }) => {
  const { initializeMarkers } = useMarkers();
  const copyAndReplaceMap = useCopyAndReplaceMap();
  const { resetMapOptions } = useMap();

  useEffect(() => {
    //초기 마커 더미로 설정함
    //추후 서버로 업데이트 예정
    initializeMarkers(MARKERS); //전역 상태 업데이트
  }, [initializeMarkers]);

  return (
    <div>
      {children}
      <button onClick={resetMapOptions}>Reset</button>
      {/*현재 위치 url로 복사하기 */}
      <button onClick={copyAndReplaceMap}>Copy</button>
    </div>
  );
};

export default MapOverlay;
