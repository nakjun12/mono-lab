import Footer from "@/app/shared/components/footer";

function Home() {
  fetchTrends().then((trends) => {
    // 여기에서 trends 데이터로 필요한 작업을 수행할 수 있습니다.
    // 예: UI에 트렌드 목록을 표시
    console.log(trends);
  });
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      <Footer />
    </main>
  );
}

export default Home;

// 트렌드 목록을 가져오는 함수
const fetchTrends = async () => {
  try {
    // '/api/trends' 엔드포인트로 GET 요청을 보냄
    const response = await fetch("https://api.example.com/user");

    // 응답이 성공적인지 확인
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 응답 본문을 JSON으로 변환
    const trends = await response.json();

    // 트렌드 목록을 콘솔에 출력
    console.log("Received trends:", trends);
    return trends; // 트렌드 목록 반환
  } catch (error) {
    // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    console.error("Error fetching trends:", error);
  }
};
