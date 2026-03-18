import Head from "next/head";
import Link from "next/link";
import React from "react";
import ContactEmail from "@/components/elements/contact_email.element";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>
          LockBoxApp | Privacy Policy - Strong Password Generator & Encryption
          Tools
        </title>
      </Head>

      <div className="main_content">
        <main className="container__limit">
          <h5 className="underline">Last Updated: November 21, 2024</h5>
          <div className="main__heading --small-bm">
            <h1 className="h1_heading pb1 lato-bold" data-centered-text>
              Privacy <span className="--color-primary">Policy</span>
            </h1>
          </div>

          <div className="content-text">
            <p>
              At{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBoxApp
              </Link>
              , we take your privacy seriously. This Privacy Policy outlines how
              we collect, use, and protect your personal information when you
              use our services, including the password generator, encryption
              tools, image-to-Base64 converter, alias generator, and QR code
              generator.
            </p>

            <ul className="list-reset">
              <li>
                <h2>1. Information We Collect</h2>
                <p>
                  We aim to limit the personal information we collect.
                  LockBoxApp does not collect, store, or share any personal data
                  unless explicitly provided by you for customer support or
                  communication purposes.
                </p>
                <ul className="list-reset">
                  <li>
                    <strong>Automatically Generated Data</strong>: When using
                    our password generator or encryption services, all password
                    and encryption-related activities happen locally on your
                    device. We do not have access to your passwords or encrypted
                    data.
                  </li>
                  <li>
                    <strong>User Data:</strong> We do not collect or store your
                    passwords, encryption phrases, or any other sensitive
                    information. All sensitive operations happen within your
                    device's environment and are not transmitted to our servers.
                  </li>
                  <li>
                    <strong>Local Storage for Passwords</strong>: We offer an
                    optional encrypted password storage feature, allowing users
                    to save encrypted passwords with aliases on their device.
                    This data is stored in IndexedDB within your browser,
                    meaning it remains on your device and is not accessible to
                    LockBoxApp or any third party. Please note that IndexedDB is
                    an experimental storage feature and may be subject to
                    limitations or data loss due to browser cache clearing or
                    other device issues.
                  </li>
                </ul>
              </li>
              <li>
                <h2>2. Use of Cookies</h2>
                <p>
                  {/* TODO: Check and edit then */}
                  Our service does not use cookies for tracking or marketing. We
                  store user preferences, such as theme selection (light/dark
                  mode), using local storage on the user's device. This data is
                  used solely to enhance the user experience and is not shared
                  with third parties or stored on our servers.
                  {/* purposes. However, if you use additional features like saving
                  data on your device (e.g., using localStorage or IndexedDB),
                  you may need to agree to use these features, which are solely
                  for enhancing your user experience. */}
                </p>
              </li>
              <li>
                <h2>3. How We Use Your Information</h2>
                <p>
                  We may collect non-personal usage statistics to improve our
                  services. This includes data on the number of users visiting
                  the site or using specific features, but it does not include
                  any personally identifiable information.
                </p>
              </li>
              <li>
                <h2>4. Data Security</h2>
                <h4>We prioritize the security of your information:</h4>
                <ul className="list-reset">
                  <li>We do not store any sensitive data on our servers.</li>
                  <li>
                    Passwords and secret phrases are processed locally on your
                    device to ensure that no one, including us, can access them.
                  </li>
                  <li>
                    The optional encrypted password storage remains on your
                    device in the IndexedDB database. Since this storage is
                    experimental, users should use it with caution and maintain
                    external backups of essential data.
                  </li>
                  <li>
                    Any communications you initiate with us (via email or other
                    means) are kept confidential and secure.
                  </li>
                </ul>
              </li>
              <li>
                <h2>5. Third-Party Services</h2>
                <p>
                  We do not share any user data with third-party services or
                  advertisers. However, some third-party services (e.g.,
                  Cloudflare for hosting) may be used for site functionality,
                  and they may collect anonymous usage statistics for their
                  purposes.
                </p>
                <p>
                  LockBoxApp integrates third-party services, including but not
                  limited to, the IP Geolocation service provided by{" "}
                  <Link className="--default-link" href={`https://ipwhois.io`}>
                    ipwhois.io
                  </Link>{" "}
                  This service is used to display location information based on
                  the IP addresses entered by users. While we use this service
                  to offer geolocation data, LockBoxApp does not control or
                  guarantee the accuracy of the data provided by "ipwhois.io".
                  By using our IP Geolocation Checker, you agree to the terms
                  and conditions of{" "}
                  <Link className="--default-link" href={`https://ipwhois.io`}>
                    ipwhois.io
                  </Link>
                  . You can find more details about their terms and privacy
                  policy{" "}
                  <Link
                    className="--default-link"
                    href={`https://ipwhois.io/terms`}
                    target="_blank"
                  >
                    here
                  </Link>
                  .
                </p>
              </li>
              <li>
                <h2>6. Image Features</h2>
                <p>
                  <strong>Image Processing</strong>: The watermarking and
                  converter features process all uploaded images locally within
                  your browser. This means that no images are uploaded, stored
                  or transferred to our servers at any point during the process.
                  All operations take place entirely on your device, ensuring
                  complete privacy and security of your data.
                </p>
              </li>
              <li>
                <h2>7. Your Consent</h2>
                <p>
                  By using our services, you agree to this Privacy Policy. If we
                  make any significant changes to our Privacy Policy, we will
                  update this page and notify users as required.
                </p>
              </li>
              <li>
                <h2>8. Contact Us</h2>
                <p>
                  If you have any questions or concerns about our Privacy Policy
                  or how your data is handled, please contact us at:
                </p>
              </li>
              <address>
                Email:{" "}
                <ContactEmail
                  email={`contact@lockboxapp@@com`}
                  title={`Contact email`}
                  isHidden
                />
                .
              </address>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};
export default Privacy;
