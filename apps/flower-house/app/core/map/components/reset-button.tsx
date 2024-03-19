import useCurrentLocation from "@/app/core/map/hooks/use-current-location";
import Image from "next/image";
import React from "react";

const ResetButton: React.FC = () => {
  const { setCurrentLocation } = useCurrentLocation();

  const resetMap = () => {
    setCurrentLocation();
  };

  return (
    <button onClick={resetMap} title="Reset Map Options">
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
