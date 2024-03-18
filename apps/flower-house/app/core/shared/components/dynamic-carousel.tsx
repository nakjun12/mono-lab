import { ComponentType, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SwiperSettings = {
  loop?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
};

// props 타입 정의
type DynamicSwiperCarouselProps<T> = {
  data: T[]; // images는 문자열 배열입니다.
  Component: ComponentType<{ data: T }>;
  isLazy?: boolean;
  //ComponentType 일수도 있음
} & SwiperSettings;

const INITIAL_SLIDES_PER_VIEW = 4;

const DynamicSwiperCarousel = <T extends { id: string | number }>({
  data,
  Component,
  isLazy = false,
  loop = true,
  pagination = true,
  autoplay = false,
  mousewheel = false,
  keyboard = false
}: DynamicSwiperCarouselProps<T>) => {
  const [slidesPerView, setSlidesPerView] = useState(INITIAL_SLIDES_PER_VIEW);
  const updatedSlidesPerView = useRef(INITIAL_SLIDES_PER_VIEW);

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
    <div className="p-4">
      <Swiper
        modules={[Keyboard, Pagination, Mousewheel, Autoplay]}
        slidesPerView={slidesPerView}
        className="mt-4 z-0"
        pagination={isPagination}
        keyboard={isKeyboard}
        loop={loop}
        // grabCursor={true}
        mousewheel={isMousewheel}
        speed={400}
        spaceBetween={5}
        autoplay={isAutoplay}
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

export default DynamicSwiperCarousel;
