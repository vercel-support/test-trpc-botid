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
            // Exact match for the batched request that's causing the error
            path: '/api/trpc/greeting,getCounter',
            method: 'POST',
          },
          {
            // Base tRPC endpoint
            path: '/api/trpc',
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
