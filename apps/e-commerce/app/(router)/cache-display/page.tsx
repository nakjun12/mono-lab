"use client";

import { useCallback, useEffect, useState } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState<string | null>(null);

  const fetchTime = useCallback(async () => {
    const res = await fetch("/api/cache-test", { cache: "no-store" });
    const data = await res.json();
    setTime(data.time);
  }, []);

  useEffect(() => {
    fetchTime();
  }, []);

  return (
    <div>
      <p>서버 시간: {time ?? "Loading..."}</p>
      <button onClick={fetchTime}>새로운 시간 가져오기</button>
    </div>
  );
}
