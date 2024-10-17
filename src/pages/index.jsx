import React from "react";
import Head from "next/head";
import Link from "next/link";
import useDeviceType from "@/services/useDeviceType";

export default function Home() {
  
const isMobile = useDeviceType();

  return (
    <>
      <Head>
        <title>LockBox</title>
        <meta name="description" content="LockBox" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main_page main__content">
        <main className="container__limit">
          <div className="main__heading --small-bm">
            <h1 className="h1_heading pb1 lato-bold" data-centered-text>
              <span className="--color-primary">L</span>
              <span className="--color-base">ock</span>
              <span className="--color-primary">B</span>
              <span className="--color-base">ox</span>
            </h1>
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

            <p className="content-text --color-primary mb0 pt2 pb4">
              Want to learn more about what we do? Visit our{" "}
              <Link className="--color-base --default-link" href={"/about"}>
                About
              </Link>{" "}
              page!
              Have questions? Check out our{" "}
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
