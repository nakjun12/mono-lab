"use client";

import ResetButton from "@/app/core/map/components/reset-button";
import ShareButton from "@/app/core/map/components/share-button";
import useCopyAndReplaceMap from "@/app/core/map/hooks/use-copy-and-replace-map";
import { FC } from "react";

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const { copyAndReplaceUrl } = useCopyAndReplaceMap();

  return (
    <div className="fixed top-0">
      {/*맵 옵션 리셋하기 */}
      <ResetButton />
      <ShareButton />
      {/*현재 위치 url로 복사하기 */}
    </div>
  );
};

export default MapOverlay;
