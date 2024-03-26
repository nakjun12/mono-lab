import { beforeAll, describe, expect, it, vi } from "vitest";
import getCurrentLocation from "./get-current-location";

describe("getCurrentLocation 함수 테스트", () => {
  describe("navigator.geolocation이 undefined인 경우", () => {
    beforeAll(() => {
      vi.stubGlobal("navigator", {
        geolocation: undefined
      });
    });

    it("브라우저가 Geolocation을 지원하지 않을 때 예외 처리", async () => {
      await expect(getCurrentLocation()).rejects.toThrow(
        "Geolocation is not supported by your browser."
      );
    });
  });

  describe("navigator.geolocation을 모의(mock) 설정", () => {
    const mockGeolocationSuccess = {
      coords: {
        latitude: 37.4224764,
        longitude: -122.0842499
      }
    };

    const mockGeolocationError = {
      message: "User denied Geolocation"
    };

    beforeAll(() => {
      vi.stubGlobal("navigator", {
        geolocation: {
          getCurrentPosition: vi
            .fn()
            .mockImplementationOnce((successCallback) => {
              successCallback(mockGeolocationSuccess);
            })
            .mockImplementationOnce((_, errorCallback) => {
              errorCallback(mockGeolocationError);
            })
        }
      });
    });

    it("위치 정보를 성공적으로 가져온 경우", async () => {
      await expect(getCurrentLocation()).resolves.toEqual([
        37.4224764, -122.0842499
      ]);
    });

    it("위치 정보를 가져오는 데 실패한 경우", async () => {
      await expect(getCurrentLocation()).rejects.toThrow(
        "User denied Geolocation"
      );
    });
  });
});
