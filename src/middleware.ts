import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith("/u/"));
  
  // Rotas administrativas que precisam de permissão de admin
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  
  // Verificar token de autenticação
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirecionar para login se não estiver autenticado e tentar acessar rota protegida
  if (!token && !isPublicRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // Verificar permissão de admin para rotas administrativas
  if (isAdminRoute && (!token || !(token.isAdmin as boolean))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Redirecionar para dashboard se já estiver autenticado e tentar acessar login/register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
