// providers.js (app directory)
"use client";

import { Provider } from "jotai";
import { PropsWithChildren } from "react";

export default function JotaiProvider({
  children
}: Readonly<PropsWithChildren<object>>) {
  return <Provider>{children}</Provider>;
}
