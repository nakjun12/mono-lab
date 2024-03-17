import MarkerComponent from "@/app/core/map/components/marker";
import useCurrentMarker, {
  CURRENT_MARKER_KEY
} from "@/app/core/map/hooks/use-current-marker";
import { MAP_KEY } from "@/app/core/map/hooks/use-map";
import { MARKERS_KEY } from "@/app/core/map/hooks/use-markers";
import { generateMarkerMarkerIcon } from "@/app/core/map/libs/generate-store-marker-icon";
// import { routeData } from "@/app/core/lib/dummy";
import type { Map, Marker } from "@/app/core/shared/types/map-types";
import useSWR from "swr";
// import Navigation from "./navigation";

const Markers = () => {
  const { data: map } = useSWR<Map>(MAP_KEY); // 맵관리 SWR
  const { data: markers } = useSWR<Marker[]>(MARKERS_KEY); // 마커관리 SWR
  const { data: CurrentMarker } = useSWR<Marker>(CURRENT_MARKER_KEY); // 현재 마커관리 SWR
  const { setCurrentMarker, clearCurrentMarker } = useCurrentMarker(); // 현재 마커 설정 및 초기화 함수
  //   console.log("Markers render", map, Markers, CurrentMarker);
  if (!map || !markers) return null;
  return (
    <>
      {markers.map((Marker) => {
        return (
          <MarkerComponent
            map={map}
            coordinates={Marker.coordinates}
            key={Marker.id}
            onClick={() => {
              console.log("setCurrentMarker", Marker);
              setCurrentMarker(Marker);
            }}
          />
        );
      })}
      {CurrentMarker && (
        <MarkerComponent
          map={map}
          coordinates={CurrentMarker.coordinates}
          icon={generateMarkerMarkerIcon(1, true)}
          onClick={clearCurrentMarker}
          key={CurrentMarker.id}
        />
      )}

      {/* <Navigation map={map} navigationInfo={routeData} /> */}
    </>
  );
};
export default Markers;
