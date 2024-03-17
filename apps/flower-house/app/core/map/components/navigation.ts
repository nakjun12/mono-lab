import type { Map, NavigationInfo } from "@/app/core/shared/types/map-types";
import React, { useEffect } from "react";

type NavigationComponentProps = {
  map: Map;
  navigationInfo: NavigationInfo;
};

const NavigationComponent: React.FC<NavigationComponentProps> = ({
  map,
  navigationInfo
}) => {
  useEffect(() => {
    // trafast 배열에서 첫 번째 요소의 경로(path) 데이터 추출 및 변환
    const firstTrafast = navigationInfo.route.trafast[0];
    const polylinePath = firstTrafast.path.map((latLng) => {
      return new naver.maps.LatLng(latLng[1], latLng[0]); // naver.maps.LatLng 객체로 변환
    });

    // 폴리라인 생성 및 지도에 추가
    const polyline = new naver.maps.Polyline({
      map: map,
      path: polylinePath,
      strokeColor: "#5347AA",
      strokeWeight: 5
    });

    // 출발지 좌표 추출 및 출발지 마커 생성
    const startLocation = firstTrafast.summary.start.location;
    const startMarker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(startLocation[1], startLocation[0]),
      title: "출발지"
    });

    // 도착지 좌표 추출 및 도착지 마커 생성
    const goalLocation = firstTrafast.summary.goal.location;
    const endMarker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(goalLocation[1], goalLocation[0]),
      title: "도착지"
    });

    // 컴포넌트가 언마운트될 때 폴리라인과 마커를 지도에서 제거
    return () => {
      polyline.setMap(null);
      startMarker.setMap(null);
      endMarker.setMap(null);
    };
  }, [map, navigationInfo]); // map 객체나 navigationInfo가 변경될 때마다 폴리라인과 마커를 다시 그림

  return null; // 이 컴포넌트는 UI를 직접 렌더링하지 않음
};

export default NavigationComponent;
