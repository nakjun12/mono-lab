import useCopyAndReplaceMap from "@/app/core/map/hooks/use-copy-and-replace-map";
import Image from "next/image";
import React from "react";

const ShareButton: React.FC = () => {
  const { copyAndReplaceUrl } = useCopyAndReplaceMap();

  return (
    <button onClick={copyAndReplaceUrl} title="Share Current Location">
      <Image
        src="/icons/map-icons/share.svg"
        alt="Share"
        width={24}
        height={24}
      />
    </button>
  );
};

export default ShareButton;
