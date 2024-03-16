"use client";
import { useEffect, useState } from "react";

export function MockProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMocking, setIsMocking] = useState(false);

  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== "undefined") {
        const { worker } = await import("../mocks/browser");
        await worker.start();
      }
      setIsMocking(true);
    }

    enableApiMocking();
  }, []);

  if (!isMocking) {
    return null;
  }

  return <>{children}</>;
}
