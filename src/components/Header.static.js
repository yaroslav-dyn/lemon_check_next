import React, { useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import BottomBar from "@/components/bottom_bar.static";

export default function appHeader() {

  const logoSrc = "/assets/img/logos/lemon_check__logo@2x.png";
  const newLogo = "/assets/img/logos/lc_dally_logo@3x.png";


  return (
    <header className="top__header">
      <nav className="main__nav">
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

        <div className="main__nav__links show__desktop">
          <Link href="/password-generator">Password generator</Link>
          <Link href="/allias-generator">Allias generator</Link>
          <Link href="/image-convertor">Image convertor</Link>
          <Link href="/qr-generator">QR generator</Link>
        </div>

        <div className="show__mobile">
          <BottomBar />
        </div>
      </nav>
    </header>
  );

}//