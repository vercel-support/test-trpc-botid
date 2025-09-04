import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BotIdClient } from 'botid/client';

export const metadata: Metadata = {
  title: "tRPC Test App",
  description: "Testing tRPC with Next.js 15",
};

const protectedRoutes = [
  {
    path: '/api/trpc/greeting,getCounter',
    method: 'POST',
  },
  {
    path: '/api/trpc',
    method: 'POST',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <BotIdClient protect={protectedRoutes} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
