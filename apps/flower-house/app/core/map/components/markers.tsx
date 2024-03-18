import MarkerComponent from "@/app/core/map/components/marker";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { generateMarkerIcon } from "@/app/core/map/libs/generate-marker-icon";
import type { Marker } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";
const Markers = () => {
  const { map } = useMap();
  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentMarker, setCurrentMarker, clearCurrentMarker } =
    useCurrentMarker(); // 현재 마커 설정 및 초기화 함수

  const handleMarkerClick = useCallback(
    (marker: Marker) => {
      setCurrentMarker(marker);
      // 마커의 위치를 기준으로 경계를 생성합니다.

      const markerPosition = new window.naver.maps.LatLng(
        ...marker.coordinates
      );
      map.panTo(markerPosition);
    },
    [map]
  );

  if (!map || !markers) return null;

  return (
    <>
      {markers.map((Marker) => {
        return (
          <MarkerComponent
            map={map}
            coordinates={Marker.coordinates}
            key={Marker.id}
            icon={generateMarkerIcon({
              type: Marker.type,
              isSelected: false
            })}
            onClick={() => {
              handleMarkerClick(Marker);
            }}
          />
        );
      })}
      {currentMarker && (
        <MarkerComponent
          map={map}
          coordinates={currentMarker.coordinates}
          icon={generateMarkerIcon({
            type: currentMarker.type,
            isSelected: true
          })}
          onClick={clearCurrentMarker}
          key={currentMarker.id}
        />
      )}

      {/* <Navigation map={map} navigationInfo={routeData} /> */}
    </>
  );
};
export default Markers;
