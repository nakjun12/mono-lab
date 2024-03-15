interface Inquiry {
  id: number;
  timestamp: string;
  isWaitingForResponse: boolean;
  // 기타 문의 항목에 필요한 속성을 추가할 수 있습니다.
  [key: string]: any;
}

// 모든 문의 항목 조회
async function getAllInquiries(): Promise<Inquiry[]> {
  const response = await fetch("https://api.example.com/inquire", {
    // URL에 타임스탬프 추가
    method: "GET", // GET 요청 명시
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate", // 캐시 관련 헤더 설정
      Pragma: "no-cache" // HTTP/1.0 캐시 호환성을 위한 Pragma 헤더 추가
    },
    cache: "no-store" // fetch 옵션에도 캐싱 방지 설정
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const inquiries: Inquiry[] = await response.json();
  return inquiries;
}

// 새로운 문의 추가
async function createInquiry(
  newInquiryData: Omit<Inquiry, "id" | "timestamp" | "isWaitingForResponse">
): Promise<Inquiry> {
  const response = await fetch("https://api.example.com/inquire", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newInquiryData),
    cache: "no-store" // 캐싱 방지
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const inquiry: Inquiry = await response.json();
  return inquiry;
}

// 특정 문의 항목 조회
async function getInquiryById(id: number): Promise<Inquiry> {
  const response = await fetch(`https://api.example.com/inquire/${id}`, {
    cache: "no-store" // 캐싱 방지
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const inquiry: Inquiry = await response.json();
  return inquiry;
}

// 특정 문의 항목 삭제
async function deleteInquiryById(id: number): Promise<void> {
  const response = await fetch(`https://api.example.com/inquire/${id}`, {
    method: "DELETE",
    cache: "no-store" // 캐싱 방지
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  // 삭제 요청이 성공적으로 처리됨
}

export { createInquiry, deleteInquiryById, getAllInquiries, getInquiryById };
