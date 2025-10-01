import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";
import TanstackProvider from "./_trpc/tanstack-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoGuard: Empower Your Community, Protect Our Planet",
  description:
    "EcoGuard is the all-in-one platform to report environmental issues, connect with local heroes, and drive real, measurable change. Your action, amplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="onesignal-sdk"
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        defer
      />
      <body className={`${outfit.variable} antialiased`}>
        <TanstackProvider>
          {children} <Toaster richColors position="top-center" />
        </TanstackProvider>
      </body>
    </html>
  );
}
