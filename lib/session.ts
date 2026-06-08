import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import prisma from "@/lib/prisma";

const SESSION_COOKIE = "resume_lens_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

type SessionPayload = {
  userId: string;
  expiresAt: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSessionSecret() {
  return process.env.BETTER_AUTH_SECRET || "fallback-secret-change-in-production";
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function verifySignature(payload: string, signature: string) {
  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function createSession(userId: string) {
  const payload: SessionPayload = {
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const token = `${encodedPayload}.${sign(encodedPayload)}`;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || !verifySignature(encodedPayload, signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;

    if (!payload.userId || payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSessionPayload();

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
