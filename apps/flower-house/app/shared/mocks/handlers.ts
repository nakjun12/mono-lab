import { DefaultBodyType, HttpResponse, http } from "msw";

interface Inquiry {
  id: number;
  timestamp: string;
  isWaitingForResponse: boolean;
  [key: string]: any; // Inquiry 객체가 다른 프로퍼티를 포함할 수 있음을 나타냅니다.
}

const allInquire: Map<number, Inquiry> = new Map();
let nextId = 1; // Unique ID for each post

// 기본 문의 항목 데이터
const initialInquiries: Omit<
  Inquiry,
  "id" | "timestamp" | "isWaitingForResponse"
>[] = [
  {
    // 첫 번째 문의 항목에 대한 데이터
    question: "What is the return policy?",
    customerName: "Alice"
  },
  {
    // 두 번째 문의 항목에 대한 데이터
    question: "Do you provide international shipping?",
    customerName: "Bob"
  }
];

// allInquire 맵에 초기 문의 항목을 추가
initialInquiries.forEach((inquiryData) => {
  const inquiry = createNewInquiry(inquiryData);
  allInquire.set(inquiry.id, inquiry);
});

function createNewInquiry(
  newInquiry: Omit<Inquiry, "id" | "timestamp" | "isWaitingForResponse">
): Inquiry {
  const id = nextId++;
  const timestamp = new Date().toISOString();
  const isWaitingForResponse = false;
  return { ...newInquiry, id, timestamp, isWaitingForResponse };
}

// 공통 응답 처리 함수
function handleResponse(response: any, status = 200): HttpResponse {
  return response
    ? HttpResponse.json(response, { status })
    : new HttpResponse(null, { status });
}

// 타입 가드를 정의합니다: newInquiryData가 올바른 타입인지 확인합니다.
function isValidInquiry(
  data: DefaultBodyType
): data is Omit<Inquiry, "id" | "timestamp" | "isWaitingForResponse"> {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "object" &&
    !("id" in data) &&
    !("timestamp" in data) &&
    !("isWaitingForResponse" in data)
  );
}

export const handlers = [
  http.get("https://api.example.com/inquire", () =>
    handleResponse(Array.from(allInquire.values()))
  ),
  http.post("https://api.example.com/inquire", async ({ request }) => {
    const newInquiry = await request.json();

    if (!isValidInquiry(newInquiry)) {
      return handleResponse(null, 400);
    }
    const inquiry: Inquiry = createNewInquiry(newInquiry);
    allInquire.set(inquiry.id, inquiry);
    return handleResponse(inquiry, 201);
  }),
  // 특정 문의 조회
  http.get("https://api.example.com/inquire/:id", ({ params }) => {
    const inquiry: Inquiry | undefined = allInquire.get(Number(params.id));
    return handleResponse(inquiry, inquiry ? 200 : 404);
  }),
  http.delete("https://api.example.com/inquire/:id", ({ params }) => {
    const exists: boolean = allInquire.delete(Number(params.id));
    return handleResponse(null, exists ? 204 : 404);
  })
];
