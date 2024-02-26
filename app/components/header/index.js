"use client";

import Link from "next/link";
import "./header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
function Header() {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }
  return (
    <header className="header">
      <div className="body">
        <div className="logo">
          <Link href="/">
            <img
              src='./image/ndk.png'
              alt="logo"
            />
          </Link>
        </div>
        <nav className={`header_nav ${show ? "" : "show"}`}>
          <div className="admin mobie">
            <div className="body">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="icon"/>
              <Link href="/contact" className="admin-name">
                Kiên Nguyễn
              </Link>
            </div>
          </div>
          <ul className="header_nav-item">
            <li onClick={ handleClick}>
              <Link href="/">Game Mod</Link>
            </li>
            <li onClick={ handleClick}>
              <Link href="/shareCourse">ShareCourse</Link>
            </li>
          </ul>
        </nav>
        <div className="admin">
          <div className="body">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"  alt="icon"/>
            <Link href="/contact" className="admin-name">
              Kiên Nguyễn
            </Link>
          </div>
        </div>

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
