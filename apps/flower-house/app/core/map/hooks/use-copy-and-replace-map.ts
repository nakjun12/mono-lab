import useMap from "@/app/core/map/hooks/use-map";
import type { Coordinates } from "@/app/core/shared/types/map-types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const useCopyAndReplaceMap = () => {
  const router = useRouter();
  const { getMapOptions } = useMap();
  const pathname = usePathname();

  const copyAndReplaceUrl = useCallback(
    (coordinates?: Coordinates) => {
      // 선택적으로 제공된 좌표 또는 현재 맵 옵션에서 가져온 좌표 사용
      const mapOptions = getMapOptions();
      const center = coordinates || mapOptions.center;
      const zoom = mapOptions.zoom;

      const query = `${pathname}?zoom=${zoom}&lat=${center[0]}&lng=${center[1]}`;

      router.replace(query);
      navigator.clipboard.writeText(window.location.origin + query);
    },
    [router, getMapOptions, pathname]
  );

  return { copyAndReplaceUrl };
};

export default useCopyAndReplaceMap;
