"use client";

import useCopyAndReplaceMap from "@/app/core/hooks/use-copy-and-replace-map";
import useMap from "@/app/core/hooks/use-map";

import { FC, ReactNode } from "react";

interface MapOverlayProps {
  children: ReactNode;
}

const MapOverlay: FC<MapOverlayProps> = ({ children }) => {
  const copyAndReplaceMap = useCopyAndReplaceMap();
  const { resetMapOptions } = useMap();

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
