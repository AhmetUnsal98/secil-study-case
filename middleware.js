import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: "NEXTAUTH_SECRET" });
  const { pathname } = req.nextUrl;

  // Public yollar (login, ana sayfa vb.)
  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.includes(pathname);

  // Kullanıcı giriş yapmamışsa ve public olmayan bir yola erişiyorsa
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Tüm yolları koru (API ve static dosyalar hariç)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
