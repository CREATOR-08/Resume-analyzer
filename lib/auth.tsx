import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
const googleProvider = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
} : undefined;

const githubProvider = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
} : undefined;

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github"],
  },
},
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/api/auth",
  
  plugins: [
    // Add plugins here
  ],

  // Use custom signin/signup routes for local auth flows, not the built-in better-auth email/password endpoints.
  emailAndPassword: {
    enabled: false,
  },

  socialProviders: {
    ...(googleProvider ? { google: googleProvider } : {}),
    ...(githubProvider ? { github: githubProvider } : {}),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // update session every day
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
    },
  },
});