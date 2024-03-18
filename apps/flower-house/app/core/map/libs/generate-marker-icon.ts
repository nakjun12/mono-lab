import type { ImageIcon } from "@/app/core/shared/types/map-types";

// 마커 타입에 따른 URL 매핑
export const MARKER_URLS = {
  forsythia: "/icons/map-icons/forsythia.svg",
  cherryBlossom: "/icons/map-icons/cherry-blossom.svg"
};

interface GenerateMarkerIconProps {
  type: keyof typeof MARKER_URLS;
  isSelected: boolean;
}

// 마커의 기본 사이즈와 선택됐을 때 증가되는 사이즈

// props를 입력으로 받는 마커 아이콘 생성 함수
export function generateMarkerIcon({
  type,
  isSelected
}: GenerateMarkerIconProps): ImageIcon {
  const url = MARKER_URLS[type]; // 마커 타입에 따른 URL 선택
  const DEFAULT_MARKER_SIZE = new naver.maps.Size(22, 22); // 기본 사이즈
  const SELECTED_MARKER_SIZE = new naver.maps.Size(33, 33); // 선택되었을 때의 사이즈

  const size = isSelected ? SELECTED_MARKER_SIZE : DEFAULT_MARKER_SIZE; // 선택 상태에 따른 사이즈 조정

  return {
    url,
    size,
    scaledSize: size, // 마커 사이즈에 맞게 scaledSize도 조정
    anchor: new naver.maps.Point(size.width / 2, size.height / 2), // 사이즈에 따른 앵커 포인트 조정
    origin: new naver.maps.Point(0, 0)
  };
}
