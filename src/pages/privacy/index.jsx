import Head from "next/head";
import Link from "next/link";
import React from "react";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>LockBox: Privacy Policy</title>
        <meta name="keywords" content="LockBox Privacy Policy" />
        <meta name="description" content="LockBox Privacy Policy" />
        <meta name="title" content="LockBox Privacy Policy" />
      </Head>

      <div className="main_content">
        <main className="container__limit">
          <h5 className="underline">Last Updated: october 17, 2024</h5>
          <div className="main__heading --small-bm">
            <h1 className="h1_heading pb1 lato-bold" data-centered-text>
              Privacy <span className="--color-primary">Policy</span>
            </h1>
          </div>

          <div className="content-text">
            <p>
              At{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
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
                  We aim to limit the personal information we collect. LockBox
                  does not collect, store, or share any personal data unless
                  explicitly provided by you for customer support or
                  communication purposes.
                </p>
                <ul className="list-reset">
                  <li>
                    Automatically Generated Data: When using our password
                    generator or encryption services, all password and
                    encryption-related activities happen locally on your device.
                    We do not have access to your passwords or encrypted data.
                  </li>
                  <li>
                    User Data: We do not collect or store your passwords,
                    encryption phrases, or any other sensitive information. All
                    sensitive operations happen within your device's environment
                    and are not transmitted to our servers.
                  </li>
                </ul>
              </li>
              <li>
                <h2>2. Use of Cookies</h2>
                <p>
                  Our service does not use cookies for tracking or marketing
                  purposes. However, if you use additional features like saving
                  data on your device (e.g., using localStorage or IndexedDB),
                  you may need to agree to use these features, which are solely
                  for enhancing your user experience.
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
              </li>
              <li>
                <h2>Your Consent</h2>
                <p>
                  By using our services, you agree to this Privacy Policy. If we
                  make any significant changes to our Privacy Policy, we will
                  update this page and notify users as required.
                </p>
              </li>
              <li>7. Contact Us</li>
              <p>
                If you have any questions or concerns about our Privacy Policy
                or how your data is handled, please contact us at:
              </p>
              <address>
                Email:{" "}
                <Link href={`mailto:lemon-check@proton.me`}>
                  lemon-check@proton.me
                </Link>
              </address>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};
export default Privacy;
