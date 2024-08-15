"use client";

import { useCallback, useEffect, useState } from "react";

export default function CacheControlTest() {
  const [serverTime, setServerTime] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string | null>(null);
  const [etag, setEtag] = useState<string | null>(null);
  const [testResponses, setTestResponses] = useState<string[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [currentTest, setCurrentTest] = useState<{
    type: string;
    iterations: number;
    interval: number;
    currentIteration: number;
  } | null>(null);

  const fetchTime = useCallback(
    async (cacheType = "") => {
      const headers: HeadersInit = {};

      if (cacheType === "last-modified" && lastModified) {
        headers["If-Modified-Since"] = lastModified;
      }
      if (cacheType === "etag" && etag) {
        headers["If-None-Match"] = etag;
      }

      const url = new URL("/api/cache-test-server", window.location.origin);
      if (cacheType) {
        url.searchParams.set("cache", cacheType);
      }

      const start = performance.now();
      const res = await fetch(url, { headers });
      const end = performance.now();
      const responseTime = Math.round(end - start);

      if (res.status === 304) {
        return { time: "Cached", responseTime };
      }

      const data = await res.json();
      setServerTime(data.time);

      const newLastModified = res.headers.get("Last-Modified");
      if (newLastModified) setLastModified(newLastModified);

      const newEtag = res.headers.get("ETag");
      if (newEtag) setEtag(newEtag);

      return { ...data, responseTime };
    },
    [lastModified, etag]
  );

  const runCacheTest = useCallback(
    async (
      cacheType: string,
      iterations: number = 5,
      interval: number = 2000
    ) => {
      setTestResponses([]);
      setIsRunningTest(true);
      setCurrentTest({
        type: cacheType,
        iterations,
        interval,
        currentIteration: 0
      });
    },
    []
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runIteration = async () => {
      if (
        currentTest &&
        currentTest.currentIteration < currentTest.iterations
      ) {
        const { type, currentIteration } = currentTest;
        const data = await fetchTime(type);
        setTestResponses((prev) => [
          ...prev,
          `${type} Request ${currentIteration + 1}: ${data.responseTime}ms, Server Time: ${data.time}`
        ]);
        setCurrentTest((prev) =>
          prev ? { ...prev, currentIteration: prev.currentIteration + 1 } : null
        );
      } else {
        setIsRunningTest(false);
        setCurrentTest(null);
      }
    };

    if (isRunningTest && currentTest) {
      timeoutId = setTimeout(runIteration, currentTest.interval);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isRunningTest, currentTest, fetchTime]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Cache Control Test</h2>
      <p>Server Time: {serverTime ?? "Loading..."}</p>
      {lastModified && <p>Last Modified: {lastModified}</p>}
      {etag && <p>ETag: {etag}</p>}
      <h3>Server Cache Control Tests</h3>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("")}
        disabled={isRunningTest}>
        None
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("short")}
        disabled={isRunningTest}>
        Short (10s)
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("long")}
        disabled={isRunningTest}>
        Long (1h)
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("no-cache")}
        disabled={isRunningTest}>
        No Cache
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("stale", 10, 7000)}
        disabled={isRunningTest}>
        Stale While Revalidate
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("last-modified")}
        disabled={isRunningTest}>
        Last Modified
      </button>
      <button
        className="border p-2 border-solid border-blue-300"
        onClick={() => runCacheTest("etag")}
        disabled={isRunningTest}>
        ETag
      </button>
      <h3 className="text-xl font-semibold mt-4">Test Results</h3>
      <ul>
        {testResponses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
}
