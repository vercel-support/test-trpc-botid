import { initBotId } from 'botid/client/core';

export async function register() {
  // Initialize BotID with correct tRPC procedure endpoint protection
  initBotId({
    protect: [
      {
        // Individual tRPC procedure endpoints
        path: '/api/trpc/greeting',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic',
        },
      },
      {
        path: '/api/trpc/getCounter',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic',
        },
      },
      {
        path: '/api/trpc/incrementCounter',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic',
        },
      },
      {
        path: '/api/trpc/botid.institution',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic',
        },
      },
      {
        // Batched request format that was causing errors
        path: '/api/trpc/greeting,getCounter',
        method: 'POST',
        advancedOptions: {
          checkLevel: 'basic',
        },
      },
    ],
  });
}