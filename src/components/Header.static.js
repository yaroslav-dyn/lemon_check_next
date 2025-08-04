import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BottomBar from "@/components/bottom_bar.static";
import { usePathname } from "next/navigation";
import useDeviceType from "@/services/useDeviceType";
import useScrollPosition from "@/services/useScrollPosition";
import SchemaSelectorElement from "@/components/elements/scema_selector.element";
import {Tooltip} from "react-tooltip";


const newLogo = "/assets/img/logos/lc_dally_logo@3x.png";


export const BottomBarlinks = [
  // {
  //   title: "Home",
  //   url: "/",
  //   alias: "H",
  //   isActive: false,
  //   icon: "/assets/img/icons8-home-48.png",
  // },
  {
    title: "Password generator",
    url: "/password-generator",
    alias: "PG",
    isActive: false,
    icon: "/assets/img/icons8-binary-lock-48.png",
  },
  {
    title: "Encrypt Password",
    url: "/crypto-password",
    alias: "EP",
    isActive: false,
    icon: "/assets/img/icons8-security-aes-48.png",
  },
  {
    title: "IP Checker",
    url: "/ip-checker",
    alias: "IP",
    isActive: false,
    icon: "/assets/icons/icons8-ip-48.png",
  },
  {
    title: "Allias generator",
    url: "/allias-generator",
    alias: "AG",
    isActive: false,
    icon: "/assets/img/icons8-name-48.png",
    hideMain: true
  },
  {
    title: "Image operations",
    url: "/image-converter",
    alias: "IC",
    isActive: false,
    icon: "/assets/img/icons8-image-refresh-48.png",
  },
  {
    title: "Watermark",
    url: "/image-converter/watermark",
    alias: "WM",
    isActive: false,
    icon: "/assets/icons/easy-watermark-svgrepo-com.svg",
    hideMain: true
  },
  {
    title: "Text",
    url: "/text-formatter",
    alias: "TF",
    isActive: false,
    icon: "/assets/img/basic-text-format.svg",
    hideMain: false
  },
  {
    title: "QR generator",
    url: "/qr-generator",
    alias: "QR",
    isActive: false,
    icon: "/assets/img/icons8-qrcode-64.png",
  },
];


const infoIcon = "/assets/icons/icons8-info-48-white.png";
const FaqIcon = "/assets/icons/icons8-faq-48.png";
const newsIcon = "/assets/icons/icons8-message-64-white.png";

export default function AppHeader({ changeSchema }) {
  const [tabletScreen, setTableteScreen] = useState(false);

  const isMobile = useDeviceType();
  const pathname = usePathname();
  const scrollPosition = useScrollPosition();
  const topHeaderElement = useRef(null);


  const filteredLinks = useMemo(
    () => BottomBarlinks.filter((bl) => bl && !bl.hideMain)
  );

  const onClikNavItem = (alias) => {
    BottomBarlinks.forEach((itm) =>
      itm.alias === alias ? (itm.isActive = true) : (itm.isActive = false)
    );
  };

  const setActiveMenu = () => {
    BottomBarlinks &&
      BottomBarlinks.map((it) => {
        if (it.url === pathname) {
          it.isActive = true;
        } else {
          it.isActive = false;
        }
      });
    document.querySelectorAll(".nav__item").forEach((it) => {
      if (it.dataset.url === pathname) {
        it.classList.add("active");
      } else {
        it.classList.remove("active");
      }
    });
  };

  useEffect(() => {
    setTimeout(setActiveMenu, 100);
    setTableteScreen(window.innerWidth <= 1180);
  }, [pathname]);

  useEffect(() => {
    const pageIcons = document.querySelectorAll(".instruction_info_icon");
    const themeIcons = document.querySelectorAll(".lb__theme_icon");
    if (!topHeaderElement || !topHeaderElement.current) return;
    if (isMobile && scrollPosition > 70) {
      topHeaderElement.current.classList.add("scrolled");
      if (!pageIcons || pageIcons.length < 1) return;
      pageIcons.forEach((i) => i.classList.add("scrolled"));
      if (!themeIcons || themeIcons.length < 1) return;
      themeIcons.forEach((l) => l.classList.add("scrolled"));
    } else {
      topHeaderElement.current.classList.remove("scrolled");
      if (!pageIcons || pageIcons.length < 1) return;
      pageIcons.forEach((i) => i.classList.remove("scrolled"));
      if (!themeIcons || themeIcons.length < 1) return;
      themeIcons.forEach((l) => l.classList.remove("scrolled"));
    }
  }, [scrollPosition]);

  return (
    <header ref={topHeaderElement} className="top__header">
      <nav>
        <div className="main__nav">
          <div className="logo_block">
            <Link className="company_logo" href="/">
              <Image
                className="base_img"
                src={newLogo}
                alt="LockBoxApp"
                width="74"
                height="74"
              />
              {/* <h2 className="brand__logo"><span>Lemon</span>Check</h2> */}
            </Link>
          </div>

          {!isMobile && !tabletScreen ? (
            <div className="main__nav__links">
              {filteredLinks &&
                filteredLinks.map((navLink) => (
                  <div
                    className={`nav__item ${isMobile ? "mobile" : "desktop"} ${
                      navLink.isActive ? "active" : ""
                    }`}
                    key={navLink.url}
                    data-url={navLink.url}
                    onClick={() => onClikNavItem(navLink.alias)}
                  >
                    <Link className="nav__item__link" href={navLink.url}>
                      <div className="flex__grid align-center --extra_small-gap">
                        <img
                          src={navLink.icon}
                          className="nav__item-icon--img --desktop show__desktop"
                        />
                        <span>{navLink.title}</span>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          ) : (
            <BottomBar />
          )}
          <div
            className={`flex__grid align-center ${
              !isMobile ? "--small-gap" : "--extra_small-gap"
            }`}
          >
            <div id="color-schema_anchor">
              <SchemaSelectorElement onChangeTheme={changeSchema} />
            </div>
            <div>
              <div className="flex__grid --extra_small-x-gap">
                <Link
                  id="about_anchor"
                  href="/about"
                  className={`instruction_info_icon colored 
                    ${!isMobile ? "mr1" : "mr0.5"}
                    ${pathname === "/about" ? "active" : ""}`}
                >
                  <img src={infoIcon} width={40} />
                </Link>
                <Link
                  id="faq_anchor"
                  href="/faq"
                  className={`instruction_info_icon colored ${
                    !isMobile ? "mr1" : "mr0.5"
                  } ${pathname === "/faq" ? "active" : ""}`}
                >
                  <img src={FaqIcon} width={40} />
                </Link>
                <Link
                  id="news_anchor"
                  href="/news"
                  className={`instruction_info_icon colored ${
                    pathname === "/news" ? "active" : ""
                  }`}
                >
                  <img src={newsIcon} width={40} />
                </Link>
                <Tooltip
                  anchorSelect="#news_anchor"
                  content="News & Updates"
                  place="bottom-start"
                />
                <Tooltip
                  anchorSelect="#faq_anchor"
                  content="FAQ"
                  place="bottom-start"
                />
                <Tooltip
                  anchorSelect="#about_anchor"
                  content="About"
                  place="bottom-start"
                />
                <Tooltip
                  anchorSelect="#color-schema_anchor"
                  content="Switch color modes"
                  place="bottom-start"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
} //
