import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import useMarkers from "./use-markers";

describe("useMarkers 훅 테스트", () => {
  it("초기에는 마커 데이터가 존재하지 않는다.", async () => {
    const { result } = renderHook(() => useMarkers());

    expect(result.current.markers).toBe(undefined);
  });

  it("updateMarkers 함수를 호출하여 마커 데이터를 설정할 수 있다", async () => {
    const newMarkers = [{ id: "3", name: "Marker 3" }];
    const { result, waitFor } = renderHook(() => useMarkers());

    await result.current.updateMarkers(newMarkers);

    await waitFor(() => expect(result.current.markers).toEqual(newMarkers));
  });

  it("updateMarkers 함수를 호출하여 설정한 마커 데이터를 수정할 수 있다", async () => {
    const newMarkers = [{ id: "3", name: "Marker 3" }];
    const { result, waitFor } = renderHook(() => useMarkers());

    await result.current.updateMarkers(newMarkers);

    await waitFor(() => expect(result.current.markers).toEqual(newMarkers));

    const updateMarkers = [{ id: "4", name: "Marker 4" }];
    await result.current.updateMarkers(updateMarkers);
    await waitFor(() => expect(result.current.markers).toEqual(updateMarkers));
  });
});
