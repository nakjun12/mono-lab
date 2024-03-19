import { MARKER_URLS } from "@/app/core/map/libs/generate-marker-icon";
import Image from "next/image";
import React from "react";
interface CardComponentProps {
  // 여기에 필요한 props를 추가하세요.
}

const CardComponent: React.FC<CardComponentProps> = (
  {
    // 여기에서 props를 구조분해할당하세요.
  }
) => {
  const url = MARKER_URLS["forsythia"];
  return (
    <div className="flex max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex-1 p-4 space-y-4 w-2/3">
        <div className="flex items-center space-x-2 max-w-50">
          <h3 className="font-bold text-xl text-gray-900 break-all overflow-hidden">
            오류동 프루지오
          </h3>

          <Image src={url} width={22} height={22} alt="Forsythia" />
        </div>
        <p className="text-gray-600 text-base">서울 구로구 오류로9길 11</p>
        <div className="flex justify-start items-center gap-4">
          <span className="text-gray-500">🚩 240m</span>
          <span className="text-gray-500">👍 10</span>
          <span className="text-gray-500">📝 10</span>
        </div>
      </div>
      <div className="p-2 w-1/3">
        <Image
          src={"/example.png"}
          width={180} // 이미지 비율에 맞는 적절한 너비 설정
          height={180} // 이미지 비율에 맞는 적절한 높이 설정
          alt="Cute dogs"
          className="rounded-lg" // 둥근 모서리 추가
        />
      </div>
    </div>
  );
};

export default CardComponent;
