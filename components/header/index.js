"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import "./header.css";
import { useRouter } from "next/navigation";
function Header() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  function handleClick() {
    setShow(!show);
  }
  return (
    <header className="header">
      <div className="body">
        <div className="logo">
          <Link href="/">
            <img src="/image/ndk.png" alt="logo" />
          </Link>
        </div>
        <nav className={`header_nav ${show ? "" : "show"}`}>
          {session ? (
            <div className="admin mobie p-5">
              <div className="body">
                <img src={session?.user?.image} alt="icon" />
                <div className="admin-name">{session?.user?.fullname}</div>
              </div>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                type="button"
                className="text-white admin mobie px-7 py-5"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                type="button"
                className="text-white admin mobie px-7"
              >
                Đăng kí
              </Link>
            </div>
          )}

          <ul className="header_nav-item">
            <li onClick={handleClick}>
              <Link href="/">Game Mod</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/shareCourse">Khóa Học</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        {session ? (
          <div className="admin relative cursor-pointer">
            <div className="body">
              <img src={session?.user?.image} alt="icon" />
              <div className="admin-name">{session?.user?.fullname}</div>
            </div>
            <ul className="bg-slate-100 right-0 rounded absolute overflow-hidden">
              {session?.user?.role === "admin" && (
                <Link
                  className="cursor-pointer hover:bg-slate-300 p-2 block"
                  href="/admin"
                >
                  Manage
                </Link>
              )}
              <li
                className="cursor-pointer hover:bg-slate-300 p-2"
                onClick={() =>
                  signOut({ redirect: false }).then(() => {
                    router.push("/");
                  })
                }
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        ) : (
          <div className="admin flex gap-2">
            <Link href="/login" type="button" className="text-white">
              Đăng nhập
            </Link>
            <div className="text-white"> | </div>
            <Link href="/register" type="button" className=" text-white">
              Đăng Kí
            </Link>
          </div>
        )}

        <div className="bar_menu">
          {show ? (
            <AiOutlineClose
              color="white"
              size="25px"
              onClick={handleClick}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            <AiOutlineMenu
              color="white"
              size="25px"
              onClick={handleClick}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
