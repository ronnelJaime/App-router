    // middleware.js
    // This file initializes NextAuth.js middleware to protect routes in JavaScript.

    import NextAuth from 'next-auth';
    import { authConfig } from './auth.config'; // Import your auth configuration

    export default NextAuth(authConfig).auth; // Initialize NextAuth and export its auth property

    // Configuration for the middleware matcher
    export const config = {
      // The matcher option specifies which paths the middleware should run on.
      // It will run on all paths except:
      // - API routes (/api)
      // - Next.js static files (_next/static)
      // - Next.js image optimization files (_next/image)
      // - Files with a .png extension
      matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    };
    