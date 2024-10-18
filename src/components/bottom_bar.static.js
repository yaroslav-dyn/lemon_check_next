import Link from "next/link";
import React, { useEffect } from "react";
import { BottomBarlinks } from "@/components/Header.static";


export default function BottomBar() {

  const onClikNavItem = (alias) => {
    BottomBarlinks.forEach((itm) =>
      itm.alias === alias ? (itm.isActive = true) : (itm.isActive = false)
    );
  };


  return (
    <div className="bottom_bar">
      <div className="nav-box">
        <ul className="nav-container">
          {BottomBarlinks &&
            BottomBarlinks.map((navLink) => (
              <li
                onClick={() => onClikNavItem(navLink.alias)}
                className={`nav__item ${navLink.isActive ? "active" : ""}`}
                key={navLink.url}
                data-url={navLink.url}
              >
                <Link href={navLink.url} className="nav__item-link">
                  <div className="nav__item-icon">
                    {navLink.icon ? (
                      <img src={navLink.icon} className="nav__item-icon--img" />
                    ) : (
                      <span className="inline-block">{navLink.alias}</span>
                    )}
                  </div>
                  <span className="nav__item-text">{navLink.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
