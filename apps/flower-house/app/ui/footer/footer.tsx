"use client";
import Image from "next/image";
import { useState } from "react";

const Footer: React.FC = () => {
  const imageNames = ["home", "clone", "add-square", "notification"];
  const [opened, setOpened] = useState([1, 0, 0, 0]);

  const handleTapChange = (i: number) => {
    if (opened[i]) return;
    const newOpened = [0, 0, 0, 0];
    newOpened[i] = 1;
    setOpened(newOpened);
  };

  return (
    <footer className="flex fixed bottom-0 w-full h-16">
      {imageNames.map((image, i) => (
        <button
          key={i}
          className="flex justify-center items-center w-1/4 border-none bg-transparent p-0"
          onClick={() => handleTapChange(i)}>
          <Image
            src={`/footerIcons/${image}-${opened[i] ? "on" : "off"}.svg`}
            alt="home-icon"
            width={30}
            height={30}
          />
        </button>
      ))}
    </footer>
  );
};

export default Footer;
