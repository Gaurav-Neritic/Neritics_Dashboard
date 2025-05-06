import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { UserContextProvider } from "../context/UserContext";
import SidebarNav from "@/components/Navbar/(Navbar)/Navbar";
import MobileNavbar from "@/components/Navbar/(MobileNavbar)/MobileNavbar";
import AccessibilityMenu from "@/components/Navbar/AccessibilityMenu";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserContextProvider>
        <ReactQueryProvider>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-4">
            {/* Desktop Navbar*/}
            <div className="sticky top-0 hidden mx-4 my-5 border rounded h-fit md:mx-0 border-lightBorder dark:border-darkBorder lg:block">
              <SidebarNav />
            </div>
            {/* Mobile Navbar */}
            <div className="sticky top-0 z-10 block p-2 mx-5 border rounded bg-gray-50 dark:bg-neutral-900 lg:hidden h-fit lg:mx-0 border-lightBorder dark:border-darkBorder dark:text-black">
              <MobileNavbar />
            </div>
            {/* Accessibility  */}
            <div className="my-5 rounded max-sm:border-none lg:border border-lightBorder dark:border-darkBorder">
              <AccessibilityMenu />
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </ReactQueryProvider>
      </UserContextProvider>
    </>
  );
}
