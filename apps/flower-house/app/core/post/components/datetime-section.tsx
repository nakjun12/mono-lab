import { PostFeedsRequest } from "@/app/core/shared/utils/models/request";

interface IProps {
  postDatas: PostFeedsRequest;
  updatePostData: (value: any, category: string) => void;
}

export default function DatetimeSectionComponent({
  postDatas,
  updatePostData
}: IProps) {
  return (
    <div className="flex justify-between">
      <div>
        <span>날짜/시간</span>
      </div>
      <input
        type="datetime-local"
        min="2020-01-01T00:00"
        max="2024-12-31T24:00"
        onChange={(e) => updatePostData(e.target.value, "capturedAt")}
        value={postDatas.capturedAt}
      />
    </div>
  );
}
