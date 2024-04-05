import * as geocodeLib from "@/app/core/map/libs/get-geocode";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSearchFromAddress } from "./use-search-from-address";

describe("useSearchFromAddress", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("주소 업데이트 시 geocode 결과를 반환해야 함", async () => {
    const mockGeocodeResult = {
      roadAddress: "서울특별시 중구 세종대로 110",
      jibunAddress: "서울특별시 중구 태평로1가 31",
      englishAddress: "110, Sejong-daero, Jung-gu, Seoul, Republic of Korea",
      addressElements: [],
      x: "37.5665",
      y: "126.978",
      distance: "0"
    };

    vi.mocked(geocodeLib.getGeocodeAddress).mockResolvedValue(
      mockGeocodeResult
    );

    const { result } = renderHook(() => useSearchFromAddress());

    act(() => {
      result.current.updateAddress("서울시청");
    });

    await waitFor(() =>
      expect(result.current.geocodeResult).toEqual(mockGeocodeResult)
    );
  });

  it("빈 주소를 업데이트하려고 하면 오류를 반환해야 함", async () => {
    const { result } = renderHook(() => useSearchFromAddress());

    expect(() => {
      result.current.updateAddress("");
    }).toThrow("Address cannot be empty");
  });

  it("주소 검색 실패 시 오류를 반환해야 함", async () => {
    const mockError = new Error("Geocode service failed");
    vi.mocked(geocodeLib.getGeocodeAddress).mockRejectedValue(mockError);

    const { result } = renderHook(() => useSearchFromAddress());

    act(() => {
      result.current.updateAddress("잘못된 주소");
    });

    await waitFor(() => {
      expect(result.current.error).toEqual(mockError);
      expect(result.current.geocodeResult).toBeNull();
    });
  });
});
