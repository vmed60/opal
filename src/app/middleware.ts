import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtedtedRoutes = createRouteMatcher([
    '/dashboard(.*)',
    '/api/payment',
    '/payment(.*)'
])
export default clerkMiddleware( async (auth,req)=> {
    if (isProtedtedRoutes(req)) {
        auth()

    }
}
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

