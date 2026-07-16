import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthPage = 
    req.nextUrl.pathname === '/mon-espace/connexion' ||
    req.nextUrl.pathname === '/mon-espace/inscription';

  // Protect /mon-espace routes
  if (req.nextUrl.pathname.startsWith('/mon-espace')) {
    if (isAuthPage) {
      if (session) {
        // Redirect to dashboard if already logged in
        return NextResponse.redirect(new URL('/mon-espace', req.url));
      }
      return res;
    }

    // Require auth for other /mon-espace routes
    if (!session) {
      const redirectUrl = new URL('/mon-espace/connexion', req.url);
      redirectUrl.searchParams.set('redirect_to', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
