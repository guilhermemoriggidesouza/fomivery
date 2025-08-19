import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

const publicAdminRoutes = ["/sign-in"];

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;
  req.headers.set("x-pathname", path);
  console.log(path )
  if (isProtectedRoute(req) && !publicAdminRoutes.includes(path)) {
    await auth.protect(); // ✅ proteção aplicada
  }
  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
});

export const config = {
  matcher: ["/admin/:path*"], // só ativa o middleware nas rotas /admin
};