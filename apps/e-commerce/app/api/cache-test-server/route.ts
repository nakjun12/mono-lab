import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

enum CacheType {
  NO_CACHE = "no-cache",
  NO_STORE = "no-store",
  SHORT = "short",
  LONG = "long",
  STALE = "stale",
  LAST_MODIFIED = "last-modified",
  ETAG = "etag",
  PUBLIC = "public",
  PRIVATE = "private",
  S_MAXAGE = "s-maxage"
}

const CACHE_SETTINGS: Record<CacheType, string> = {
  [CacheType.NO_CACHE]: "no-cache",
  [CacheType.NO_STORE]: "no-store",
  [CacheType.SHORT]: "public, max-age=10",
  [CacheType.LONG]: "public, max-age=3600",
  [CacheType.STALE]: "public, s-maxage=10, stale-while-revalidate=59",
  [CacheType.LAST_MODIFIED]: "public, must-revalidate",
  [CacheType.ETAG]: "public, must-revalidate",
  [CacheType.PUBLIC]: "public, max-age=60",
  [CacheType.PRIVATE]: "private, max-age=60",
  [CacheType.S_MAXAGE]: "public, s-maxage=120, max-age=60"
};

let lastModified = new Date().toUTCString();

let etag = crypto
  .createHash("md5")
  .update(JSON.stringify({ time: new Date().toISOString() }))
  .digest("hex");

function generateHeaders(cacheType: CacheType): HeadersInit {
  const headers: HeadersInit = {
    "Cache-Control": CACHE_SETTINGS[cacheType]
  };

  if (cacheType === CacheType.LAST_MODIFIED) {
    headers["Last-Modified"] = lastModified;
  } else if (cacheType === CacheType.ETAG) {
    headers["ETag"] = etag;
  } else if (cacheType === CacheType.SHORT || cacheType === CacheType.LONG) {
    const now = Date.now();
    const lastUpdate = lastUpdateTime[cacheType];
    const maxAge = cacheType === CacheType.SHORT ? 10 : 3600;
    const age = Math.floor((now - lastUpdate) / 1000);

    headers["Cache-Control"] = `public, max-age=${maxAge}`;
    headers["Age"] = age.toString();

    if (age >= maxAge) {
      headers["Cache-Control"] = "no-cache";
    }
  }

  // 실제로는 프록시 캐시에 의해 설정됨
  if (
    cacheType !== CacheType.NO_CACHE &&
    cacheType !== CacheType.NO_STORE &&
    cacheType !== CacheType.SHORT &&
    cacheType !== CacheType.LONG
  ) {
    headers["Age"] = Math.floor(Math.random() * 60).toString();
  }

  return headers;
}

function handleConditionalRequest(
  request: NextRequest,
  cacheType: CacheType
): number {
  if (cacheType === CacheType.LAST_MODIFIED) {
    const ifModifiedSince = request.headers.get("If-Modified-Since");
    return ifModifiedSince &&
      new Date(ifModifiedSince) >= new Date(lastModified)
      ? 304
      : 200;
  } else if (cacheType === CacheType.ETAG) {
    const ifNoneMatch = request.headers.get("If-None-Match");
    console.log(ifNoneMatch, etag, "??");
    return ifNoneMatch === etag ? 304 : 200;
  }
  return 200;
}

type UpdateableCacheType = CacheType.SHORT | CacheType.LONG;

const lastUpdateTime: Record<UpdateableCacheType, number> = {
  [CacheType.SHORT]: Date.now(),
  [CacheType.LONG]: Date.now()
};

export async function GET(request: NextRequest) {
  const time = new Date().toISOString();
  const cacheType =
    (request.nextUrl.searchParams.get("cache") as CacheType) ??
    CacheType.NO_CACHE;

  const headers = generateHeaders(cacheType);
  const status = handleConditionalRequest(request, cacheType);

  if (status === 304) {
    return new NextResponse(null, { status, headers });
  }

  if (cacheType === CacheType.SHORT || cacheType === CacheType.LONG) {
    const now = Date.now();
    const lastUpdate = lastUpdateTime[cacheType];
    const maxAge = cacheType === CacheType.SHORT ? 10 : 3600;

    if (now - lastUpdate >= maxAge * 1000) {
      lastUpdateTime[cacheType] = now;
      console.log(`Cache refreshed for ${cacheType}`);
      return NextResponse.json({ time, cacheType }, { headers });
    } else {
      console.log(`Cached response returned for ${cacheType}`);
      const cachedTime = new Date(lastUpdate).toISOString();
      return NextResponse.json({ time: cachedTime, cacheType }, { headers });
    }
  }

  if (cacheType === CacheType.LAST_MODIFIED) {
    lastModified = new Date().toUTCString();
  }

  return NextResponse.json({ time, cacheType }, { status, headers });
}
