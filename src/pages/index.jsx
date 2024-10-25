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
          <div className="main__heading --small-bm">
            <LogoTextElement />
            <div className="center slogan__text">
              Your All-in-One Tool {isMobile && <br />}
              for Secure Passwords, Encryption, <br />
              and Digital Utilities
            </div>
          </div>
          <div className="content__gaps">
            <div className="content-text">
              <h3 className="m0 --color-primary">Simplify Your Digital!</h3>
              <p>
                Security & Tools with Strengthen your online presence with our
                all-in-one service! From generating strong, secure passwords to
                encrypting them with ease, we’ve got you covered. Need more?
                Convert images to Base64 for seamless data handling or create
                custom QR codes in a flash. Everything you need to stay secure
                and efficient in one place!
              </p>
            </div>
          </div>
          <article className="content__gaps">
            <p className="content-text">
              Are you tired of using the same password for all your online
              accounts? If so, it&apos;s time to start using a secure password
              generator! Our service helps you create strong, unique passwords
              for each account in{" "}
              <Link className="--default-link" href="/password-generator">
                just a few clicks
              </Link>
              .
            </p>
            <p className="content-text">
              But that&apos;s not all! You can also encrypt your passwords with
              an additional layer of security. Use a secret phrase to encrypt
              your passwords and ensure that only you can decrypt them.
              It&apos;s quick, easy, and safe. Start creating secure passwords
              and{" "}
              <Link className="--default-link" href="/crypto-password">
                encrypt
              </Link>{" "}
              them for maximum protection—all in one place!
            </p>
            <p className="content-text">
              Simplify Your Digital Security & Tools Strengthen your online
              presence with our all-in-one service! From generating strong,
              secure passwords to encrypting them with ease, we’ve got you
              covered. Need more? Convert images to Base64 for seamless data
              handling or create custom QR codes in a flash. Everything you need
              to stay secure and efficient in one place!
            </p>
            <h3 className="m0 --color-primary">
              Install <span className="--color-primary">LockBoxApp</span> as a{" "}
              <span className="--color-primary">PWA</span>
            </h3>
            <p className="content-text">
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
            <p className="content-text --color-primary mb0 pt2 pb4">
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
          </article>
        </main>
      </div>
    </>
  );
}






