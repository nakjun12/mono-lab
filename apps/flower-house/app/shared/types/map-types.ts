export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type Marker = {
  map: NaverMap;
  coordinates: Coordinates;
  icon?: ImageIcon;
  onClick?: () => void;
};

export type ImageIcon = {
  url: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
  scaledSize?: naver.maps.Size;
};

export type Store = {
  nid: string; // 맛집의 고유 식별자
  name: string; // 맛집의 이름
  coordinates: Coordinates; // 맛집의 위치 (위도, 경도)
  season: number; // 맛집의 계절
  description?: string; // 선택적 필드
  category?: string; // 선택적 필드
  // 필요에 따라 더 많은 속성 추가 가능
  // 예: description: string; // 맛집에 대한 설명
  // 예: category: string; // 맛집의 카테고리
};
