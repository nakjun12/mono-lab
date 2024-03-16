import Footer from "@/app/shared/components/footer";
import { createInquiry, getAllInquiries } from "@/app/shared/mocks/handlersFun";
export default async function NotificationPage() {
  const success = await createInquiry({ test: "serverTest" });

  console.log(success, "sucess?");
  const inquiries = await getAllInquiries();
  console.log(inquiries, "inquiries");
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      {inquiries.length}
      <div>Notification</div>
      <Footer />
    </main>
  );
}
