    // app/layout.jsx
    // This is the root layout for your Next.js application.
    // It now includes the custom SegmentedLoadingBar component.

    import '@/app/ui/global.css';
    import { inter } from '@/app/ui/fonts';
    import SegmentedLoadingBar from '@/app/ui/segmented-loading-bar'; // Import the new component

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <SegmentedLoadingBar /> {/* <-- Add the custom loading bar here */}
            {children}
          </body>
        </html>
      );
    }
    