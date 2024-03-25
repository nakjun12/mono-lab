import type { GeocodeAddress } from "@/app/core/map/libs/get-geocode";

interface Result {
  name: string;
  code: {
    id: string;
    type: string;
    mappingId: string;
  };
  region: {
    area0: Area;
    area1: Area;
    area2: Area;
    area3: Area;
    area4: Area;
  };
}

interface Area {
  name: string;
  coords: {
    center: {
      crs: string;
      x: string; // 타입을 string으로 변경
      y: string; // 실제 API 응답에 맞춰서 string으로 변경될 수 있음
    };
  };
}

export interface SimplifiedGeocodeAddress
  extends Pick<GeocodeAddress, "roadAddress" | "x" | "y"> {}

export function getReverseGeocode(
  coords: [lat: number, lng: number]
): Promise<SimplifiedGeocodeAddress[]> {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new window.naver.maps.LatLng(coords[0], coords[1])
      },
      function (status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error("Reverse Geocoding failed"));
        } else {
          const results: Result[] = response.v2.results;

          // Result[]를 SimplifiedGeocodeAddress[]로 변환합니다.
          const simplifiedAddresses: SimplifiedGeocodeAddress[] = results.map(
            (result) => {
              return {
                roadAddress: `${result.region.area1.name} ${result.region.area2.name} ${result.region.area3.name}`,
                x: result.region.area1.coords.center.x.toString(), // 'x'가 number 타입인 경우 적절히 변환
                y: result.region.area1.coords.center.y.toString() // 'y'가 number 타입인 경우 적절히 변환
              };
            }
          );

          resolve(simplifiedAddresses);
        }
      }
    );
  });
}
