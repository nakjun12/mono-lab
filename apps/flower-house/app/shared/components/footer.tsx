"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import type { IconNames } from "../types/footer-type";

import { useState } from "react";
import FileInput from "./form/file-input";

export type Movie = {
  id: string;
  title: string;
};

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const imageNames: IconNames = ["home", "clone", "add-square", "notification"];
  const tabPaths = ["/", "/feeds", "/newpost", "/notification"];

  const handleTapChange = (idx: number) => {
    if (pathname === tabPaths[idx]) return;
    if (idx === 2) return;
    router.push(tabPaths[idx]);
  };

  const fetchMovies = () => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query ListMovies {
            movies {
              id
              title
            }
          }
        `
      })
    })
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch(() => setMovies([]));
  };

  return (
    <footer className="flex fixed bottom-0 left-0 w-full h-16 bg-white">
      {imageNames.map((imageName, idx) => (
        <button
          key={imageName}
          className="relative flex justify-center items-center w-1/4 border-none bg-transparent p-0"
          onClick={fetchMovies}
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
