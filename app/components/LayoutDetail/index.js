"use client";
import { usePathname } from "next/navigation";
import Footer from "../footer";
import Header from "../header";

function LayoutDetail({ children }) {

  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en">
        <body>
          <div className="main-body">{children}</div>
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
