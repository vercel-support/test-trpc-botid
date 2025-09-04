'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc-client';

export default function Home() {
  const [name, setName] = useState('World');
  
  const greeting = trpc.greeting.useQuery({ name });
  const counter = trpc.getCounter.useQuery();
  const incrementMutation = trpc.incrementCounter.useMutation({
    onSuccess: () => {
      counter.refetch();
    }
  });

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">tRPC Test App</h1>
      
      <div className="space-y-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Greeting Feature</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border px-3 py-2 rounded mr-4"
          />
          <div className="mt-4">
            {greeting.isLoading && <p>Loading greeting...</p>}
            {greeting.data && <p className="text-lg font-medium">{greeting.data}</p>}
            {greeting.error && <p className="text-red-500">Error: {greeting.error.message}</p>}
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Counter Feature</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => incrementMutation.mutate()}
              disabled={incrementMutation.isPending}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {incrementMutation.isPending ? 'Incrementing...' : 'Increment'}
            </button>
            <div>
              {counter.isLoading && <span>Loading...</span>}
              {counter.data && <span className="text-lg">Count: {counter.data.count}</span>}
              {counter.error && <span className="text-red-500">Error loading counter</span>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
