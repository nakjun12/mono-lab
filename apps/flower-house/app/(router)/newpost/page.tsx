"use client";
import Image from "next/image";
import { useState } from "react";
import NewpostHeader from "./_components/newpost-header";

export default function NewPostPage() {
  const [contents, setContents] = useState({
    image: "",
    title: "",
    description: ""
  });
  const imgData = localStorage.getItem("prevImgData") || "";
  return (
    <main className="flex flex-col items-center justify-center h-screen md:h-screen">
      <NewpostHeader />
      <div>
        <Image src={imgData} alt="post-preview-img" width={200} height={200} />
      </div>
      <div>
        description
        <input type="text" defaultValue=";;" />
      </div>

      <div>위치 추가</div>
      <div>개화도</div>
      <div>날짜/시간</div>
      <div>비밀번호 입력</div>
      <button type="button">작성 완료</button>
    </main>
  );
}
