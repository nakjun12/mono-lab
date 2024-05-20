"use client";
import ContentTextareaComponent from "@/app/core/post/components/content-textarea";
import DatetimeSectionComponent from "@/app/core/post/components/datetime-section";
import FloweringSectionComponent from "@/app/core/post/components/flowering-section";
import NewpostHeader from "@/app/core/post/components/newpost-header";
import PasswordSectionComponent from "@/app/core/post/components/password-section";
import PreviewImageComponent from "@/app/core/post/components/preview-image";
import SubmitButtonComponent from "@/app/core/post/components/submit-button";
import useNewpost from "@/app/core/post/hooks/useNewpost";

export default function NewPostPage() {
  const {
    postDatas,
    setPostDatas,
    updatePostData,
    setSelectedFloweringId,
    selectedFloweringId,
    prevPW,
    updatePW,
    checkPW,
    handleButtonClick
  } = useNewpost();

  return (
    <main className="flex flex-col items-center justify-center h-screen md:h-screen">
      <NewpostHeader />
      <section className="mt-16 px-8 w-full h-full flex flex-col gap-y-2">
        <PreviewImageComponent />
        <ContentTextareaComponent
          postDatas={postDatas}
          updatePostData={updatePostData}
        />

        {/* TODO: ?? */}
        <div>
          <span>위치 추가</span>
          <div>검색 결과</div>
        </div>
        <hr />

        <FloweringSectionComponent
          setPostDatas={setPostDatas}
          setSelectedFloweringId={setSelectedFloweringId}
          selectedFloweringId={selectedFloweringId}
        />
        <hr />

        <DatetimeSectionComponent
          postDatas={postDatas}
          updatePostData={updatePostData}
        />
        <hr />

        <PasswordSectionComponent
          prevPW={prevPW}
          updatePW={updatePW}
          checkPW={checkPW}
        />
        <SubmitButtonComponent handleButtonClick={handleButtonClick} />
      </section>
    </main>
  );
}
