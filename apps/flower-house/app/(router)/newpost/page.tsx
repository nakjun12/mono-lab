"use client";
import Image from "next/image";
import { useState } from "react";
import NewpostHeader from "./_components/newpostHeader";

export default function NewPostPage() {
  const [contents, setContents] = useState({
    image: "",
    title: "",
    description: ""
  });
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      <NewpostHeader />
      <input type="text" value={contents.description} />
    </main>
  );
}
