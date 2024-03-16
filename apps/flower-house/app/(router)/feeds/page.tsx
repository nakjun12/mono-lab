import Footer from "@/app/shared/components/footer";
import { getAllInquiries } from "@/app/shared/mocks/handlersFun";
export default async function FeedsPage() {
  const inquiries = await getAllInquiries();
  console.log(inquiries, "inquiries");
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      {inquiries.length}
      <div>Feeds</div>
      <Footer />
    </main>
  );
}
