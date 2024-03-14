// src/mocks/index.ts
async function initMSW() {
  if (typeof window === "undefined") {
    const { server } = await import("./server");

    console.log("Server is running in Node.js environment");
    // 노드 환경에서 사용하는 Mock Server 옵션 추가
    server.listen();
  } else {
    console.log("Server is running in the browser environment");
    const { worker } = await import("./browser");

    // Service Worker Mocking 옵션 추가
    worker.start();
  }
}

export { initMSW };
