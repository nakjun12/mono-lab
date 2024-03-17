import type { Coordinates } from "@/app/core/shared/types/map-types";

//현재 위치를 가져오는 함수
function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve([latitude, longitude]); // Coordinates 타입에 맞춰서 수정
        },
        (error) => {
          reject(
            new Error(
              "Unable to retrieve your location due to " + error.message
            )
          );
        }
      );
    }
  });
}

export default getCurrentLocation;
