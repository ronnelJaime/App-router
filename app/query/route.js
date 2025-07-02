import { db } from '@vercel/postgres';

    export async function GET(request) {
      const client = await db.connect(); 

      try {
        const { rows } = await client.sql`
          SELECT invoices.amount, customers.name
          FROM invoices
          JOIN customers ON invoices.customer_id = customers.id
          WHERE invoices.amount = 666;
        `;
        return Response.json({ rows });
      } catch (error) {
      
        console.error('Database Error: Could not execute query', error);
        return Response.json(
          {
            message: 'Database Error: Could not execute query',
            error: error.message, 
          },
          {
            status: 500,
          },
        );
      } finally {
        client.release(); 
      }
    }
    