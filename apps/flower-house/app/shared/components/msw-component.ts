"use client";
import { useEffect } from "react";
import { API_MOCKING } from "../constants/config";

const MSWComponent = () => {
  if (API_MOCKING === "enabled") return null;
  console.log("하이");
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(process.env.NEXT_PUBLIC_API_MOCKING, API_MOCKING);
      console.log("mock server is running");
      require("@/app/shared/mocks/browser");
    }
  }, []);

  return null;
};

export default MSWComponent;
