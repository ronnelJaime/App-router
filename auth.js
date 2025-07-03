    import NextAuth from 'next-auth';
    import { authConfig } from './auth.config'; 
    import Credentials from 'next-auth/providers/credentials'; 
    import { z } from 'zod'; 
    import bcrypt from 'bcrypt'; 
    import postgres from 'postgres'; 

    const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

    /**
     * @typedef {Object} User
     * @property {string} id
     * @property {string} name
     * @property {string} email
     * @property {string} password
     */

    async function getUser(email) {
      try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user[0]; 
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
      }
    }

    export const { auth, signIn, signOut } = NextAuth({
      ...authConfig, 
      providers: [
        Credentials({
          async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);

            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await getUser(email); 
              if (!user) return null; 

              const passwordsMatch = await bcrypt.compare(password, user.password);

              if (passwordsMatch) return user; 
            }

            console.log('Invalid credentials');
            return null; 
          },
        }),
      ],
    });
    