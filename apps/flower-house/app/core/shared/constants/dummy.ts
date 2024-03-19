import type { Marker, NavigationInfo } from "@/app/core/shared/types/map-types";
export const MARKERS: Marker[] = [
  {
    id: "marker-1",
    title: "긴고랑로의 봄 꽃",
    address: "긴고랑로",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.5630685, 127.086228], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 100,
    comments: 15
  },
  {
    id: "marker-2",
    title: "영화사로의 여름 꽃",
    address: "영화사로",
    type: "cherryBlossom",
    thumbnail: "/example.png",
    coordinates: [37.5546825, 127.094328], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 150,
    comments: 25
  },
  {
    id: "marker-3",
    title: "신정로의 가을 꽃",
    address: "신정로",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.510015, 126.843236], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 80,
    comments: 10
  },
  // 다른 마커 데이터도 동일하게 수정...
  {
    id: "marker-4",
    title: "곰달래로5길의 겨울 꽃",
    address: "곰달래로5길",
    type: "cherryBlossom",
    thumbnail: "/example.png",
    coordinates: [37.532835, 126.8320005], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 65,
    comments: 12
  },
  {
    id: "marker-5",
    title: "곰달래로6길의 봄 꽃",
    address: "곰달래로6길",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.527941, 126.835969], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 110,
    comments: 20
  },
  {
    id: "marker-6",
    title: "남부순환로72길의 꽃들",
    address: "남부순환로72길",
    type: "cherryBlossom",
    thumbnail: "/example.png",
    coordinates: [37.5202865, 126.836785], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 95,
    comments: 18
  },
  {
    id: "marker-7",
    title: "남부순환로88길의 자연",
    address: "남부순환로88길",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.51136, 126.838941], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 75,
    comments: 14
  },
  {
    id: "marker-8",
    title: "여의동로의 봄 꽃",
    address: "여의동로",
    type: "cherryBlossom",
    thumbnail: "/example.png",
    coordinates: [37.525248, 126.9234625], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 120,
    comments: 22
  },
  {
    id: "marker-9",
    title: "여의서로의 향기로운 꽃",
    address: "여의서로",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.525248, 126.8234625], // 동일한 위치를 공유하는 것으로 가정
    category: "Wildflowers",
    likes: 130,
    comments: 25
  },
  {
    id: "marker-10",
    title: "도신로의 꽃길",
    address: "도신로",
    type: "cherryBlossom",
    thumbnail: "/example.png",
    coordinates: [37.509017, 126.9066115], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 140,
    comments: 30
  }
];
// 주어진 JSON 데이터에서 경로(path) 데이터 추출
export const routeData: NavigationInfo = {
  code: 0,
  message: "길찾기를 성공하였습니다.",
  currentDateTime: "2018-12-21T14:45:34",
  route: {
    trafast: [
      {
        summary: {
          start: { location: [127.1058342, 37.3597078] },
          goal: { location: [129.0759853, 35.1794697], dir: 2 },
          distance: 382403,
          duration: 15372873,
          bbox: [
            [127.0833901, 35.1793188],
            [129.0817364, 37.3599059]
          ],
          tollFare: 24500,
          taxiFare: 319900,
          fuelPrice: 46027
        },
        path: [
          [127.1059968, 37.3597093],
          // ... 중략 ...
          [129.0764276, 35.1795108],
          [129.0762855, 35.1793188]
        ]
      }
    ]
  }
};
