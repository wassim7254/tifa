import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // تخطي ملفات Next.js الداخلية والملفات الثابتة
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // تشغيل الـ middleware دائماً للـ API routes
    '/(api|trpc)(.*)',
  ],
};