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
    // Individual tRPC procedure endpoints
    path: '/api/trpc/greeting',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis' as const,
    },
  },
  {
    path: '/api/trpc/getCounter',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis' as const,
    },
  },
  {
    path: '/api/trpc/incrementCounter',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis' as const,
    },
  },
  {
    path: '/api/trpc/botid.institution',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis' as const,
    },
  },
  {
    // Also protect the batched request format that was causing errors
    path: '/api/trpc/greeting,getCounter',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis' as const,
    },
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
