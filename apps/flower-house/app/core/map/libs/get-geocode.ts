type AddressElementType =
  | "SIDO"
  | "SIGUGUN"
  | "RI"
  | "ROAD_NAME"
  | "BUILDING_NUMBER"
  | "BUILDING_NAME"
  | "LAND_NUMBER"
  | "POSTAL_CODE";

interface GeocodeAddressElement {
  types: AddressElementType;
  longName: string;
  shortName: string;
  code: string;
}

export interface GeocodeAddress {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  addressElements: GeocodeAddressElement[];
  x: string;
  y: string;
  distance: string;
}

//TODO : return 값 정리할 것
export function geocodeAddress(address: string): Promise<GeocodeAddress> {
  return new Promise((resolve, reject) => {
    window.naver.maps.Service.geocode(
      {
        query: address // 주소 전달
      },
      function (status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          reject(new Error("Geocoding failed"));
        } else {
          const result = response.v2.addresses[0];
          resolve(result);
        }
      }
    );
  });
}
