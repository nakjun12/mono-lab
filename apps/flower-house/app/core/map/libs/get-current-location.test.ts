import { beforeAll, describe, expect, it, vi } from "vitest";
import getCurrentLocation from "./get-current-location";

describe("getCurrentLocation 함수", () => {
  it("브라우저가 Geolocation을 지원하지 않는 경우 예외 처리", async () => {
    // Geolocation 지원하지 않는 경우 설정
    vi.stubGlobal("navigator", { geolocation: undefined });

    // 함수 실행 및 예외 처리 검증
    await expect(getCurrentLocation()).rejects.toThrow(
      "Geolocation is not supported by your browser."
    );
  });

  describe("Geolocation이 지원되는 경우", () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn()
    };

    beforeAll(() => {
      vi.stubGlobal("navigator", {
        geolocation: mockGeolocation
      });
    });

    it("위치 정보를 성공적으로 가져온 경우", async () => {
      const mockGeolocationSuccess = {
        coords: { latitude: 37.4224764, longitude: -122.0842499 }
      };
      mockGeolocation.getCurrentPosition.mockImplementation(
        (successCallback) => {
          successCallback(mockGeolocationSuccess);
        }
      );

      // 함수 실행 및 결과 검증
      await expect(getCurrentLocation()).resolves.toEqual([
        37.4224764, -122.0842499
      ]);
    });

    it("사용자가 위치 정보 접근을 거부한 경우", async () => {
      const mockGeolocationError = { message: "User denied Geolocation" };
      mockGeolocation.getCurrentPosition.mockImplementation(
        (_, errorCallback) => {
          errorCallback(mockGeolocationError);
        }
      );

      // 함수 실행 및 예외 처리 검증
      await expect(getCurrentLocation()).rejects.toThrow(
        "User denied Geolocation"
      );
    });
  });
});
