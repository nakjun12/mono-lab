import useMap from "@/app/core/hooks/use-map";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const useCopyAndReplaceMap = () => {
  const router = useRouter();
  const { getMapOptions } = useMap();
  const pathname = usePathname();

  const copyAndReplaceUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `${pathname}?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    navigator.clipboard.writeText(window.location.origin + query);
  }, [router, getMapOptions]);

  return copyAndReplaceUrl;
};

export default useCopyAndReplaceMap;
