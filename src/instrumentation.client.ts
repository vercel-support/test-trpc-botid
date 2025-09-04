import { initBotId } from 'botid/client/core';

export async function register() {
  // Define the tRPC endpoints that need bot protection with deepAnalysis
  initBotId({
    protect: [
      {
        path: '/api/trpc/greeting',
        method: 'GET',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
      {
        path: '/api/trpc/getCounter',
        method: 'GET',
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
      {
        // Protect all tRPC endpoints with wildcard
        path: '/api/trpc/*',
        method: 'GET',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
      {
        path: '/api/trpc/*',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
    ],
  });
}