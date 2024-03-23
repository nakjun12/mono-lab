"use client";

import CardCarousel from "@/app/core/map/components/card-carousel";
import CurrentLocationButton from "@/app/core/map/components/current-location-button";
import { useAddressOnMove } from "@/app/core/map/hooks/use-address-on-move";
import useCurrentLocation from "@/app/core/map/hooks/use-current-location";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { useSearchFromAddress } from "@/app/core/map/hooks/use-search-from-address";
import CardComponent from "@/app/core/shared/components/card/place-info-card";
import SearchBar from "@/app/core/shared/components/search-bar";
import { FC, useEffect } from "react";

const OVERLAY_BOTTOM_WIDTH = "w-[800px]";
const OVERLAY_MD_BOTTOM_WIDTH = `md:w-[800px]`;

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const { map } = useMap();

  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentLocation, calculateDistance, setCurrentLocation } =
    useCurrentLocation();
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

  const currentLocationMap = () => {
    setCurrentLocation(map);
  };

  // const handleDistance = (targetCoords: Coordinates) => {
  //   if (!currentLocation) return; // 현재 위치가 없으면 함수 종료
  //   const distanceInMeters = calculateDistance(targetCoords, map); // 거리 계산
  //   if (distanceInMeters !== undefined) {
  //     // 거리를 상태에 저장 (예: "240m").
  //     const formattedDistance = formatDistance(distanceInMeters);
  //     return formattedDistance;
  //   }
  //   return "거리 계산 중...";
  // };

  if (!map || !markers) return null;
  console.log(geocodeResult, searchedAddress, "이거");

  const placeholder =
    reverseGeocodeResults?.roadAddress || "주소를 입력해주세요";
  return (
    <div>
      <div className="fixed top-0">
        {/*맵 옵션 리셋하기 */}

        <div className="flex justify-center w-screen ">
          <SearchBar onSearch={updateAddress} placeholder={placeholder} />
        </div>
      </div>
      <div
        className={`fixed bottom-[80px] flex flex-col justify-center w-screen z-20`}
      >
        {/*현재 위치 url로 복사하기 */}
        {/* <CardComponent /> */}
        <div className="flex justify-center w-screen "></div>
        <div className="flex flex-col justify-center w-screen items-center ">
          <div
            className={`relative h-12 flex items-center justify-center mb-1 w-screen ${OVERLAY_MD_BOTTOM_WIDTH}`}
          >
            <div className="absolute left-0 pl-1">
              <CurrentLocationButton onCurrentLocation={currentLocationMap} />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={currentLocationMap}
            >
              현위치 검색
            </button>
          </div>
          <div className={OVERLAY_BOTTOM_WIDTH}>
            {markers && markers.length > 0 && (
              <CardCarousel
                Component={CardComponent}
                data={markers}
                onActiveSlideChange={handleSwiperClick}
                currentData={currentMarker}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapOverlay;
