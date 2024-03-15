import Footer from "@/app/shared/components/footer";
import { createInquiry, getAllInquiries } from "@/app/shared/mocks/handlersFun";
export default async function NotificationPage() {
  await createInquiry({ dd2323: "감자" });

  const user = await getAllInquiries();
  console.log(user);
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      {user.length}
      <div>Notification</div>
      <Footer />
    </main>
  );
}
