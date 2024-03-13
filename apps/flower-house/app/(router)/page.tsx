import Footer from "@/app/shared/components/footer";

function Home() {
  fetchPosts();
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      <Footer />
    </main>
  );
}

export default Home;

const fetchPosts = async () => {
  try {
    const response = await fetch("http://localhost:9090/api/followingPosts", {
      method: "GET", // 요청 메서드 지정
      headers: {
        "Cache-Control": "no-cache" // 캐시를 사용하지 않도록 설정
      },
      cache: "no-store" // 브라우저 캐시를 사용하지 않도록 설정
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const posts = await response.json();
    console.log("Received posts:", posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
