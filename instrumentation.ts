import { initBotId } from 'botid/client/core';

export async function register() {
  // Initialize BotID with explicit tRPC endpoint protection
  initBotId({
    protect: [
      {
        // Exact match for the problematic batched request
        path: '/api/trpc/greeting,getCounter',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'deepAnalysis',
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
    ],
  });
}