"use client";
import ResetButton from "@/app/core/map/components/reset-button";
import ShareButton from "@/app/core/map/components/share-button";
import CardComponent from "@/app/core/shared/components/card";
import DynamicSwiperCarousel from "@/app/core/shared/components/dynamic-carousel";
import { FC } from "react";

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  return (
    <div className="fixed top-0">
      {/*맵 옵션 리셋하기 */}
      <ResetButton />
      <ShareButton />

      {/*현재 위치 url로 복사하기 */}
      <CardComponent />
      <DynamicSwiperCarousel
        Component={CardComponent}
        data={[
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 }
        ]}
      />
    </div>
  );
};

export default MapOverlay;
