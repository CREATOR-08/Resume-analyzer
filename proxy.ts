import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/analyse", "/dashboard"];

export function proxy(request: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has("resume_lens_session");

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
