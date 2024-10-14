import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Home() {
  //NOTE: HTML
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="description" content="LemonCheck" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,700;1,900 display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="main_page main__content">
        <main className="container__limit">
          <div className="main__heading">
            <h1 className="h1_heading" data-centered-text>
              <span className="--color-primary">Security</span> &{" "}
              <span className="--color-primary">Tools</span>
            </h1>
          </div>
          <div className="content__gaps">
            <p className="content-text">
              Simplify Your Digital{" "}
              <Link className="--default-link" href={"/"}>
                LemonCheck
              </Link>{" "}
              Security & Tools with Strengthen your online presence with our
              all-in-one service! From generating strong, secure passwords to
              encrypting them with ease, we’ve got you covered. Need more?
              Convert images to Base64 for seamless data handling or create
              custom QR codes in a flash. Everything you need to stay secure and
              efficient in one place!
            </p>
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

            <h3 className="--color-primary m0 pt2 pb3">
              For more information about us please{" "}
              <Link className="--color-base --default-link" href={"/about"}>
                visit{" "}
              </Link>
              or If You need help You may find it on{" "}
              <Link className="--color-base --default-link" href={"/faq"}>
                FAQ{" "}
              </Link>{" "}
              <span>page</span>
            </h3>
          </article>
        </main>
      </div>
    </>
  );
}
