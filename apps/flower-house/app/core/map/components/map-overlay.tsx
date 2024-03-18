"use client";

import useCopyAndReplaceMap from "@/app/core/map/hooks/use-copy-and-replace-map";
import useMap from "@/app/core/map/hooks/use-map";

import { FC } from "react";

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const copyAndReplaceMap = useCopyAndReplaceMap();
  const { resetMapOptions } = useMap();

  return (
    <div className="fixed top-0">
      <button onClick={resetMapOptions}>Reset</button>
      {/*현재 위치 url로 복사하기 */}
      <button onClick={copyAndReplaceMap}>Copy</button>
    </div>
  );
};

export default MapOverlay;
