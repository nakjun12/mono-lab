import { MARKER_URLS } from "@/app/core/map/libs/generate-marker-icon";

export type Map = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type ImageIcon = {
  url: string;
  size?: naver.maps.Size;
  anchor?: naver.maps.Point;
  origin?: naver.maps.Point;
  scaledSize?: naver.maps.Size;
};

export type Marker = {
  id: string; // 마커의 고유 식별자
  title: string; // 마커의 제목 (예: 꽃의 이름)
  address: string; // 꽃이 위치한 한글 주소
  type: keyof typeof MARKER_URLS; // 마커 타입
  thumbnail: string; // 마커의 썸네일 이미지 URL
  coordinates: Coordinates; // 마커의 위치 좌표
  category?: string; // 마커의 카테고리 (선택 사항, 예: "Wildflowers")
  likes: number; // 마커에 대한 추천수
  comments: number; // 마커에 달린 피드수
};

export type NavigationInfo = {
  code: number;
  message: string;
  currentDateTime: string;
  route: {
    trafast: Trafast[];
  };
};

type Trafast = {
  summary: Summary;
  path: Coordinates[];
};

type Summary = {
  start: {
    location: Coordinates; // Coordinates 타입을 number[]로 사용
  };
  goal: {
    location: Coordinates; // Coordinates 타입을 number[]로 사용
    dir: number;
  };
  distance: number;
  duration: number;
  bbox: Coordinates[]; // bbox 타입을 Coordinates[]로 유지, 여기서 Coordinates는 number[]
  tollFare: number;
  taxiFare: number;
  fuelPrice: number;
};
