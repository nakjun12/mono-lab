"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent, useEffect, useState } from "react";

interface FileInput {
  router: AppRouterInstance;
}

const FileInput: React.FC<FileInput> = ({ router }) => {
  const [file, setFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>("");

  useEffect(() => {
    if (!file) {
      localStorage.setItem("prevImgData", "");
      setPreview(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      localStorage.setItem("prevImgData", fileReader.result as string);
      setPreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (!preview) return;
    router.push("/newpost");
  }, [preview]);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    let targetFile: File;
    if (e.target.files !== null) {
      targetFile = e.target.files[0];
      setFile(targetFile);
    }
  };

  return (
    <input
      className="absolute opacity-0 w-full h-full"
      type="file"
      accept="video/*, image/*"
      onChange={onChangeImage}
      onClick={(e) =>
        e.target instanceof HTMLInputElement ? (e.target.value = "") : null
      }
    />
  );
};

export default FileInput;
