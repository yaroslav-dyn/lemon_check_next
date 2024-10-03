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
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main_page">
        <main className="container__limit">
          <h1 className="main__heading --color-primary" data-centered-text>
            LemonCheck
          </h1>

          <article className="main_content">
            <p className="content-text">
              Are you tired of using the same password for all your online
              accounts? If so, then it&apos;s time to start using a secure
              password generator. A secure password generator is an online
              service that can help you create strong, unique passwords for each
              account <Link href="/password-generator">here</Link>.
            </p>

            <p className="content-text">
              {" "}
              Using a secure password generator is essential in today&apos;s
              digital world as hackers are constantly trying to gain access to
              our personal information and accounts. With this tool, users can
              easily generate random strings of characters which make it much
              harder for anyone attempting unauthorized access into their
              accounts or data.
            </p>
          </article>
        </main>
      </div>
    </>
  );
}
