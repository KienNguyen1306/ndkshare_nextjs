"use client";

import Link from "next/link";
import "./header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useSession } from "next-auth/react";
function Header() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  function handleClick() {
    setShow(!show);
  }
  return (
    <header className="header">
      <div className="body">
        <div className="logo">
          <Link href="/">
            <img src="./image/ndk.png" alt="logo" />
          </Link>
        </div>
        <nav className={`header_nav ${show ? "" : "show"}`}>
          {session ? (
            <div className="admin mobie">
              <div className="body">
                <img src={session?.user?.image} alt="icon" />
                <div className="admin-name">{session?.user?.fullname}</div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              type="button"
              className="text-violet-700 admin mobie"
            >
              Đăng nhập
            </Link>
          )}

          <ul className="header_nav-item">
            <li onClick={handleClick}>
              <Link href="/">Game Mod</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/shareCourse">ShareCourse</Link>
            </li>
            <li>
              <Link href="contact">Contact</Link>
            </li>
          </ul>
        </nav>
        {session ? (
          <div className="admin">
            <div className="body">
              <img src={session?.user?.image} alt="icon" />
              <div className="admin-name">{session?.user?.fullname}</div>
              {session?.user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="admin-name border px-2 py-0.5 rounded-lg"
                >
                  {" "}
                  Manage{" "}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <Link href="/login" type="button" className="text-violet-700">
            Đăng nhập
          </Link>
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
