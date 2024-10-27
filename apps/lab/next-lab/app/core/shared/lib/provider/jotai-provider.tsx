// providers.js (app directory)
"use client";

import { Provider } from "jotai";
import type { PropsWithChildren } from "react";

export default function JotaiProvider({
	children,
}: Readonly<PropsWithChildren<object>>) {
	return <Provider>{children}</Provider>;
}
