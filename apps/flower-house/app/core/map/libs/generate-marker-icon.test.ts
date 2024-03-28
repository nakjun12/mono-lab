import { describe, expect, it, vi } from "vitest";
import { MARKER_URLS, generateMarkerIcon } from "./generate-marker-icon";

// 전역 객체에 타입을 명시하며 naver 객체를 모킹

global.naver = {
  maps: {
    ...global.naver?.maps,
    Size: vi.fn().mockImplementation((width, height) => ({ width, height })),
    Point: vi.fn().mockImplementation((x, y) => ({ x, y }))
  }
};

describe("generateMarkerIcon 함수 테스트", () => {
  it("선택되지 않았을 때 기본 마커 사이즈를 반환해야 함", () => {
    const icon = generateMarkerIcon({
      type: "forsythia",
      isSelected: false
    });
    expect(icon.size.width).toBe(22);
    expect(icon.size.height).toBe(22);
  });

  it("선택되었을 때 선택된 마커 사이즈를 반환해야 함", () => {
    const icon = generateMarkerIcon({
      type: "cherryBlossom",
      isSelected: true
    });
    expect(icon.size.width).toBe(33);
    expect(icon.size.height).toBe(33);
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
});
