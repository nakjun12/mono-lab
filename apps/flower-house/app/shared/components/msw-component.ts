"use client";
import { useEffect } from "react";

const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(process.env.NEXT_PUBLIC_API_MOCKING);
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        console.log("mock server is running");
        require("@/app/shared/mocks/browser");
      }
    }
  }, []);

  return null;
};

export default MSWComponent;
