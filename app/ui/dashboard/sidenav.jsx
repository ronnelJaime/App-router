    // app/ui/dashboard/sidenav.jsx
    // This component defines the sidebar navigation for the dashboard.
    // Now includes logout functionality as per Chapter 15 tutorial.

    import Link from 'next/link';
    import NavLinks from '@/app/ui/dashboard/nav-links';
    import AcmeLogo from '@/app/ui/acme-logo';
    import { PowerIcon } from '@heroicons/react/24/outline';
    import { signOut } from '@/auth'; // Import signOut from your auth.js file

    export default function SideNav() {
      return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
          <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-36"
            href="/"
          >
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </Link>
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            {/* Logout Form - EXACTLY AS PER TUTORIAL */}
            <form
              action={async () => {
                'use server'; // This form action is a Server Action
                await signOut({ redirectTo: '/' }); // Redirect to home page after logout
              }}
            >
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </div>
        </div>
      );
    }
    