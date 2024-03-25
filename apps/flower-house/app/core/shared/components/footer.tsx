"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import type { IconNames } from "../types/footer-type";

import FileInput from "./form/file-input";

export const FOOTER_HEIGHT_TAILWINDCSS = "16";
export const FOOTER_HEIGHT_REM = `${
  parseInt(FOOTER_HEIGHT_TAILWINDCSS) / 4
}rem`;

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const imageNames: IconNames = ["home", "clone", "add-square", "notification"];
  const tabPaths = ["/", "/feeds", "/newpost", "/notification"];

  const handleTapChange = (idx: number) => {
    if (pathname === tabPaths[idx]) return;
    if (idx === 2) return;
    router.push(tabPaths[idx]);
  };

  return (
    <footer
      className={`flex fixed bottom-0 left-0 w-full h-${FOOTER_HEIGHT_TAILWINDCSS} bg-white`}
    >
      {imageNames.map((imageName, idx) => (
        <button
          key={imageName}
          className="relative flex justify-center items-center w-1/4 border-none bg-transparent p-0"
          onClick={() => handleTapChange(idx)}
        >
          {idx === 2 && <FileInput router={router} />}
          <Image
            src={`/icons/footer-icons/${imageName}-${
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
