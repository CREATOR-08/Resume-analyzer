import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "./prisma";
export const auth = betterAuth({
  database: prismaAdapter(prisma,{provider: "postgresql"}),
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/api/auth",
  
  plugins: [
    // Add plugins here
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
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