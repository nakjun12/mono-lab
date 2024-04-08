import type { Marker } from "@/app/core/shared/types/map-types";
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import useMarkers from "./use-markers";

const newMarkers: Marker[] = [
  {
    id: "marker-1",
    title: "긴고랑로의 봄 꽃",
    address: "긴고랑로",
    type: "forsythia",
    thumbnail: "/example.png",
    coordinates: [37.5630685, 127.086228], // 튜플 형태로 수정
    category: "Wildflowers",
    likes: 100,
    comments: 15
  }
];

describe("useMarkers 훅 테스트", () => {
  it("초기에는 마커 데이터가 존재하지 않는다.", async () => {
    const { result } = renderHook(() => useMarkers());

    expect(result.current.markers).toBe(undefined);
  });

  it("updateMarkers 함수를 호출하여 마커 데이터를 설정할 수 있다", async () => {
    const { result, waitFor } = renderHook(() => useMarkers());

    await result.current.updateMarkers(newMarkers);

    await waitFor(() => expect(result.current.markers).toEqual(newMarkers));
  });

  it("updateMarkers 함수를 호출하여 설정한 마커 데이터를 수정할 수 있다", async () => {
    const { result, waitFor } = renderHook(() => useMarkers());

    await result.current.updateMarkers(newMarkers);

    await waitFor(() => expect(result.current.markers).toEqual(newMarkers));

    const modifiedMarkers =
      result.current.markers?.map((marker) => ({
        ...marker,
        likes: marker.likes + 1 // 예시: 모든 마커의 'likes'를 1 증가
      })) || [];

    await result.current.updateMarkers(modifiedMarkers);
    await waitFor(() =>
      expect(result.current.markers).toEqual(modifiedMarkers)
    );
  });
});
