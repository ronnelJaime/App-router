    // auth.js
    // This file sets up NextAuth.js with the Credentials provider,
    // including user fetching and password verification logic.

    import NextAuth from 'next-auth';
    import { authConfig } from './auth.config'; // Import your auth configuration
    import Credentials from 'next-auth/providers/credentials'; // Import the Credentials provider
    import { z } from 'zod'; // For input validation
    import bcrypt from 'bcrypt'; // For password comparison
    import postgres from 'postgres'; // For database interaction

    // Initialize the postgres client (ensure your .env has POSTGRES_URL)
    const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

    // Define a simple User structure (for clarity, no actual type checking in JS)
    // In TypeScript, this would be `type User = { id: string; name: string; email: string; password: string; };`
    /**
     * @typedef {Object} User
     * @property {string} id
     * @property {string} name
     * @property {string} email
     * @property {string} password
     */

    // Function to get a user from the database by email
    async function getUser(email) {
      try {
        // The postgres library returns an array of rows, even if only one is expected.
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user[0]; // Return the first user found, or undefined if none
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
      }
    }

    export const { auth, signIn, signOut } = NextAuth({
      ...authConfig, // Spread the basic config from auth.config.js
      providers: [
        Credentials({
          async authorize(credentials) {
            // Validate credentials using Zod
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);

            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await getUser(email); // Fetch user from database
              if (!user) return null; // If no user found, return null (authentication failed)

              // Compare the provided password with the hashed password in the database
              const passwordsMatch = await bcrypt.compare(password, user.password);

              if (passwordsMatch) return user; // If passwords match, return the user object (authentication successful)
            }

            console.log('Invalid credentials');
            return null; // If validation fails or passwords don't match, return null
          },
        }),
      ],
    });
    