This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## FOVY 前端（2026-09 改版）

### 環境變數
複製 `.env.example` 成 **`.env.local`**（注意是點，不是 `-`；原本的 `.env-local` 不會被 Next.js 讀取）。
Google 登入需要 `NEXT_PUBLIC_GOOGLE_CLIENT_ID`（與後端 `GOOGLE_CLIENT_ID` 相同），並在 Google Cloud Console 的
「Authorized JavaScript origins」加上 `http://localhost:3000` 與正式網域。

### 頁面
| 路徑 | 說明 |
|---|---|
| `/Login`、`/Signup` | Email 登入／註冊（名字＋Email＋密碼），以及 Google 登入按鈕 |
| `/Onboarding` | Google 新使用者確認顯示名稱（未完成前 proxy 會一直導到這裡） |
| `/Growth` | 技能地圖（只顯示已具備）／成長地圖（含推薦，藍色虛線圈）；「＋」上傳履歷／作品集／圖片／GitHub |
| `/History` | 使用紀錄時間軸、使用頻率、歷次技能地圖 |
| `/Dashboard` | 個人資料（「我要轉職」已移除） |

### BFF API（`app/api`）
`/api/auth/{login,register,google,onboarding,token-refresh,logout,me}`、`/api/submissions`、`/api/submissions/[id]`、
`/api/tree/{latest,maps,maps/[id]}`、`/api/activity/{me,summary}`。
瀏覽器只跟 Next.js 溝通；JWT 存在 HttpOnly cookie，後端服務自行驗證身分（前端不再傳 user_id）。

### 程式結構
- `app/lib/domain/`：純函式（上傳檢查、GitHub 連結解析、圖資料過濾、提交狀態、JWT claim、proxy 導頁規則），以 vitest 測試
- `app/lib/useSkillmapSubmission.ts`：上傳 → polling → 載入地圖
- `proxy.ts`：只呼叫 `decideRoute()`，規則都在 `app/lib/domain/routing.ts`

```bash
npm run typecheck   # tsc
npm test            # vitest（app/**/*.test.ts）
npm run lint
```
