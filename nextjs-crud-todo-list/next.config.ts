import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Treat this app directory as the workspace root to avoid
    // multiple lockfile warnings and ensure envs load from here.
    root: __dirname,
  },
};

export default nextConfig;
