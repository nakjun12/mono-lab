import type { Marker } from "@/app/shared/types/map-types";
import { useEffect } from "react";

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  useEffect(() => {
    console.log("Marker useEffect", map, icon, coordinates, onClick);
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, "click", onClick);
    }
    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

export default Marker;
