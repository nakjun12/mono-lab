"use client";

import CardCarousel from "@/app/core/map/components/card-carousel";
import CurrentLocationButton from "@/app/core/map/components/current-location-button";
import Markers from "@/app/core/map/components/markers";
import { useAddressOnMove } from "@/app/core/map/hooks/use-address-on-move";
import useCurrentLocation from "@/app/core/map/hooks/use-current-location";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { useSearchFromAddress } from "@/app/core/map/hooks/use-search-from-address";
import { formatDistance } from "@/app/core/map/libs/formatDistance";
import CardComponent from "@/app/core/shared/components/card/place-info-card";
import SearchBar from "@/app/core/shared/components/search-bar";
import type { Coordinates } from "@/app/core/shared/types/map-types";
import { FC, useCallback, useEffect } from "react";

const OVERLAY_WIDTH = "w-[800px]";
const OVERLAY_MD_WIDTH = `md:w-[800px]`;

interface MapOverlayProps {}

const MapOverlay: FC<MapOverlayProps> = ({}) => {
  const { map } = useMap();
  const { markers } = useMarkers();
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
  }, [geocodeResult, map]);

  const handleSwiperClick = useCallback(
    (index: number) => {
      if (!markers) return;

      const nextIndex = (index + 1) % markers.length;
      const marker = markers[nextIndex];

      setCurrentMarker(marker);
      const markerPosition = new window.naver.maps.LatLng(
        ...marker.coordinates
      );
      map.panTo(markerPosition);
    },
    [markers, setCurrentMarker, map]
  );

  const currentLocationMap = useCallback(() => {
    setCurrentLocation(map);
  }, [setCurrentLocation, map]);

  const handleDistance = useCallback(
    (targetCoords: Coordinates): string => {
      if (!currentLocation) return "알 수 없음";

      const distanceInMeters = calculateDistance(targetCoords, map);
      return distanceInMeters !== undefined
        ? formatDistance(distanceInMeters)
        : "거리 계산 중...";
    },
    [currentLocation, calculateDistance, map]
  );

  if (!map || !markers) return null;

  const placeholder =
    reverseGeocodeResults?.roadAddress || "주소를 입력해주세요";
  return (
    <div>
      <div className="fixed top-0">
        <div className="flex justify-center w-screen ">
          <div className={OVERLAY_WIDTH}>
            <SearchBar onSearch={updateAddress} placeholder={placeholder} />
          </div>
        </div>
      </div>

      <Markers />

      <div
        className={`fixed bottom-[80px] flex flex-col justify-center w-screen z-20`}
      >
        <div className="flex justify-center w-screen "></div>
        <div className="flex flex-col justify-center w-screen items-center ">
          <div
            className={`relative h-12 flex items-center justify-center mb-1 w-screen ${OVERLAY_MD_WIDTH}`}
          >
            <div className="absolute left-0 pl-1">
              <CurrentLocationButton onCurrentLocation={currentLocationMap} />
            </div>
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={currentLocationMap}
            >
              현위치 검색
            </button> */}
          </div>
          <div className={OVERLAY_WIDTH}>
            {markers && markers.length > 0 && (
              <CardCarousel
                Component={CardComponent}
                datas={markers}
                onActiveSlideChange={handleSwiperClick}
                onDistance={handleDistance}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapOverlay;
