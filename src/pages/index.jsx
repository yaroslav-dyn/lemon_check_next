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

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main_page">
        <main className="container__limit">
          <div className="main__heading">
            <h1 className="h1_heading --color-primary" data-centered-text>
              Security & Tools
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

          <article className="main_content">
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
              an additional layer of security. Use a secret phrase to encode
              your passwords and ensure that only you can decrypt them.
              It&apos;s quick, easy, and safe. Start creating secure passwords
              and{" "}
              <Link className="--default-link" href="/crypto-password">
                encrypt
              </Link>{" "}
              them for maximum protection—all in one place!
            </p>
            <h3 className="--color-primary">
              For more information about us please visit{" "}
              <Link className="--base-color --default-link" href={"/about"}>
                page{" "}
              </Link>{" "}
              or If You need help You may find it on{" "}
              <Link className="--base-color --default-link" href={"/faq"}>
                FAQ{" "}
              </Link>{" "}
              <span>page</span>
            </h3>
          </article>

          {/* <article className="main_content">
            <div className="content-text">
              Are you tired of using the same password for all your online
              accounts? If so, then it&apos;s time to start using a secure
              password generator. A secure password generator is an online
              service that can help you create strong, unique passwords for each
              account <Link href="/password-generator">here</Link>.
            </div>
            <br />
            <div className="content-text">
              Using a secure password generator is essential in today&apos;s
              digital world as hackers are constantly trying to gain access to
              our personal information and accounts. With this tool, users can
              easily generate random strings of characters which make it much
              harder for anyone attempting unauthorized access into their
              accounts or data.
            </div>
          </article> */}
        </main>
      </div>
    </>
  );
}
