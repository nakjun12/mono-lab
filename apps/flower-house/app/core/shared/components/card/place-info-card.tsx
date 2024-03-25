import type { onDistance } from "@/app/core/map/components/card-carousel";
import ShareButton from "@/app/core/map/components/share-button";
import { MARKER_URLS } from "@/app/core/map/libs/generate-marker-icon";
import type { Marker } from "@/app/core/shared/types/map-types";
import Image from "next/image";
import { useEffect, useState } from "react";

type PlaceInfoCardProps = {
  data: Marker; // Marker 타입이 어떻게 정의되어 있는지에 따라 달라질 수 있음
  onDistance: onDistance;
};

const PlaceInfoCard: React.FC<PlaceInfoCardProps> = ({
  data: { title, type, address, thumbnail, likes, comments, coordinates },
  onDistance
}) => {
  const [distance, setDistance] = useState<string>("계산중.."); // 거리 상태 초기화

  useEffect(() => {
    const distance = onDistance(coordinates); // onDistance 함수를 사용하여 거리 계산
    setDistance(distance);
  }, [onDistance]);

  const url = MARKER_URLS[type]; // 구조 분해 할당을 사용하여 'type' 바로 접근

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-xl border-gray-200 shadow-md md:max-w-2xl cursor-pointer">
      <div className="flex max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
        <div className="flex-1 p-4 w-2/3 overflow-hidden">
          <div className="flex items-center space-x-2 max-w-50">
            <h3 className="font-bold text-xs text-gray-900 break-all overflow-hidden">
              {title} {/* 구조 분해 할당을 사용하여 'title' 바로 접근 */}
            </h3>
            <Image src={url} width={22} height={22} alt={type} />{" "}
            {/* 구조 분해 할당을 사용하여 'type' 바로 접근 */}
          </div>
          <p className="text-gray-600 text-[10px]">
            {address} {/* 구조 분해 할당을 사용하여 'address' 바로 접근 */}
          </p>
        </div>
        <div className="p-2 w-1/3">
          <Image
            src={thumbnail} // 구조 분해 할당을 사용하여 'thumbnail' 바로 접근
            width={180} // 이미지 비율에 맞는 적절한 너비 설정
            height={180} // 이미지 비율에 맞는 적절한 높이 설정
            alt="Place Thumbnail"
            className="rounded-lg" // 둥근 모서리 추가
          />
        </div>
      </div>
      <div className="flex justify-between items-center text-xs p-4 pt-0">
        {/* 좋아요 아이콘과 숫자 */}
        <span className="flex items-center text-gray-500 space-x-1">
          <span>👍</span>
          <span>{likes}</span>{" "}
          {/* 구조 분해 할당을 사용하여 'likes' 바로 접근 */}
        </span>
        {/* 댓글 아이콘과 숫자 */}
        <span className="flex items-center text-gray-500 space-x-1">
          <span>📝</span>
          <span>{comments}</span>{" "}
          {/* 구조 분해 할당을 사용하여 'comments' 바로 접근 */}
        </span>
        {/* 신고 아이콘과 시간 (여기서는 예시 데이터가 없으므로 기존 내용 유지) */}
        <span className="flex items-center text-gray-500 space-x-1 text-sm">
          <span>🚩</span>
          <span>{distance}</span>
        </span>
        {/* 공유 버튼 */}
        <ShareButton coordinates={coordinates} width={20} height={20} />{" "}
        {/* 구조 분해 할당을 사용하여 'coordinates' 바로 접근 */}
      </div>
    </div>
  );
};

export default PlaceInfoCard;
