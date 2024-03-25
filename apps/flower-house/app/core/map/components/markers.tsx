import MarkerComponent from "@/app/core/map/components/marker";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useCurrentSlideIndex from "@/app/core/map/hooks/use-current-slide-index";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { generateMarkerIcon } from "@/app/core/map/libs/generate-marker-icon";
import type { Marker } from "@/app/core/shared/types/map-types";
import { useCallback } from "react";

const Markers = () => {
  const { map } = useMap();
  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentMarker, setCurrentMarker } = useCurrentMarker(); // 현재 마커 설정 및 초기화 함수
  const { setCurrentSlideIndex } = useCurrentSlideIndex(); // 현재 슬라이드 설정 및 초기화 함수

  const handleMarkerClick = useCallback(
    (marker: Marker) => {
      if (map && markers) {
        const index = markers.findIndex((m) => m.id === marker.id);
        const num = index - 1 < 0 ? markers.length - 1 : index - 1;
        setCurrentSlideIndex(num);
      }
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
          key={currentMarker.id}
        />
      )}

      {/* <Navigation map={map} navigationInfo={routeData} /> */}
    </>
  );
};
export default Markers;
