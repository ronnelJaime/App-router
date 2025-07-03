    

    import '@/app/ui/global.css';
    import { inter } from '@/app/ui/fonts';
    import SegmentedLoadingBar from '@/app/ui/segmented-loading-bar';

    
    export const metadata = {
      title: {
        template: '%s | Next.js Dashboard', 
        default: 'Next.js Dashboard', 
      },
      description: 'The official Next.js Learn Dashboard built with App Router.',
      metadataBase: new URL('https://nextjs-dashboard-app-router-example.vercel.app'), 
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
    