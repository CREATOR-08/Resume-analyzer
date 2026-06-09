import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/analyse", "/dashboard"];
const BETTER_AUTH_SESSION_COOKIE = "better-auth.session_token";

export function proxy(request: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has("resume_lens_session") || request.cookies.getAll().some((cookie) =>
    cookie.name.includes(BETTER_AUTH_SESSION_COOKIE)
  );

  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/analyse/:path*", "/dashboard/:path*"],
};
