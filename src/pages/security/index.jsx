import Head from "next/head";
import Link from "next/link";
import React from "react";
import ContactEmail from "@/components/elements/contact_email.element";

const Security = () => {
  return (
    <>
      <Head>
        <title>
          LockBox | Security at LockBox - Strong Password Generator & Encryption
          Tools
        </title>
      </Head>

      <div className="main_content">
        <main className="container__limit">
          <div className="main__heading --small-bm">
            <h1 className="h1_heading pb1 lato-bold" data-centered-text>
              <span className="--color-base">Security</span> at{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>{" "}
            </h1>
          </div>

          <section className="content-text">
            <p>
              At{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>
              , we take your privacy and security seriously. Below is a summary
              of our current security practices to protect your information and
              data.
            </p>

            <ul className="list-reset">
              <li>
                <p>
                  1.<strong> No Password Storage</strong> LockBox does not store
                  any passwords or sensitive information. All password
                  generation and encryption occur directly on your device,
                  meaning no data is transmitted to our servers. This ensures
                  that your passwords and sensitive data remain under your
                  control at all times.
                </p>
              </li>
              <li>
                <p>
                  <strong>2. Password Encryption</strong> When using our
                  <strong>
                    <strong>Password Encryption</strong> When using our Password
                    Encryption
                    <strong>Password Encryption</strong> When using our
                  </strong>{" "}
                  feature, your passwords are encrypted using asecret phrase.
                  This encryption happens locally in your browser, and LockBox
                  does not store or have access to the secret phrase or
                  encrypted passwords.
                </p>
              </li>
              <li>
                <p>
                  3. Data Protection Since LockBox currently does not save any
                  data, there is no risk of data breaches or unauthorized access
                  to your passwords. All processing is done on the client side,
                  ensuring your data stays secure on your own device.
                </p>
              </li>
              <li>
                <p>
                  4. Future Security Features We are committed to continually
                  improving security as we introduce new features. In the
                  future, we plan to offer an optional feature to save encrypted
                  passwords and aliases locally on your device using IndexedDB,
                  a secure, browser-based storage solution. Even then, all data
                  will remain encrypted and stored locally, ensuring that your
                  sensitive information never leaves your device.
                </p>
              </li>
              <li>
                <p>
                  5. <strong>HTTPS Encryption </strong>Our entire platform
                  operates over a secure HTTPS connection. This encryption
                  ensures that any communication between your browser and our
                  service is safe from interception.
                </p>
              </li>
              <li>
                <p>
                  6. User Responsibility We encourage users to follow best
                  practices, such as:
                </p>
                <p>
                  Keeping your secret phrases confidential. Regularly updating
                  your passwords. Using a strong and unique password for each of
                  your accounts.
                </p>
              </li>
              <li>
                <p>
                  7. Transparency{" "}
                  <Link className="--default-link" href={`/`} target="_blank">
                    LockBox
                  </Link>{" "}
                  will always keep users informed about any changes to our
                  security practices. As we add new features, we will update
                  this page to reflect how they impact your data security.
                </p>
              </li>
            </ul>

            <h2>Important Reminder</h2>

            <p>
              When using{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>{" "}
              to generate and encrypt your passwords, it's critical to remember
              your secret phrase and store your encrypted passwords safely.
            </p>

            <p>
              Since{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>{" "}
              does not save or store any data, if you lose your secret phrase or
              encrypted password string, it will be impossible to recover the
              original password. To avoid being locked out of your accounts, we
              strongly recommend:
            </p>

            <p>
              Setting up a recovery method (such as an email, phone number, or
              security questions) with any online service where you are using
              encrypted passwords. Backing up your encrypted password strings
              securely. Using a password manager to store both your encrypted
              passwords and the secret phrases used to encrypt them. Taking
              these extra steps will help ensure that you can regain access to
              your accounts if you forget your secret phrase.
            </p>

            <div>
              For questions or concerns about your security while using{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>
              , feel free to reach out to us at{" "}
              <address>
                Email:{" "}
                <ContactEmail
                  email={`contact@lockboxapp@@com`}
                  title={`Contact email`}
                  isHidden
                />
              </address>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
export default Security;
