import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { checkBotId } from 'botid/server';

const t = initTRPC.create();

let counter = 0;

// Middleware to check for bots with deepAnalysis
const botIdMiddleware = t.middleware(async ({ next }) => {
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: 'deepAnalysis',
    },
  });
  
  if (verification.isBot) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Bot detected. Access denied.',
    });
  }
  
  return next();
});

// Protected procedure with BotID check
const protectedProcedure = t.procedure.use(botIdMiddleware);

export const appRouter = t.router({
  greeting: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
  
  getCounter: protectedProcedure.query(() => {
    return { count: counter };
  }),
  
  incrementCounter: protectedProcedure.mutation(() => {
    counter += 1;
    return { count: counter };
  }),
});

export type AppRouter = typeof appRouter;