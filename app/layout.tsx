import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import DashboardLayout from "../layouts/DashboardLayout";
import "./globals.css";
import localFont from "next/font/local";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "مشتریان",
  description: "مشتریان",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});
const vazirmatn = localFont({
  src: [
    {
      path: "../public/fonts/Vazirmatn[wght].woff2",
      style: "normal",
      weight: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Black.ttf",
      style: "normal",
      weight: "bold",
    },
  ],
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="fa-IR"
      className={vazirmatn.className}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className={geistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardLayout toolbarActions={<ToolbarActions />}>
            {children}
          </DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ToolbarActions() {
  return (
    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    </div>
  );
}
