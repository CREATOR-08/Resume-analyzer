import { destroySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await destroySession();
  const redirectUrl = new URL('/', req.url);
  return NextResponse.redirect(redirectUrl);
}
