import useCopyAndReplaceMap from "@/app/core/map/hooks/use-copy-and-replace-map";
import type { Coordinates } from "@/app/core/shared/types/map-types";
import Image from "next/image";
import React from "react";
interface ShareButtonProps {
  width?: number;
  height?: number;
  coordinates: Coordinates;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  width = 24,
  height = 24,
  coordinates
}) => {
  const { copyAndReplaceUrl } = useCopyAndReplaceMap();

  return (
    <button
      onClick={() => copyAndReplaceUrl(coordinates)}
      title="Share Current Location"
    >
      <Image
        src="/icons/map-icons/share.svg"
        alt="Share"
        width={width}
        height={height}
      />
    </button>
  );
};

export default ShareButton;
