import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Run Next-Intl first
  const intlResponse = handleI18nRouting(request);
  if (intlResponse) {
    return intlResponse;
  }
  // If no locale redirect is needed, update Supabase session
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api
    // - trpc
    // - _next/static
    // - _next/image
    // - _vercel
    // - favicon.ico
    // - any file extension
    '/((?!api|trpc|_next/static|_next/image|_vercel|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};