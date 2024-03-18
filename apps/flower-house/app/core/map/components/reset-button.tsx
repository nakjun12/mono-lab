import useMap from "@/app/core/map/hooks/use-map";
import Image from "next/image";
import React from "react";

const ResetButton: React.FC = () => {
  const { resetMapOptions } = useMap();

  return (
    <button onClick={resetMapOptions} title="Reset Map Options">
      <Image
        src="/icons/map-icons/current.svg"
        alt="Reset"
        width={40}
        height={40}
      />
    </button>
  );
};

export default ResetButton;
