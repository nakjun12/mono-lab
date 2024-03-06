import type { Store } from "../types/map-types";
export const STORES: Store[] = [
  {
    nid: "store-1",
    name: "봄의 꽃 카페",
    coordinates: [37.5643, 126.977], // 서울 광화문 광장 근처
    season: 1,
    description: "봄에 아름다운 꽃을 볼 수 있는 카페입니다.",
    category: "카페"
  },
  {
    nid: "store-2",
    name: "여름 해변 식당",
    coordinates: [37.5651, 126.978], // 서울 청계천 근처
    season: 2,
    description: "여름에 시원한 바람과 함께 즐기는 식당입니다.",
    category: "해산물"
  },
  {
    nid: "store-3",
    name: "가을 산책길 빵집",
    coordinates: [37.572, 126.979], // 서울 북촌 한옥마을 근처
    season: 3,
    description: "가을 단풍이 아름다운 산책길에 위치한 빵집입니다.",
    category: "베이커리"
  },
  {
    nid: "store-4",
    name: "겨울 난로 카페",
    coordinates: [37.5617, 126.983], // 서울 이화벽화마을 근처
    season: 4,
    description: "겨울에 따뜻한 난로 옆에서 즐기는 카페입니다.",
    category: "카페"
  }
];
