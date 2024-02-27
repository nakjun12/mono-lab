"use client";

// SocialLoginButton.tsx
import Image from "next/image";

interface SocialLoginButtonProps {
  src: string;
  alt: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ src, alt }) => {
  return (
    <button className="cursor-pointer aspect-[1.69] max-w-[102px] w-1/4 border-none bg-transparent p-0">
      <Image src={src} alt={alt} width={102} height={60} />
    </button>
  );
};

export default SocialLoginButton;
