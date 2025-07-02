    import Form from '@/app/ui/invoices/edit-form';
    import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
    import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
    import { notFound } from 'next/navigation';

    export default async function Page({ params }) {
      const resolvedParams = await params;
      const id = resolvedParams.id;

      const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);

     //debug logs
      // console.log('Fetched Invoice (after Promise.all):', invoice);
      // console.log('Fetched Customers (after Promise.all):', customers);

      if (!invoice) {
        notFound();
      }

      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Invoices', href: '/dashboard/invoices' },
              {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
              },
            ]}
          />
          <Form invoice={invoice} customers={customers} />
        </main>
      );
    }
    