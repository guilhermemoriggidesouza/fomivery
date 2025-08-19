import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/[tenant](.*)",
]);

export default clerkMiddleware(async (auth, request) => {
    request.headers.set("x-pathname", request.nextUrl.pathname);

    if (!isPublicRoute(request)) auth.protect()

    clerkMiddleware();

    NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
});

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};
