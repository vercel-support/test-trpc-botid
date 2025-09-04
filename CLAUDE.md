# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - starts Next.js development server with Turbopack
- **Build**: `npm run build` - creates production build with Turbopack
- **Start production**: `npm run start` - runs production server

## Architecture Overview

This is a Next.js 15 application using the App Router architecture:

### Project Structure
```
src/
├── app/
│   ├── layout.tsx      - Root layout component
│   ├── page.tsx        - Home page component
│   └── globals.css     - Global styles with Tailwind CSS
```

### Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack (enabled for dev and build)
- **Styling**: Tailwind CSS v4 with PostCSS integration
- **TypeScript**: Full TypeScript configuration
- **React**: Version 19.1.0
- **tRPC**: Version 11.5.0 for type-safe API endpoints
- **Security**: Vercel BotID 1.5.4 for bot protection

### Key Architectural Notes
- Uses Next.js App Router (not Pages Router)
- All pages and layouts are in `src/app/` directory
- Tailwind CSS v4 is configured via `@import "tailwindcss"` in globals.css
- TypeScript configuration is standard Next.js setup
- No custom Tailwind config file present - uses defaults
- Turbopack is enabled for faster builds and development

## tRPC Implementation

### Structure
- **tRPC Router**: `src/lib/trpc.ts` - defines server-side procedures
- **tRPC Client**: `src/lib/trpc-client.ts` - client-side tRPC setup
- **API Endpoints**: `src/app/api/trpc/[trpc]/route.ts` - Next.js API route handler
- **Providers**: `src/components/providers.tsx` - React Query and tRPC providers

### Available Endpoints
- `greeting` - Query that takes a name and returns a greeting
- `getCounter` - Query that returns the current counter value
- `incrementCounter` - Mutation that increments the counter

## BotID Protection

### Configuration
- **Next.js Config**: BotID integrated via `withBotId()` wrapper in `next.config.ts`
- **Client Protection**: `src/instrumentation.client.ts` - protects `/api/trpc/*` endpoints
- **Server Verification**: All tRPC procedures use `botIdMiddleware` for bot detection

### Protected Routes
All tRPC endpoints (`/api/trpc/*`) are protected by BotID:
- GET and POST requests to any tRPC procedure are validated
- Bot requests receive 403 FORBIDDEN responses
- Local development always returns `isBot: false` for testing