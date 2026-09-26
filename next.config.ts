import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 上傳檔案不經過 Next.js（Vercel Function body 上限 4.5MB）：
  // 瀏覽器向 /api/submissions/ticket 拿上傳票後，直接 POST 到 document-service。
};

export default nextConfig;
