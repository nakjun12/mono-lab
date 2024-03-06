import type { ImageIcon } from "@/app/shared/types/map-types";

// 실제 마커 스프라이트 이미지에서 각 마커의 너비와 높이
const SCALED_MARKER_WIDTH = 100; // 예: 스프라이트 이미지 내 각 마커의 너비가 30px라고 가정
const SCALED_MARKER_HEIGHT = 400; // 예: 스프라이트 이미지 내 각 마커의 높이가 40px라고 가정

// 스프라이트 이미지 내 마커의 총 개수
const NUMBER_OF_MARKER = 10; // 예: 스프라이트 이미지 내 마커의 총 개수가 10개라고 가정

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  console.log("작동");
  return {
    url: isSelected ? "/footerIcons/home-off.svg" : "/footerIcons/home-off.svg",
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), // 스프라이트 이미지에서 각 마커의 시작 위치 계산
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER, // 전체 스프라이트 이미지의 너비
      SCALED_MARKER_HEIGHT // 전체 스프라이트 이미지의 높이
    )
  };
}
