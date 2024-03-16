"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  createInquiry,
  deleteInquiryById,
  getAllInquiries
} from "../mocks/handlersFun";
import type { IconNames } from "../types/footer-type";

import { useEffect } from "react";
import FileInput from "./form/file-input";

export type Movie = {
  id: string;
  title: string;
};

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getAllInquiries().then((inquiries) => {
      console.log(inquiries);
    });
  }, []);
  const imageNames: IconNames = ["home", "clone", "add-square", "notification"];
  const tabPaths = ["/", "/feeds", "/newpost", "/notification"];

  const handleTapChange = (idx: number) => {
    if (pathname === tabPaths[idx]) return;
    if (idx === 2) return;
    router.push(tabPaths[idx]);
  };

  const handleAllInquiries = () => {
    getAllInquiries().then((inquiries) => {
      console.log(inquiries);
    });
  };
  const handleDeleteInquiry = (id: number) => {
    deleteInquiryById(id).then(() => {
      console.log("delete success");
    });
  };

  const handleCreateInquiry = () => {
    createInquiry({ test: "test1" }).then(() => {
      console.log("create success");
    });
  };

  return (
    <footer className="flex fixed bottom-0 left-0 w-full h-16 bg-white">
      <button onClick={() => handleAllInquiries()}>check</button>
      <button onClick={() => handleDeleteInquiry(1)}>delete</button>
      <button onClick={() => handleCreateInquiry()}>add</button>
      {imageNames.map((imageName, idx) => (
        <button
          key={imageName}
          className="relative flex justify-center items-center w-1/4 border-none bg-transparent p-0"
          onClick={() => handleTapChange(idx)}
        >
          {idx === 2 && <FileInput router={router} />}
          <Image
            src={`/footerIcons/${imageName}-${
              pathname === tabPaths[idx] ? "on" : "off"
            }.svg`}
            alt={`${imageName}-icon`}
            width={30}
            height={30}
          />
        </button>
      ))}
    </footer>
  );
};

export default Footer;
