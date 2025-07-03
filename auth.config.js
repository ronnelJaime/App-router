    // auth.config.js
    // This file defines the basic configuration for NextAuth.js in JavaScript.

    // No type imports needed for JavaScript

    export const authConfig = {
      pages: {
        signIn: '/login', // Redirects users to your custom login page
      },
      // Callbacks and providers will be added in later steps
      callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
    };
    