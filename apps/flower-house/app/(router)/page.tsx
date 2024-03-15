import Footer from "@/app/shared/components/footer";

export type User = {
  firstName: string;
  lastName: string;
};

async function getUser() {
  console.log("fetching user", fetch);
  const response = await fetch("https://api.example.com/user");
  const user = (await response.json()) as User;
  return user;
}

export default async function Home() {
  const user = await getUser();

  console.log("user", user);
  return (
    <main className="flex items-center justify-center h-screen md:h-screen">
      <Footer />
    </main>
  );
}
