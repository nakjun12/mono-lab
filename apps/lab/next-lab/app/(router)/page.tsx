"use client";

import { useState } from "react";

export default function Page(): JSX.Element {
  const [test, setTest] = useState(false);
  const text = "text-purple-300";
  return (
    <main className="bg-red">
      <div
        className={`bg-red ${text} ${test ? "bg-slate-300" : "bg-tw-green"} text-purple-${1 * 500}`}>
        rkawk
      </div>
      하이
    </main>
  );
}
