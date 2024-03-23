"use client";

import useCurrentSlideIndex from "@/app/core/map/hooks/use-current-slide-index";
import { ComponentType, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

type SwiperSettings = {
  loop?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
};

// props 타입 정의
type CardCarouselProps<T> = {
  data: T[]; // images는 문자열 배열입니다.
  Component: ComponentType<{ data: T }>;
  isLazy?: boolean;
  onActiveSlideChange?: (index: number) => void;
  currentData?: T;
  //ComponentType 일수도 있음
} & SwiperSettings;

const CardCarousel = <T extends { id: string | number }>({
  data,
  Component,
  isLazy = false,
  loop = true,
  pagination = false,
  autoplay = false,
  mousewheel = false,
  keyboard = false,
  currentData,
  onActiveSlideChange
}: CardCarouselProps<T>) => {
  //TODO: 데이터 업데이트시에 마운트되어서 해당 주변 데이터 받아오도록
  const swiperRef = useRef<SwiperRef>(null);
  const isInitLoadRef = useRef(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const { currentSlideIndex } = useCurrentSlideIndex();

  useEffect(() => {
    if (currentSlideIndex === undefined) return;
    setIsInitialLoad(true);
    isInitLoadRef.current = true;
    const isBoolean = swiperRef.current?.swiper.slideToLoop(currentSlideIndex);
  }, [currentSlideIndex]);

  const handleSlideChange = (swiper: {
    realIndex: number;
    activeIndex: number;
  }) => {
    if (!isInitLoadRef.current) return;

    onActiveSlideChange?.(swiper.realIndex);
    // 슬라이드 변경이 사용자의 직접적인 액션에 의한 것이라면, onActiveSlideChange를 호출합니다.
  };

  const isKeyboard = keyboard
    ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
      }
    : false;

  const isMousewheel = mousewheel ? { sensitivity: 1 } : false;
  const isAutoplay = autoplay
    ? { delay: 2500, disableOnInteraction: true }
    : false;
  const isPagination = pagination ? { clickable: true } : false;

  return (
    <div>
      <Swiper
        ref={swiperRef}
        modules={[Keyboard, Pagination, Mousewheel]}
        slidesPerView={3}
        pagination={isPagination}
        keyboard={isKeyboard}
        loop={loop}
        // grabCursor={true}
        mousewheel={isMousewheel}
        speed={400}
        spaceBetween={5}
        autoplay={isAutoplay}
        onSlideChange={handleSlideChange}
        onSliderFirstMove={() => {
          console.log("slider first move");
          isInitLoadRef.current = true; // Swiper 초기화 시 초기 로드 상태를 false로 설정
        }}
      >
        {data?.map((data) => (
          /*첫화면 레이지 로딩 걸릴 경우 오류 발생하니 주의할 것 */
          <SwiperSlide key={`${data.id}`} lazy={isLazy}>
            <Component data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
