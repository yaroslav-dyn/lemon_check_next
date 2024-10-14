import Head from "next/head";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="description" content="About LemonCheck" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main_page">
        <main className="container__limit">
          <div className="main__heading">
            <h1 className="h1_heading --color-primary" data-centered-text>
              LemonCheck
            </h1>
          </div>

          <article className="main_content">
            <section className="content-text">
              <h2>
                <Link
                  className="text-decoration-none"
                  href="/password-generator"
                >
                  Strong Password{" "}
                </Link>
              </h2>
              <p>
                Are you tired of using the same password for all your online
                accounts? If so, then it&apos;s time to start using a secure
                password generator. A secure password generator is an online
                service that can help you create strong, unique passwords for
                each account <Link href="/password-generator">here</Link>.
              </p>
              <p>
                Using a secure password generator is essential in today&apos;s
                digital world as hackers are constantly trying to gain access to
                our personal information and accounts. With this tool, users can
                easily generate random strings of characters which make it much
                harder for anyone attempting unauthorized access into their
                accounts or data.
              </p>
            </section>

            <section className="content-text">
              <h2>
                <Link className="text-decoration-none" href="/crypto-password">
                  Password Encryption
                </Link>
              </h2>
              <p>
                In today's digital world, keeping your accounts safe requires
                more than just a strong password. That’s why we offer Password
                Encryption, a feature designed to provide an extra layer of
                security for your sensitive information.
              </p>

              <p>
                Take Your Password Security to the Next Level with Encryption
                Why settle for just a strong password when you can add an extra
                layer of security? With our Password Encryption feature, you can
                protect your sensitive information like never before. Simply use
                a secret phrase to encrypt your passwords, ensuring that only
                you can unlock them. Keep your accounts safe from prying
                eyes—start encrypting your passwords today for maximum security
                and peace of mind!
              </p>
            </section>

            {/* <section className="content-text">
              <h2>Password Encryption </h2>
              <p>
                In today's digital world, keeping your accounts safe requires
                more than just a strong password. That’s why we offer Password
                Encryption, a feature designed to provide an extra layer of
                security for your sensitive information.
              </p>
              <h3>How it works:</h3>

              <h3> Password Creation:</h3>
              <p>
                You start by entering a password you wish to protect. This can
                be a password you've generated using our secure password
                generator or a custom password you've created.
              </p>

              <h3> Secret Phrase: </h3>
              <p>
                To encrypt your password, you provide a unique secret phrase.
                This phrase acts as a key, and only with this key can your
                password be decrypted. It's important to choose a phrase that's
                memorable for you but difficult for others to guess.
              </p>

              <h3> Encryption Process: </h3>
              <p>
                When you input your password and secret phrase, our system
                combines them and uses advanced encryption algorithms to
                generate an encrypted version of your password. This encrypted
                output is a secure, unreadable format that can only be decoded
                with the correct secret phrase.
              </p>

              <h3> Decryption: </h3>
              <p>
                If you ever need to retrieve the original password, simply input
                the same secret phrase. The system will decrypt the encrypted
                data back into your password, allowing you access to your secure
                information.
              </p>

              <h3> Why Encryption Matters:</h3>
              <p>
                Encryption ensures that even if someone gains access to your
                encrypted data, they cannot read or use your password without
                the secret phrase. This adds an additional defense against
                hackers, phishing attacks, and unauthorized access.
              </p>

              <h3> By using our Password</h3>
              <p>
                Encryption feature, you’re taking a proactive step in
                safeguarding your online accounts, providing both convenience
                and peace of mind. Combine encryption with unique passwords for
                the highest level of protection!
              </p>
            </section> */}
          </article>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
