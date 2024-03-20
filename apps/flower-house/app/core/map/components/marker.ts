import type {
  Coordinates,
  ImageIcon,
  Map
} from "@/app/core/shared/types/map-types";
import { useEffect } from "react";

export type MarkerProps = {
  map: Map;
  coordinates: Coordinates;
  icon?: ImageIcon;
  onClick?: () => void;
};

// 마커 컴포넌트
const Marker: React.FC<MarkerProps> = ({
  map,
  coordinates,
  icon,
  onClick
}): null => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon
      });
    }

    // 클릭 이벤트 있을 경우 설정
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
