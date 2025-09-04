import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { checkBotId } from 'botid/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// Create context type that includes request information
export const createContext = (opts: FetchCreateContextFnOptions) => {
  return {
    req: opts.req,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

let counter = 0;

// Middleware to check for bots with deepAnalysis
const botIdMiddleware = t.middleware(async ({ ctx, next }) => {
  // BotID automatically detects request context from the server environment
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: 'basic',
    },
    developmentOptions: {
      // Allow development bypass to prevent false positives during development
      isDevelopment: process.env.NODE_ENV !== 'production',
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

  // Add nested router for botid endpoints (matching your unitracker-payload project structure)
  botid: t.router({
    institution: protectedProcedure.query(() => {
      // Your institution logic here
      return {
        id: 1,
        name: 'Sample Institution',
        status: 'active',
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;