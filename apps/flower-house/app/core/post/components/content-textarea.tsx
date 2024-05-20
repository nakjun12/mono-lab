import { PostFeedsRequest } from "@/app/core/shared/utils/models/request";

interface IProps {
  postDatas: PostFeedsRequest;
  updatePostData: (value: any, category: string) => void;
}

export default function ContentTextareaComponent({
  postDatas,
  updatePostData
}: IProps) {
  return (
    <div>
      <textarea
        id="story"
        name="story"
        className="w-full h-24 resize-none border-none"
        placeholder="해당 장소에 대한 한줄 소개글을 작성해주세요..."
        onChange={(e) => updatePostData(e.target.value, "content")}
        value={postDatas.content}></textarea>
    </div>
  );
}
