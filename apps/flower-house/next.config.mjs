/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // 프로토콜 지정
        hostname: "cdn.builder.io", // 허용할 외부 이미지 도메인의 호스트네임
        port: "", // 포트 번호가 필요한 경우 여기에 지정, 그렇지 않으면 빈 문자열이나 생략 가능
        pathname: "/**" // 모든 경로를 허용하는 와일드카드 패턴
      }
    ]
  },
  experimental: {
    instrumentationHook: true
  },

}

export default nextConfig;
//리액트 쿼리를 사용해서 통신은 가능하지만 안정적이지 못하기때문에 express로 하는게 맞아보인다