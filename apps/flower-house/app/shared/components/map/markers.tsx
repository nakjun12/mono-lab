import useSWR from "swr";
import useCurrentStore, {
  CURRENT_STORE_KEY
} from "../../hooks/use-current-store";
import { MAP_KEY } from "../../hooks/use-naver-map";
import { STORE_KEY } from "../../hooks/use-store";
import { generateStoreMarkerIcon } from "../../lib/generate-store-marker-icon";
import type { NaverMap, Store } from "../../types/map-types";
import Marker from "./marker";

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  if (!map || !stores) return null;
  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            key={store.nid}
            onClick={() => {
              console.log("setCurrentStore", store);
              setCurrentStore(store);
            }}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;
