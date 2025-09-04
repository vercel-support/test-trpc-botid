import { initBotId } from 'botid/client/core';

export async function register() {
  // Define the tRPC endpoints that need bot protection with deepAnalysis
  initBotId({
    protect: [
      {
        // Protect base tRPC endpoint
        path: '/api/trpc',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
      {
        // Protect GET requests for direct API calls
        path: '/api/trpc',
        method: 'GET',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
      {
        // Protect batched tRPC requests - specific combination from error
        path: '/api/trpc/greeting,getCounter',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
      {
        // Protect individual procedures that might be called separately
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
      {
        // For your unitracker-payload project
        path: '/api/trpc/botid.institution',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
        },
      },
    ],
  });
}