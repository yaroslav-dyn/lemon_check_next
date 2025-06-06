import React from "react";
import Head from "next/head";
import Link from "next/link";
import LogoTextElement from "@/components/elements/logo_text.element"
import useDeviceType from "@/services/useDeviceType";

export default function Home() {

const isMobile = useDeviceType();

  return (
    <>
      <Head>
        <title>
          LockBoxApp | Home - Strong Password Generator & Encryption Tools
        </title>
      </Head>

      <div className="main_page main__content">
        <main className="container__limit">
          {/* Hero Section */}
          <section className="main__heading --small-bm">
            <LogoTextElement />
            <h1 className="center slogan__text">
              Your All-in-One Tool
              <br className={isMobile ? '' : 'hidden'} /> {/* Use CSS to hide on non-mobile */}
              for Secure Passwords, Encryption,
              <br />
              and Digital Utilities
            </h1>
            {/* Optional: Add a Call to Action Button here */}
            {/* <button className="cta-button">Get Started</button> */}
          </section>

          {/* Our Tools / Features Section */}
          <section className="features-section content__gaps">
            <h2 className="center --color-primary">Our Tools & Features</h2>
            <div className="content-text"> {/* Keep content-text for paragraphs */}
              <p>
                Are you tired of using the same password for all your online
                accounts? If so, it's time to start using a secure password
                generator! Our service helps you create strong, unique passwords
                for each account in{" "}
                <Link className="--default-link" href="/password-generator">
                  just a few clicks
                </Link>
                .
              </p>
              <p>
                But that's not all! You can also encrypt your passwords with
                an additional layer of security. Use a secret phrase to encrypt
                your passwords and ensure that only you can decrypt them.
                It's quick, easy, and safe. Start creating secure passwords
                and{" "}
                <Link className="--default-link" href="/crypto-password">
                  encrypt
                </Link>{" "}
                them for maximum protection—all in one place!
              </p>
              <p>
                Simplify Your Digital Security & Tools Strengthen your online
                presence with our all-in-one service! From generating strong,
                secure passwords to encrypting them with ease, we've got you
                covered. Need more? Convert images to Base64 for seamless data
                handling or create custom QR codes in a flash. Everything you need
                to stay secure and efficient in one place!
              </p>
            </div>
          </section>

          {/* About Section */}
          <section className="about-section content__gaps">
             <h2 className="center m0 --color-primary">About LockBoxApp</h2> {/* Renamed heading */}
             <div className="content-text">
              <p> {/* Content from the original "Simplify Your Digital!" section */}
                Security & Tools with Strengthen your online presence with our
                all-in-one service! From generating strong, secure passwords to
                encrypting them with ease, we've got you covered. Need more?
                Convert images to Base64 for seamless data handling or create
                custom QR codes in a flash. Everything you need to stay secure
                and efficient in one place!
              </p>
             </div>
          </section>

          {/* PWA Section */}
          <section className="pwa-section content__gaps">
            <h2 className="center m0 --color-primary">
              Install <span className="--color-primary">LockBoxApp</span> as a{" "}
              <span className="--color-primary">PWA</span>
            </h2>
            <div className="content-text">
              <p>
                For Easy Access! Did you know you can install LockBoxApp directly
                to your device for quick and easy access? With our Progressive Web
                App (PWA) feature, you can use LockBoxApp just like a native app,
                without the need for downloads from an app store. Fast Access:
                Launch LockBoxApp instantly from your home screen. Offline
                Capability: Some features are available even without an internet
                connection. No Updates Needed: Always have the latest version,
                automatically. To install, simply click the "Add to Home Screen"
                option in your browser’s settings and enjoy LockBoxApp anytime,
                anywhere!
              </p>
            </div>
          </section>

          {/* More Info / Links Section */}
          <section className="links-section content__gaps">
            <h2 className="center m0 --color-primary">Learn More</h2> {/* Added a heading */}
            <div className="content-text --color-primary mb0 pt2 pb4">
              <p> {/* Content from the final paragraph */}
                Want to learn more about what we do? Visit our{" "}
                <Link className="--color-base --default-link" href={"/about"}>
                  About
                </Link>{" "}
                and {" "}
                <Link className="--color-base --default-link" href={"/news"}>
                  News & updates
                </Link>{" "}
                pages! Have questions? Check out our{" "}
                <Link className="--color-base --default-link" href={"/faq"}>
                  FAQ{" "}
                </Link>{" "}
                for answers and tips!
              </p>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
