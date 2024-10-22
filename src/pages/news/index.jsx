import Head from "next/head";
import Link from "next/link";
import React from "react";
import LogoTextElement from "@/components/elements/logo_text.element";
import useDeviceType from "@/services/useDeviceType";

const NewsPage = () => {
  const mobileDevice = useDeviceType();
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
            <h1 className="h1_heading pb1 lato-bold center">
              News & <span className="--color-primary">Updates</span>
            </h1>
            <div className="center slogan__text">
              Stay informed about the latest improvements, <br /> new features,
              and plans for{" "}
              <Link href={"/"} className="--default-link --color-primary">
                LockBoxApp
              </Link>
              !
            </div>
          </div>
          <article className="content-text">
            <h2 className="mb0">
              October 22, 2024 – Dark/Light Theme Introduced
            </h2>
            <p>
              We’ve added support for both light and dark modes! Now, you can
              switch between themes to suit your preference, and the app will
              remember your choice for a seamless experience.
            </p>
          </article>
          <hr className="--base-divider --bg-primary mb2" />
          <article className="content-text">
            <h2 className="mb0">
              October 19, 2024 – Progressive Web App (PWA) Added
            </h2>
            <p>
              LockBoxApp is now a PWA! This means you can add it to your
              device’s home screen for quick access, and it will work offline
              once installed.
            </p>
          </article>
          <hr className="--base-divider --bg-primary mb2" />
          <article className="content-text mb2">
            <h2 className="mb0">October 18, 2024 – Service Launched</h2>
            <p>
              We’re excited to announce that LockBoxApp is officially live!{" "}
              <br />
              The app launched with the following features:
            </p>
            <ul className="list-reset">
              <li>
                <strong>Secure Password Generator</strong>: Easily create
                strong, unique passwords. Create QR codes for easy sharing.
              </li>
              <li>
                <strong>Password Encryption</strong>: Add an extra layer of
                security to your passwords with encryption.
              </li>
              <li>
                <strong>Image Converter to Base64</strong>: Quickly convert
                images to base64 format.
              </li>
              <li>
                <strong>QR Code Generator</strong>: Create QR codes for easy
                sharing.
              </li>
            </ul>
          </article>
          <hr className="--base-divider --bg-primary mt0 mb2" />

          <div className="flex__grid justify-between">
            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src="/assets/img/pixel_crypto.png"
              alt="pixel_crypto"
            />

            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src="/assets/img/pixel_crypto.png"
              alt="pixel_crypto"
            />

            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src="/assets/img/pixel_crypto.png"
              alt="pixel_crypto"
            />
          </div>
          <hr className="--base-divider --bg-primary mb2" />
          <article className="content-text">
            <h2 className="mb0">Upcoming Features (In Progress)</h2>
            <p>
              Here’s what{" "}
              <span className="--color-primary">we’re working </span>on next to
              improve your experience:
            </p>
            <ul className="list-reset">
              <li>
                <strong> Advanced File/Image Converter</strong>: Expanding the
                image converter with more file formats and advanced features.
              </li>
              <li>
                <strong>IP Geolocation Checker</strong>: Check the geolocation
                of an IP address with ease.
              </li>
              <li>
                <strong>Save Encrypted Passwords & Aliases</strong>: We’ll soon
                offer the ability to securely save encrypted passwords and
                aliases directly in your browser's IndexedDB.
              </li>
            </ul>
          </article>
          <hr className="--base-divider --bg-primary mb2" />
          <article className="content-text">
            <h2 className="mb0">What’s Next?</h2>
            <p>
              We’re always thinking about how to improve LockBoxApp and help you
              manage your digital security. <br />
              Stay tuned for regular updates as we continue to add more features
              and improve the user experience!
            </p>
          </article>
        </main>
      </div>
    </>
  );
};
export default NewsPage;
