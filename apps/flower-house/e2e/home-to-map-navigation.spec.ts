import { test } from "@playwright/test";

// Playwright 테스트 환경 설정
test.use({
  geolocation: {
    latitude: 37.4996992,
    longitude: 126.8875264
  },
  permissions: ["geolocation"],
  timezoneId: "Asia/Seoul"
});

// 주소 검색을 통한 페이지 이동 테스트
test.describe("주소 검색 및 페이지 이동 확인", () => {
  test("주소 검색을 통해 페이지가 올바르게 이동하는지 확인", async ({
    page
  }) => {
    await page.goto("http://localhost:3000/");
    const addressInput = page.getByPlaceholder("주소를 입력해주세요");
    await addressInput.click();
    await addressInput.fill("천안");
    await addressInput.press("Enter");
    await page.waitForTimeout(1500); // 필요한 경우 대기
    // 검증 로직 추가 (예: URL 변경 확인)
  });
});

// 드래그 앤 드롭을 통한 슬라이드 이동 테스트
test.describe("드래그 앤 드롭을 통한 슬라이드 이동 확인", () => {
  test("슬라이드를 드래그하여 올바르게 이동하는지 확인", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForTimeout(1500); // 필요한 경우 대기

    const source = page.locator(".swiper-slide.swiper-slide-next");
    await source.hover();
    await page.mouse.down();
    await page.mouse.move(-800, 0); // 드래그 거리 조정 가능
    await page.mouse.up();

    await page.waitForTimeout(800); // 애니메이션 완료 대기

    // 검증 로직 추가 (예: 슬라이드의 클래스 변경 확인)
  });
});
