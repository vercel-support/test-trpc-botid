import type { NextConfig } from "next";
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  // Configuration options
};

export default withBotId(nextConfig);