"use client";
import Footer from "@/app/shared/components/footer";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import MapSection from "../shared/components/map/map-section";
import Markers from "../shared/components/map/markers";
import useMap from "../shared/hooks/use-naver-map";
import useStores from "../shared/hooks/use-store";
import { STORES } from "../shared/lib/dummy";

function Home() {
  const { initializeStores } = useStores();
  const router = useRouter();
  useEffect(() => {
    initializeStores(STORES); //전역 상태 업데이트
  }, [initializeStores]);
  const { resetMapOptions, getMapOptions } = useMap();
  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    navigator.clipboard.writeText(location.origin + query);
  }, [router, getMapOptions]);

  return (
    <div className="flex overflow-hidden relative flex-col md:px-3.5 w-full min-h-[932px]">
      <MapSection />
      <Markers />
      <button onClick={resetMapOptions}>Reset</button>
      <button onClick={replaceAndCopyUrl}>Copy</button>
      <Footer />
    </div>
  );
}

export default Home;
