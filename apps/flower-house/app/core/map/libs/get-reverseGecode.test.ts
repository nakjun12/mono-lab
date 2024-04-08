import type { Coordinates } from "@/app/core/shared/types/map-types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getReverseGeocode } from "./get-reverseGeocode";

const mockReverseGeocode = vi.fn();
const mockLatLng = vi.fn().mockImplementation((lat, lng) => ({ lat, lng }));

beforeEach(() => {
  // window.naver.maps.Service.reverseGeocode 모의 함수 및 Status 객체 설정
  const mockStatus = {
    OK: 200,
    ERROR: 500 // 실제 API와 일치하지 않을 수 있으니 확인 필요
  };

  // vi.stubGlobal 또는 vi.stub을 사용하여 'naver' 객체를 전역에 모킹
  vi.stubGlobal("naver", {
    maps: {
      Service: {
        reverseGeocode: mockReverseGeocode,
        Status: mockStatus
      },
      LatLng: mockLatLng // LatLng 모의 함수 추가
    }
  });
});

describe("getReverseGeocode", () => {
  it("성공적인 reverse geocode 요청 처리", async () => {
    const mockCoords: Coordinates = [37.497942, 127.027637]; // 위도, 경도 순서
    const mockResponse = {
      v2: {
        results: [
          {
            name: "테스트 장소",
            code: {
              id: "123",
              type: "type",
              mappingId: "mapping123"
            },
            region: {
              area0: {
                name: "대한민국",
                coords: { center: { crs: "EPSG:4326", x: "127", y: "37" } }
              },
              area1: {
                name: "서울특별시",
                coords: {
                  center: { crs: "EPSG:4326", x: "127.027637", y: "37.497942" }
                }
              },
              area2: {
                name: "강남구",
                coords: {
                  center: { crs: "EPSG:4326", x: "127.048958", y: "37.512273" }
                }
              },
              area3: {
                name: "역삼동",
                coords: {
                  center: { crs: "EPSG:4326", x: "127.033419", y: "37.499901" }
                }
              },
              area4: {
                name: "",
                coords: { center: { crs: "EPSG:4326", x: "", y: "" } }
              }
            }
          }
        ]
      }
    };

    mockReverseGeocode.mockImplementation((_, callback) => {
      callback(window.naver.maps.Service.Status.OK, mockResponse);
    });

    const result = await getReverseGeocode(mockCoords);
    expect(result).toEqual([
      {
        roadAddress: "서울특별시 강남구 역삼동",
        x: "127.027637",
        y: "37.497942"
      }
    ]);
  });

  it("reverse geocode 요청 실패 처리", async () => {
    const mockCoords: Coordinates = [0, 0]; // 잘못된 좌표
    mockReverseGeocode.mockImplementation((_, callback) => {
      callback("ERROR", null);
    });

    await expect(getReverseGeocode(mockCoords)).rejects.toThrow(
      "Reverse Geocoding failed"
    );
  });
});
