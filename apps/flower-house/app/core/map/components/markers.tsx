import MarkerComponent from "@/app/core/map/components/marker";
import useCurrentMarker from "@/app/core/map/hooks/use-current-marker";
import useMap from "@/app/core/map/hooks/use-map";
import useMarkers from "@/app/core/map/hooks/use-markers";
import { generateMarkerIcon } from "@/app/core/map/libs/generate-marker-icon";

const Markers = () => {
  const { map } = useMap();
  const { markers } = useMarkers(); // 마커관리 SWR
  const { currentMarker, setCurrentMarker, clearCurrentMarker } =
    useCurrentMarker(); // 현재 마커 설정 및 초기화 함수

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
              console.log("setCurrentMarker", Marker);
              setCurrentMarker(Marker);
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
