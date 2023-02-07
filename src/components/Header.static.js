import React from 'react';
import Image from 'next/image'

export default function appHeader() {

  return (
    <header className="top__header">

     <nav className='main__nav'>
        <div className="logo_block">
          <a
            className="company_logo"
            href="/"
          >
            <Image className="base_img" src="/assets/img/logos/lemon_check__logo@2x.png" alt="lemonCheck" width="64" height="64" />
            <h2 className="brand__logo"><span>Lemon</span>Check</h2>
          </a>
        </div>

        <div className="main__nav__links">
          <a href="/password-generator">Password generator</a>
          <a href="/image-convertor">Image convertor</a>
        </div>
     </nav>
    </header>
  )

}//