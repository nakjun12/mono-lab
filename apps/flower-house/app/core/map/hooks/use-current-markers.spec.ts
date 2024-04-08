import type { Marker } from "@/app/core/shared/types/map-types";
import { act, renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import useCurrentMarker from "./use-current-marker";

const newMarker: Marker = {
  id: "marker-1",
  title: "긴고랑로의 봄 꽃",
  address: "긴고랑로",
  type: "forsythia",
  thumbnail: "/example.png",
  coordinates: [37.5630685, 127.086228],
  category: "Wildflowers",
  likes: 100,
  comments: 15
};

describe("useCurrentMarker 훅 테스트", () => {
  it("초기에는 현재 마커 데이터가 존재하지 않는다.", async () => {
    const { result } = renderHook(() => useCurrentMarker());

    expect(result.current.currentMarker).toBeUndefined();
  });

  it("setCurrentMarker 함수를 호출하여 현재 마커 데이터를 설정할 수 있다", async () => {
    const { result } = renderHook(() => useCurrentMarker());

    act(() => {
      result.current.setCurrentMarker(newMarker);
    });

    expect(result.current.currentMarker).toEqual(newMarker);
  });

  it("clearCurrentMarker 함수를 호출하여 현재 마커 데이터를 초기화할 수 있다", async () => {
    const { result } = renderHook(() => useCurrentMarker());

    act(() => {
      result.current.setCurrentMarker(newMarker); // 먼저 마커 설정
    });
    expect(result.current.currentMarker).toEqual(newMarker);

    act(() => {
      result.current.clearCurrentMarker(); // 마커 초기화
    });

    expect(result.current.currentMarker).toBeNull();
  });
});
