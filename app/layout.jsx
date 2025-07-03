    // app/layout.jsx
    // This is the root layout for your Next.js application.
    // Now includes global metadata for SEO and social sharing.

    import '@/app/ui/global.css';
    import { inter } from '@/app/ui/fonts';
    import SegmentedLoadingBar from '@/app/ui/segmented-loading-bar';

    // Add global metadata here
    export const metadata = {
      title: {
        template: '%s | Next.js Dashboard', // Dynamic title based on page
        default: 'Next.js Dashboard', // Default title for pages without specific title
      },
      description: 'The official Next.js Learn Dashboard built with App Router.',
      metadataBase: new URL('https://nextjs-dashboard-app-router-example.vercel.app'), // Replace with your deployment URL
    };

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <SegmentedLoadingBar />
            {children}
          </body>
        </html>
      );
    }
    