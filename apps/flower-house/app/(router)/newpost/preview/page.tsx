"use client";
import NewpostPreviewHeader from "@/app/core/post/components/newpost-preview-header";
import PreviewImageComponent from "@/app/core/post/components/preview-image";

export default function NewPostPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen md:h-screen">
      <NewpostPreviewHeader />
      <PreviewImageComponent />
    </main>
  );
}
