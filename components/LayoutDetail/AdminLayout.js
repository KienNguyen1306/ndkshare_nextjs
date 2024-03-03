"use client";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [pending, setPending] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchData = async () => {
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      router.push("/");
    } else {
      setPending(false);
    }
  };
  fetchData();

  return (
    <html lang="en">
      <body>
        {!pending && (
          <div className="flex admin">
            <div
              className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
              id="sidenav-main"
            >
              <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
                <a
                  className="transition-colors duration-200 ease-in-out"
                  href="/"
                >
                  <img alt="Logo" src="/image/ndk.png" className="inline" />
                </a>
              </div>
              <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200" />
              <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center mr-5">
                  <div className="mr-5">
                    <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                      <img
                        className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                        src={session?.user?.image}
                        alt="avatar image"
                      />
                    </div>
                  </div>
                  <div className="mr-2 ">
                    <a
                      href="#"
                      className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
                    >
                      {session?.user?.fullname}
                    </a>
                    <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
                      SEO Manager
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200" />
              <div className="relative pl-3 my-5 overflow-y-scroll">
                <div className="flex flex-col w-full font-medium">
                  {/* menu item */}
                  <div>
                    <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                      <Link
                        href="/admin"
                        className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                      >
                        Mod Game
                      </Link>
                    </span>
                  </div>
                  {/* menu item */}
                  <div>
                    <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                      <Link
                        href="/admin/sharecourse"
                        className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                      >
                        Share course
                      </Link>
                    </span>
                  </div>
                  {/* menu item */}
                  <div className="block pt-5 pb-[.15rem]">
                    <div className="px-4 py-[.65rem]">
                      <span className="font-semibold text-[0.95rem] uppercase dark:text-neutral-500/80 text-secondary-dark">
                        Applications
                      </span>
                    </div>
                  </div>
                  {/* menu item */}
                  <div>
                    <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                      <a
                        href="#"
                        className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                      >
                        User
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-1 my-5">
              <div className="w-full max-w-full mx-auto text-center ">
                {children}
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}

export default AdminLayout;
