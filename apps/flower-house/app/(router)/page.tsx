import Footer from "@/app/shared/components/footer";
import Image from "next/image";

function Home() {
  return (
    <div className="flex overflow-hidden relative flex-col px-3.5 w-full min-h-[932px]">
      <Image
        loading="lazy"
        src={"/flower-bg.jpg"}
        alt="background image"
        className="object-cover absolute inset-0 size-full"
        width={1920}
        height={1080}
      />

      <Footer />
    </div>
  );
}

export default Home;
