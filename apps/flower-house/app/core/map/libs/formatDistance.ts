// 거리에 따라 적절한 단위로 변환하는 함수
export const formatDistance = (distanceInMeters: number) => {
  if (distanceInMeters < 1000) {
    // 1000미터 미만이면 미터 단위로 반환
    return `${distanceInMeters.toFixed(0)}m`;
  } else if (distanceInMeters >= 1000) {
    // 1000미터 이상이면 킬로미터 단위로 변환하여 반환
    return `${(distanceInMeters / 1000).toFixed(1)}km`;
  }

  return "알수없음";
};
