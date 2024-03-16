import Footer from "@/app/shared/components/footer";
import { getAllInquiries } from "@/app/shared/mocks/handlersFun";
export type User = {
  firstName: string;
  lastName: string;
};

async function getUser() {
  console.log("Fetching user");

  const response = await fetch("https://api.example.com/user", {
    method: "GET", // GET 요청을 명시적으로 지정
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate" // 캐시 방지 헤더 추가
    },
    cache: "no-store" // fetch 요청 캐싱 방지 옵션
  });

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const user = (await response.json()) as User;
  return user;
}

export default async function Home() {
  const inquiries = await getAllInquiries();
  console.log(inquiries);
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      {inquiries.length}
      <Footer />
    </main>
  );
}
