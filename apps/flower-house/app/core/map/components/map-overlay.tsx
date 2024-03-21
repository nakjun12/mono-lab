"use client";

import DynamicSwiperCarousel from "@/app/core/map/components/card-carousel";
import ResetButton from "@/app/core/map/components/reset-button";
import { useAddressOnMove } from "@/app/core/map/hooks/use-address-on-move";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { useSearchFromAddress } from "@/app/core/map/hooks/use-search-from-address";
import CardComponent from "@/app/core/shared/components/card/place-info-card";
import SearchBar from "@/app/core/shared/components/search-bar";
import { FC, useEffect } from "react";
interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const { map } = useMap();

  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentMarker, setCurrentMarker } = useCurrentMarker();
  const { reverseGeocodeResults, isLoading, isError } = useAddressOnMove(map);
  const { geocodeResult, updateAddress, searchedAddress } =
    useSearchFromAddress();

  useEffect(() => {
    if (geocodeResult) {
      const lat = parseFloat(geocodeResult.y);
      const lng = parseFloat(geocodeResult.x);
      const coordinates = new window.naver.maps.LatLng(lat, lng);
      map.panTo(new window.naver.maps.LatLng(coordinates));
      console.log(geocodeResult, "geocodeResult");
    }
  }, [geocodeResult]);

  const handleSwiperClick = (index: number) => {
    if (!markers) return; // 마커 데이터가 유효하지 않으면 함수 실행 중단

    const num = index + 1 >= markers.length ? 0 : index + 1;
    const marker = markers[num];

    setCurrentMarker(marker);
    const markerPosition = new window.naver.maps.LatLng(...marker.coordinates);
    map.panTo(markerPosition);
  };

  if (!map || !markers) return null;
  console.log(geocodeResult, searchedAddress, "이거");

  const placeholder = reverseGeocodeResults || "주소를 입력해주세요";
  return (
    <div>
      <div className="fixed top-0">
        {/*맵 옵션 리셋하기 */}
        <ResetButton />
        <div className="flex justify-center w-screen ">
          <SearchBar onSearch={updateAddress} placeholder={placeholder} />
        </div>
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
