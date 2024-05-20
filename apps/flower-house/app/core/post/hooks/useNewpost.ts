import { filesAtom } from "@/app/core/shared/atoms/files";
import { postFeeds, uploadImage } from "@/app/core/shared/utils/api";
import { PostFeedsRequest } from "@/app/core/shared/utils/models/request";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useNewpost = () => {
  const router = useRouter();
  const [files, setFiles] = useAtom(filesAtom);

  const [postDatas, setPostDatas] = useState<PostFeedsRequest>({
    content: "",
    password: "",
    capturedAt: "",
    locationId: 1,
    images: [
      {
        originUrl: "",
        originETag: "",
        thumbUrl: "",
        thumbETag: "",
        flowerId: 1,
        floweringStatus: 0
      }
    ]
  });
  const [prevPW, setPrevPW] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [imageForm, setImageForm] = useState<FormData>();
  const [selectedFloweringId, setSelectedFloweringId] = useState(0);

  const [selectedSubmit, setSelectedSubmit] = useState(false);

  useEffect(() => {
    const formData = new FormData();
    if (!files) return;
    formData.append("image", files);
    setImageForm(formData);
  }, []);

  useEffect(() => {
    // TODO: 날짜 locale
    const curDate = new Date();
    const curDateISO = curDate.toISOString();
    updatePostData(curDateISO.slice(0, 16), "capturedAt");
  }, []);

  const handleButtonClick = async () => {
    if (!imageForm) {
      throw new Error("이미지 파일이 없습니다.");
    }

    await uploadImage(imageForm).then((res) => {
      if (res.status !== 201) {
        throw new Error("response 못받음");
      }

      const originETag = res.data.originETag;
      const originUrl = res.data.originUrl;
      const thumbETag = res.data.thumbETag;
      const thumbUrl = res.data.thumbUrl;

      setPostDatas((prev) => {
        const newData = {
          ...prev,
          images: [
            { ...prev.images[0], originUrl, originETag, thumbETag, thumbUrl }
          ]
        };
        return newData;
      });
    });

    setSelectedSubmit(true);
  };

  useEffect(() => {
    if (!selectedSubmit) return;
    setSelectedSubmit(false);

    postFeeds(postDatas).then((res) => {
      if (res.status === 201) {
        setFiles(null);
        const id = res.data.id;
        router.push(`/feeds/${id}`);
      }
    });
  }, [selectedSubmit, postDatas]);

  const updatePW = (value: any, category: string) => {
    // TODO: 비밀번호 확인이랑 다를경우 안내메시지 출력해줘야함
    // TODO: 유효성검사
    if (category === "check") {
      setCheckPW(value);
      updatePostData(checkPW && value === prevPW ? value : "", "password");
    } else if (category === "prev") {
      setPrevPW(value);
      updatePostData(value === checkPW ? value : "", "password");
    }
  };

  const updatePostData = (value: any, category: string) => {
    setPostDatas((prev) => {
      const newData = {
        ...prev,
        [category]: value
      };
      return newData;
    });
  };

  return {
    postDatas,
    setPostDatas,
    updatePostData,
    setSelectedFloweringId,
    selectedFloweringId,
    prevPW,
    updatePW,
    checkPW,
    handleButtonClick
  };
};

export default useNewpost;
