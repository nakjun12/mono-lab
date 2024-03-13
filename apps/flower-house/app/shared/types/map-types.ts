export type Map = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type ImageIcon = {
  url: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
  scaledSize?: naver.maps.Size;
};

export type Marker = {
  //초기 설정
  nid: string; // 맛집의 고유 식별자
  name: string; // 맛집의 이름
  coordinates: Coordinates; // 맛집의 위치 (위도, 경도)
  season: number; //  계절
  description?: string; // 선택적 필드
  category?: string; // 선택적 필드
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
