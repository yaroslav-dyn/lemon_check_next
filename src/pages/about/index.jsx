import Head from "next/head";
import Link from "next/link";
import React from "react";
import LogoTextElement from "@/components/elements/logo_text.element";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>
          LockBoxApp | About LockBoxApp - Strong Password Generator & Encryption
          Tools
        </title>
      </Head>

      <div className="main_content">
        <main className="container__limit">
          <div className="main__heading --small-bm">
            <LogoTextElement prefix="About" />
          </div>
          {/* <article>
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

              <section className="content-text">
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
            </section>
          </article> */}
          <article>
            <div className="content-text">
              <h2 className="mt0">
                <Link
                  className="text-decoration-none"
                  href="/password-generator"
                >
                  Strong Password Generator
                </Link>
              </h2>
              <p>
                In a world where cyber threats are becoming more sophisticated
                every day, protecting your online accounts with strong, unique
                passwords is crucial. Our Strong Password Generator is designed
                to help you create random, secure passwords with just a click—no
                more using the same password across multiple accounts.
              </p>

              <p>
                By generating complex combinations of letters, numbers, and
                symbols, our tool makes it much harder for hackers to guess or
                crack your passwords. Whether you're securing your email, social
                media, or financial accounts, a strong password is your first
                line of defense.
              </p>
            </div>

            <div className="content-text">
              <h2>
                <Link className="text-decoration-none" href="/crypto-password">
                  Password Encryption
                </Link>
              </h2>

              <p>
                Passwords alone aren’t enough anymore. With our Password
                Encryption feature, you can take your security a step further.
                We help you protect your sensitive data by encrypting your
                passwords with a secret phrase—ensuring that only you can
                decrypt and access them.
              </p>

              <p>
                This added layer of encryption means that even if someone were
                to gain access to your encrypted password, it would be useless
                without your unique secret phrase. Safeguard your private
                information and enhance your security with our easy-to-use
                encryption tool.
              </p>

              <h2>
                <Link className="text-decoration-none" href="/">
                  Why Choose LockBoxApp?
                </Link>
              </h2>

              <div>
                At LockBoxApp, we’re dedicated to providing you with the best
                tools to secure your digital life. With our{" "}
                <Link
                  href={`/password-generator`}
                  className="--default-link bold"
                  target="_blank"
                >
                  {" "}
                  <span className="--color-primary"> Password Generator,</span>
                </Link>{" "}
                <Link
                  href={`/crypto-password`}
                  className="--default-link bold"
                  target="_blank"
                >
                  <span className="--color-base">Password Encryption</span>
                </Link>
                ,{" "}
                <Link
                  href={`/image-converter`}
                  className="--default-link bold"
                  target="_blank"
                >
                  <span className="--color-primary">
                    Image to Base64 Converter
                  </span>
                </Link>
                ,{" "}
                <Link
                  href={`/allias-generator`}
                  className="--default-link bold"
                  target="_blank"
                >
                  <span className="--color-base">Alias Generator, </span>
                </Link>
                and{" "}
                <Link
                  href={`/qr-generator`}
                  className="--default-link bold"
                  target="_blank"
                >
                  <span className="--color-primary">QR Code Generator</span>
                </Link>
                ,{" "}
                <Link
                  href={`/ip-checker`}
                  className="--default-link bold"
                  target="_blank"
                >
                  <span className="--color-base">IP Checker</span>
                </Link>
                , we offer everything you need to strengthen your online
                security and simplify your digital tasks.
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
