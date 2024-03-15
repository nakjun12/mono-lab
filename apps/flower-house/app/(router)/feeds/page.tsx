import Footer from "@/app/shared/components/footer";
import { getAllInquiries } from "@/app/shared/mocks/handlersFun";
export default async function FeedsPage() {
  const user = await getAllInquiries();
  console.log(user);
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      {user.length}
      <div>Feeds</div>
      <Footer />
    </main>
  );
}
