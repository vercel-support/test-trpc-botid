'use client';

import { useEffect, useState } from 'react';
import { initBotId } from 'botid/client/core';

export function BotIdInit() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    try {
      // Initialize BotID client-side protection with simplified config
      console.log('Initializing BotID client-side protection...');
      
      initBotId({
        protect: [
          {
            // Individual tRPC procedure endpoints
            path: '/api/trpc/greeting',
            method: 'POST',
          },
          {
            path: '/api/trpc/getCounter',
            method: 'POST',
          },
          {
            path: '/api/trpc/incrementCounter',
            method: 'POST',
          },
          {
            path: '/api/trpc/botid.institution',
            method: 'POST',
          },
          {
            // Batched request format that was causing errors
            path: '/api/trpc/greeting,getCounter',
            method: 'POST',
          },
        ],
      });
      
      setInitialized(true);
      console.log('BotID client-side protection initialized successfully');
    } catch (error) {
      console.error('Failed to initialize BotID:', error);
    }
  }, [initialized]);

  return null; // This component doesn't render anything
}
