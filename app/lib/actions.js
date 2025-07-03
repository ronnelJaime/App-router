    // app/lib/actions.js
    // This file contains Server Actions for data mutations and authentication.
    // Follows Chapter 15 tutorial exactly.

    'use server';

    import { z } from 'zod';
    import postgres from 'postgres'; // As per your previous request to use 'postgres'
    import { revalidatePath } from 'next/cache';
    import { redirect } from 'next/navigation';
    import { signIn } from '@/auth'; // Import signIn from your auth.js file
    import { AuthError } from 'next-auth'; // Import AuthError for specific error handling

    // Initialize the postgres client (ensure your .env has POSTGRES_URL)
    const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

    const InvoiceSchema = z.object({
      id: z.string(),
      customerId: z.string({
        invalid_type_error: 'Please select a customer.',
      }),
      amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
      status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
      }),
      date: z.string(),
    });

    const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
    const UpdateInvoice = InvoiceSchema.omit({ date: true });

    export async function createInvoice(prevState, formData) {
      const rawFormData = Object.fromEntries(formData.entries());
      const validatedFields = CreateInvoice.safeParse(rawFormData);

      if (!validatedFields.success) {
        console.error('Validation Error:', validatedFields.error.flatten().fieldErrors);
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }

      const { customerId, amount, status } = validatedFields.data;
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0];

      try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
      } catch (error) {
        console.error('Database Error: Failed to Create Invoice.', error);
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
      }

      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    }

    export async function updateInvoice(id, prevState, formData) {
      const rawFormData = Object.fromEntries(formData.entries());
      const validatedFields = UpdateInvoice.safeParse({
        id: id,
        customerId: rawFormData.customerId,
        amount: rawFormData.amount,
        status: rawFormData.status,
      });

      if (!validatedFields.success) {
        console.error('Validation Error (Update):', validatedFields.error.flatten().fieldErrors);
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Update Invoice.',
        };
      }

      const { customerId, amount, status } = validatedFields.data;
      const amountInCents = amount * 100;

      try {
        await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
      } catch (error) {
        console.error('Database Error: Failed to Update Invoice.', error);
        return { message: 'Database Error: Failed to Update Invoice.' };
      }

      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    }

    export async function deleteInvoice(id) {
      try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
      } catch (error) {
        console.error('Database Error: Failed to Delete Invoice.', error);
        return { message: 'Database Error: Failed to Delete Invoice.' };
      }
    }

    // New authentication Server Action - EXACTLY AS PER TUTORIAL
    export async function authenticate(
      prevState, // This will hold the previous state from useActionState
      formData, // The form data submitted
    ) {
      try {
        await signIn('credentials', formData);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
    }
    