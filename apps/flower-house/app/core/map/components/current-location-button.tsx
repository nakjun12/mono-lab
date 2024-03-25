import Image from "next/image";
import React from "react";

interface CurrentLocationProps {
  onCurrentLocation: () => void;
}
const CurrentLocation: React.FC<CurrentLocationProps> = ({
  onCurrentLocation
}) => {
  return (
    <button onClick={onCurrentLocation} title="CurrentLocation Map Options">
      <Image
        src="/icons/map-icons/current.svg"
        alt="CurrentLocation"
        width={40}
        height={40}
      />
    </button>
  );
};

export default CurrentLocation;
