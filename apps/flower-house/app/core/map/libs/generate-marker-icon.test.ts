import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MARKER_URLS, generateMarkerIcon } from "./generate-marker-icon";

beforeEach(() => {
  vi.stubGlobal("naver", {
    maps: {
      Size: vi.fn().mockImplementation((width, height) => ({ width, height })),
      Point: vi.fn().mockImplementation((x, y) => ({ x, y }))
    }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("generateMarkerIcon 함수 테스트", () => {
  describe("마커 사이즈 테스트", () => {
    it("선택되지 않았을 때 기본 마커 사이즈를 반환해야 함", () => {
      const icon = generateMarkerIcon({
        type: "forsythia",
        isSelected: false
      });
      expect(icon.size.width).toBe(22);
      expect(icon.size.height).toBe(22);
      expect(icon.scaledSize).toEqual(icon.size); // 같다라는 것을 표현하기 위해 사용
    });

    it("선택되었을 때 선택된 마커 사이즈를 반환해야 함", () => {
      const icon = generateMarkerIcon({
        type: "cherryBlossom",
        isSelected: true
      });
      expect(icon.size.width).toBe(33);
      expect(icon.size.height).toBe(33);
      expect(icon.scaledSize).toEqual(icon.size);
    });
  });

  it("주어진 타입에 따라 올바른 URL을 반환해야 함", () => {
    const forsythiaIcon = generateMarkerIcon({
      type: "forsythia",
      isSelected: false
    });
    const cherryBlossomIcon = generateMarkerIcon({
      type: "cherryBlossom",
      isSelected: false
    });
    expect(forsythiaIcon.url).toBe(MARKER_URLS.forsythia);
    expect(cherryBlossomIcon.url).toBe(MARKER_URLS.cherryBlossom);
  });

  it("마커의 앵커 포인트가 올바르게 설정되어야 함", () => {
    const icon = generateMarkerIcon({
      type: "forsythia",
      isSelected: false
    });
    expect(icon.anchor.x).toBe(icon.size.width / 2);
    expect(icon.anchor.y).toBe(icon.size.height / 2);

    const selectedIcon = generateMarkerIcon({
      type: "forsythia",
      isSelected: true
    });
    expect(selectedIcon.anchor.x).toBe(selectedIcon.size.width / 2);
    expect(selectedIcon.anchor.y).toBe(selectedIcon.size.height / 2);
  });
});
