import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Corrected the typo: `isProtedtedRoutes` to `isProtectedRoutes`
const isProtectedRoutes = createRouteMatcher([
  '/dashboard(.*)',    // Matches any route under /dashboard, e.g., /dashboard/settings
  '/api/payment',      // Matches /api/payment exactly
  '/payment(.*)'       // Matches any route under /payment, e.g., /payment/checkout
]);

// Middleware that will protect certain routes
export default clerkMiddleware(async (auth, req) => {
  // Check if the request matches one of the protected routes
  if (isProtectedRoutes(req)) {
    // Use Clerk's protect() method to secure the route
    auth().protect();
  }
});

// Config for the Next.js middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and static files (e.g., images, fonts, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (e.g., /api and /trpc)
    '/(api|trpc)(.*)',
  ],
};
