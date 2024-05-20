"use client";
import { filesAtom } from "@/app/core/shared/atoms/files";
import { useAtom } from "jotai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent, useEffect, useState } from "react";

interface FileInput {
  router: AppRouterInstance;
}

const FileInput: React.FC<FileInput> = ({ router }) => {
  // TODO: 이미지 3개
  const [files, setFiles] = useAtom(filesAtom);
  const [preview, setPreview] = useState<string | null>("");

  useEffect(() => {
    if (!files) {
      localStorage.setItem("prevImgData", "");
      setPreview(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      localStorage.setItem("prevImgData", fileReader.result as string);
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(files);
  }, [files]);

  useEffect(() => {
    if (!preview) return;
    router.push("/newpost/preview");
  }, [preview]);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    let targetFile: File;
    if (e.target.files !== null) {
      targetFile = e.target.files[0];
      setFiles(targetFile);
    }
  };

  return (
    <input
      className="absolute opacity-0 w-full h-full cursor-pointer"
      type="file"
      accept="image/*"
      onChange={onChangeImage}
      onClick={(e) =>
        e.target instanceof HTMLInputElement ? (e.target.value = "") : null
      }
    />
  );
};

export default FileInput;
