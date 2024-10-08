import Head from "next/head";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="description" content="About LemonCheck" />
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
              Frequency Asked Questions
            </h1>
          </div>

          <article className="main_content">
            <section className="content-text">
              <h2 className="--color-primary">
                How to Use the Password Generator:
              </h2>

              <p>
                Set Password Length: Use the length slider to choose how many
                characters your password should have.
              </p>
              <p>
                Special Characters: Check or uncheck the box to include or
                exclude special characters (e.g., @, #, $) in your password.
              </p>
              <p>
                Copy Password: Once the password is generated, simply click the
                password field, and it will automatically be copied to your
                clipboard!
              </p>
            </section>

            <section className="content-text">
              <h2 className="--color-primary">
                How I can encrypt my password ?
              </h2>
              <br />
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
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
