"use client";
import Footer from "@/app/core/shared/components/footer";
import { getFeed } from "@/app/core/shared/utils/api";
import { ResponseGetFeedData } from "@/app/core/shared/utils/models/response";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PageProps {
  params: { id: number };
}

export default function FeedsPage({ params: { id } }: PageProps) {
  const [feedData, setFeedData] = useState<ResponseGetFeedData>();
  useEffect(() => {
    getFeed(id).then((res) => {
      if (res.status !== 200) {
        throw new Error("response 못받음");
      }
      setFeedData(res.data);
    });
  }, []);

  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      <div>Feeds</div>
      {feedData?.images[0].originUrl && (
        <Image
          src={`${feedData.images[0].originUrl}` || ""}
          alt="post-preview-img"
          width={200}
          height={200}
          priority
        />
      )}
      <Footer />
    </main>
  );
}
