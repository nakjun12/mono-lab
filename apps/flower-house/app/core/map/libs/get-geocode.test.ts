import { beforeEach, describe, expect, it, vi } from "vitest";
import { getGeocodeAddress } from "./get-geocode";

const mockGeocode = vi.fn();

beforeEach(() => {
  // window.naver.maps.Service.geocode 모의 함수 및 Status 객체 설정

  const mockStatus = {
    OK: 200,
    ERROR: 500
  };

  // vi.stubGlobal 또는 vi.stub을 사용하여 'naver' 객체를 전역에 모킹
  vi.stubGlobal("naver", {
    maps: {
      Service: {
        geocode: mockGeocode,
        Status: mockStatus
      }
    }
  });
});

describe("getGeocodeAddress", () => {
  it("성공적인 geocode 요청 처리", async () => {
    const mockAddress = "서울특별시 강남구";
    const mockResponse = {
      v2: {
        addresses: [
          {
            roadAddress: "서울특별시 강남구 테헤란로",
            jibunAddress: "서울특별시 강남구 역삼동",
            englishAddress: "Teheran-ro, Gangnam-gu, Seoul",
            addressElements: [],
            x: "127.027637",
            y: "37.497942",
            distance: "0"
          }
        ]
      }
    };

    mockGeocode.mockImplementation((_, callback) => {
      callback(200, mockResponse); // "OK" 대신 200을 사용
    });

    const result = await getGeocodeAddress(mockAddress);
    expect(result).toEqual(mockResponse.v2.addresses[0]);
  });

  it("geocode 요청 실패 처리", async () => {
    const mockAddress = "잘못된 주소";
    mockGeocode.mockImplementation((_, callback) => {
      callback("ERROR", null);
    });

    await expect(getGeocodeAddress(mockAddress)).rejects.toThrow(
      "Geocoding failed"
    );
  });
});
