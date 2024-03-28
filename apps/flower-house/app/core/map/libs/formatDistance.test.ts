import { describe, expect, it } from "vitest";
import { formatDistance } from "./formatDistance";

describe("formatDistance 함수 테스트", () => {
  it("1000미터 미만일 때 미터 단위로 반환해야 함", () => {
    expect(formatDistance(999)).toBe("999m");
    expect(formatDistance(1)).toBe("1m");
    expect(formatDistance(500)).toBe("500m");
  });

  it("1000미터 이상일 때 킬로미터 단위로 반환해야 함", () => {
    expect(formatDistance(1000)).toBe("1.0km");
    expect(formatDistance(1500)).toBe("1.5km");
    expect(formatDistance(12345)).toBe("12.3km");
  });

  it('음수 입력 시 "알수없음" 반환해야 함', () => {
    expect(formatDistance(-1)).toBe("알수없음");
  });
});
