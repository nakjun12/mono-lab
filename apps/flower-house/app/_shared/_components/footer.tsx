"use client";
import Image from "next/image";
import { IconNames } from "../_types/footer";
import { useRouter, usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const imageNames: IconNames = ["home", "clone", "add-square", "notification"];
  const tabPaths = ["/", "/feeds", "/newpost", "/notification"];

  const handleTapChange = (idx: number) => {
    if (pathname === tabPaths[idx]) return;
    router.push(tabPaths[idx]);
  };

  return (
    <footer className="flex fixed bottom-0 left-0 w-full h-16 bg-white">
      {imageNames.map((imageName, idx) => (
        <button
          key={imageName}
          className="relative flex justify-center items-center w-1/4 border-none bg-transparent p-0"
          onClick={() => handleTapChange(idx)}>
          {idx === 2 && (
            <input
              className="absolute opacity-0 w-full h-full"
              type="file"
              accept="video/*, image/*"
            />
          )}
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
