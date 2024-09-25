import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";


const BottomBarlinks = [
  {
    title: "Password generator",
    url: "password-generator",
    alias: "PG",
    isActive: true,
  },
  {
    title: "Allias generator",
    url: "allias-generator",
    alias: "AG",
    isActive: false,
  },
  {
    title: "image-convertor",
    url: "image-convertor",
    alias: "IC",
    isActive: false,
  },
  {
    title: "QR generator",
    url: "qr-generator",
    alias: "QR",
    isActive: false,
  },
];


export default function appHeader() {

    const pathname = usePathname();

  useEffect(() => {
    const list = document.querySelectorAll(".nav__item");
    list.forEach((item) => {
      item.addEventListener("click", () => {
        list.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }, []);

  useEffect(() => {
    if(pathname === '/') {
      document
        .querySelectorAll(".nav__item")
        .forEach((it) => it.classList.remove("active"));
    }
  }, [pathname]);

  return (
    <nav className="bottom_bar">
      <div class="nav-box">
        <ul class="nav-container">
          {BottomBarlinks &&
            BottomBarlinks.map((navLink, idn) => (
              <li
                className={`nav__item ${navLink.isActive ? "active" : ""}`}
                key={navLink.url}
              >
                <Link href={navLink.url} class="nav__item-link">
                  <div class="nav__item-icon">
                    <span className="g-inline-block">
                      {navLink.alias}
                    </span>
                  </div>
                  <span class="nav__item-text">{navLink.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
