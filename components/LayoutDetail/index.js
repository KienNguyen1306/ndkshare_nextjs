"use client";
import { usePathname } from "next/navigation";
import Footer from "../footer";
import Header from "../header";
import AdminLayout from "./AdminLayout";
function LayoutDetail({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return (
      <html lang="en">
        <body>
          <div className="">{children}</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Header />
        <div className="main-body">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

export default LayoutDetail;
