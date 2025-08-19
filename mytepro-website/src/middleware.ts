import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'zh', 'ja'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always require locale prefix
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Delegate locale handling to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\..*).*)']
};