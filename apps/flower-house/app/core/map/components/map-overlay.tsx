"use client";

import DynamicSwiperCarousel from "@/app/core/map/components/card-carousel";
import ResetButton from "@/app/core/map/components/reset-button";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import CardComponent from "@/app/core/shared/components/card/place-info-card";
import { FC } from "react";

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const { map } = useMap();
  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentMarker, setCurrentMarker } = useCurrentMarker();

  const handleSwiperClick = (index: number) => {
    if (!markers) return; // 마커 데이터가 유효하지 않으면 함수 실행 중단

    const num = index + 1 >= markers.length ? 0 : index + 1;
    const marker = markers[num];

    console.log("swiper.realIndex222num", num);
    setCurrentMarker(marker);
    const markerPosition = new window.naver.maps.LatLng(...marker.coordinates);
    map.panTo(markerPosition);
  };

  if (!map || !markers) return null;

  return (
    <div>
      <div className="fixed top-0 m-4">
        {/*맵 옵션 리셋하기 */}
        <ResetButton />
      </div>
      <div className={`fixed bottom-[80px] z-20`}>
        {/*현재 위치 url로 복사하기 */}
        {/* <CardComponent /> */}
        <div className="flex justify-center w-screen ">
          {markers && markers.length > 0 && (
            <DynamicSwiperCarousel
              Component={CardComponent}
              data={markers}
              onActiveSlideChange={handleSwiperClick}
              currentData={currentMarker}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapOverlay;
