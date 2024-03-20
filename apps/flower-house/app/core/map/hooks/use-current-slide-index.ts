import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const CURRENT_SLIDE_KEY = "/current-slide";

//현재 선택한 캐러셀의 인덱스를 관리하는 커스텀 훅
//클릭을 통해서만 접근 가능한 상태
const useCurrentSlideIndex = () => {
  const { data: currentSlideIndex } = useSWR<number>(CURRENT_SLIDE_KEY);
  //현재 마커 설정
  const setCurrentSlideIndex = useCallback((num: number) => {
    mutate(CURRENT_SLIDE_KEY, num);
  }, []);

  //현재 마커 초기화
  const clearCurrentSlideIndex = useCallback(() => {
    mutate(CURRENT_SLIDE_KEY, null);
  }, []);

  return {
    currentSlideIndex,
    setCurrentSlideIndex,
    clearCurrentSlideIndex
  };
};
export default useCurrentSlideIndex;
