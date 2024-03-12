"use client";

import React from "react";
import { SWRConfig } from "swr";

// SWRProviderProps 인터페이스를 정의하여 children prop의 타입을 React.ReactNode로 지정
interface SWRProviderProps {
  children: React.ReactNode;
}

// SWRProvider 컴포넌트의 props 타입을 SWRProviderProps로 지정
const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>;
};
export default SWRProvider;
