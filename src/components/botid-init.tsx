'use client';

import { useEffect } from 'react';
import { initBotId } from 'botid/client/core';

export function BotIdInit() {
  useEffect(() => {
    // Initialize BotID client-side protection with explicit paths
    initBotId({
      protect: [
        {
          // Exact match for the batched request that's causing the error
          path: '/api/trpc/greeting,getCounter',
          method: 'POST',
          advancedOptions: {
            checkLevel: 'basic',
          },
        },
        {
          // Base tRPC endpoint
          path: '/api/trpc',
          method: 'POST',
          advancedOptions: {
            checkLevel: 'deepAnalysis',
          },
        },
        {
          // Base tRPC endpoint for GET
          path: '/api/trpc',
          method: 'GET',
          advancedOptions: {
            checkLevel: 'deepAnalysis',
          },
        },
        {
          // Individual endpoints
          path: '/api/trpc/greeting',
          method: 'POST',
          advancedOptions: {
            checkLevel: 'deepAnalysis',
          },
        },
        {
          path: '/api/trpc/getCounter',
          method: 'POST',
          advancedOptions: {
            checkLevel: 'deepAnalysis',
          },
        },
        {
          path: '/api/trpc/incrementCounter',
          method: 'POST',
          advancedOptions: {
            checkLevel: 'deepAnalysis',
          },
        },
      ],
    });
  }, []);

  return null; // This component doesn't render anything
}
