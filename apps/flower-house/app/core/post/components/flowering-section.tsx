import { floweringMessages } from "@/app/core/post/constants";
import { PostFeedsRequest } from "@/app/core/shared/utils/models/request";
import { SetStateAction } from "jotai";
import Image from "next/image";
import { Dispatch } from "react";

interface IProps {
  setPostDatas: Dispatch<SetStateAction<PostFeedsRequest>>;
  setSelectedFloweringId: Dispatch<SetStateAction<number>>;
  selectedFloweringId: number;
}
export default function FloweringSectionComponent({
  setPostDatas,
  setSelectedFloweringId,
  selectedFloweringId
}: IProps) {
  return (
    <div>
      <span className="text-[#ED77B0]">🌸 개화도</span>
      <div className="flex justify-center align-center gap-3">
        {floweringMessages.map((message, idx) => (
          <Image
            key={message}
            src={`/newpostIcons/flowering-${idx}.svg`}
            alt={`flowering-${idx}-icon`}
            width={30}
            height={30}
            onClick={() => {
              setPostDatas((prev) => {
                const newData = {
                  ...prev,
                  images: [{ ...prev.images[0], floweringStatus: idx }]
                };
                return newData;
              });
              setSelectedFloweringId(idx);
            }}
            className={
              idx === selectedFloweringId ? "opacity-100" : "opacity-50"
            }
          />
        ))}
      </div>
      <div className="flex justify-center text-[#50555C] pt-2">
        {floweringMessages[selectedFloweringId]}
      </div>
    </div>
  );
}
