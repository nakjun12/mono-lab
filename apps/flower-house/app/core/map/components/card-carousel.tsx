"use client";

import useCurrentSlideIndex from "@/app/core/map/hooks/use-current-slide-index";
import type { Coordinates, Marker } from "@/app/core/shared/types/map-types";
import { ComponentType, useEffect, useRef } from "react";
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

export type onDistance = (targetCoords: Coordinates) => string;

// props 타입 정의
type CardCarouselProps = {
  datas: Marker[]; // images는 문자열 배열입니다.
  onDistance: onDistance;
  onActiveSlideChange?: (index: number) => void;
  Component: ComponentType<{
    data: Marker; // Marker 타입이 어떻게 정의되어 있는지에 따라 달라질 수 있음
    onDistance: onDistance;
  }>;
  isLazy?: boolean;
} & SwiperSettings;

const CardCarousel = ({
  datas,
  Component,
  isLazy = false,
  loop = true,
  pagination = false,
  autoplay = false,
  mousewheel = false,
  keyboard = false,
  onActiveSlideChange,
  onDistance
}: CardCarouselProps) => {
  //TODO: 데이터 업데이트시에 마운트되어서 해당 주변 데이터 받아오도록
  const swiperRef = useRef<SwiperRef>(null);
  const isInitLoadRef = useRef(false);

  const { currentSlideIndex } = useCurrentSlideIndex();

  useEffect(() => {
    if (currentSlideIndex === undefined) return;

    isInitLoadRef.current = true;
    swiperRef.current?.swiper.slideToLoop(currentSlideIndex);
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
        {datas?.map((data) => (
          /*첫화면 레이지 로딩 걸릴 경우 오류 발생하니 주의할 것 */
          <SwiperSlide key={`${data.id}`} lazy={isLazy}>
            <Component data={data} onDistance={onDistance} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
