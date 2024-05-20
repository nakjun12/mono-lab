import Image from "next/image";

export default function PreviewImageComponent() {
  return (
    <div className="flex justify-center">
      <Image
        src={localStorage.getItem("prevImgData") || ""}
        alt="post-preview-img"
        width={200}
        height={200}
      />
    </div>
  );
}
