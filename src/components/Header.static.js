import React, { useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import BottomBar from "@/components/bottom_bar.static";
import { usePathname } from "next/navigation";
import { isMobile } from 'react-device-detect';


export const BottomBarlinks = [
  {
    title: "Password generator",
    url: "/password-generator",
    alias: "PG",
    isActive: false,
  },
  {
    title: "Encode Password",
    url: "/crypto-password",
    alias: "EG",
    isActive: false,
  },
  {
    title: "Allias generator",
    url: "/allias-generator",
    alias: "AG",
    isActive: false,
  },
  {
    title: "image-convertor",
    url: "/image-convertor",
    alias: "IC",
    isActive: false,
  },
  {
    title: "QR generator",
    url: "/qr-generator",
    alias: "QR",
    isActive: false,
  },
];


export default function AppHeader() {

  const logoSrc = "/assets/img/logos/lemon_check__logo@2x.png";
  const newLogo = "/assets/img/logos/lc_dally_logo@3x.png";

    const pathname = usePathname();

      const onClikNavItem = (alias) => {
        BottomBarlinks.forEach((itm) =>
          itm.alias === alias ? (itm.isActive = true) : (itm.isActive = false)
        );
      };

    useEffect(() => {
      document.querySelectorAll(".nav__item").forEach((it) => {
        if (pathname === "/") {
          it.classList.remove("active");
        }
        if (it.dataset.url === pathname) {
          it.classList.add("active");
        } else {
          it.classList.remove("active");
        }
      });
    }, [pathname]);


  return (
    <header className="top__header">
      <nav>
        <div className="main__nav">
          <div className="logo_block">
            <Link className="company_logo" href="/">
              <Image
                className="base_img"
                src={newLogo}
                alt="lemonCheck"
                width="64"
                height="64"
              />
              {/* <h2 className="brand__logo"><span>Lemon</span>Check</h2> */}
            </Link>
          </div>

          <div className="show__desktop">
            <div className="main__nav__links">
              {BottomBarlinks &&
                BottomBarlinks.map((navLink) => (
                  <div
                    className={`nav__item ${isMobile ? "mobile" : "desktop"} ${
                      navLink.isActive ? "active" : ""
                    }`}
                    key={navLink.url}
                    data-url={navLink.url}
                    onClick={() => onClikNavItem(navLink.alias)}
                  >
                    <Link href={navLink.url}>{navLink.title}</Link>
                  </div>
                ))}
            </div>
          </div>

          <div className="show__mobile">
            <BottomBar />
          </div>
        </div>
      </nav>
    </header>
  );

}//