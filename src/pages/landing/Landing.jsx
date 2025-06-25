import React from "react";
import Link from "next/link";
import ContactEmail from "@/components/elements/contact_email.element";
import useDeviceType, { useTabletType } from "@/services/useDeviceType";

const Landing = () => {
  const isMobile = useDeviceType();
  const tabletDevice = useTabletType();

  return (
    <main className="bg-white landing-page-container">

      {/*SECTION: Hero Section */}
      <div className="hero-gradient px2 py4 center relative overflow-hidden">
        <div className="hero-bg-elements"></div>

        <div className="max-width-4 mx-auto relative z-index-2 px2">
          <h1 className="hero-title mb3 center">
            Your All-in-One Tool for Digital Security
          </h1>
          <p className="hero-subtitle mb4 center">
            Secure Passwords, Encryption, and Digital Utilities
          </p>
          <div className="center mb4">
            <Link href="/password-generator" className="btn btn-primary btn-modern btn-big">Get Started</Link>
          </div>
        </div>
      </div>

      {/*SECTION Features Section */}
      <section className="px2 py4 bg-light-gray">
        <div className="mx-auto">
          <div className="section-header center mb4">
            <h2 className="section-title mb2">Powerful Features</h2>
          </div>

          <div className="flex flex-wrap">

            <div className={`${tabletDevice ? 'col-6' : 'col-12 sm-col-12 md-col-3'} px2 mb3`}>
              <Link href='/password-generator' className="feature-card cursor-pointer-screen block">
                <div data-centered-text>
                  <div className="feature-icon mb2">💡</div>
                </div>
                <h3 className="feature-title mb2">Secure Password Generator</h3>
                <p className="feature-description">Create strong, unique passwords for every account with ease.</p>
                <p className="feature-card__action --default-link">Start using</p>
              </Link>
            </div>
            <div className={`${tabletDevice ? 'col-6' : 'col-12 sm-col-12 md-col-3'} px2 mb3`}>
              <Link href='/ip-checker' className="feature-card cursor-pointer-screen block">
                <div data-centered-text><div className="feature-icon mb2">📍</div></div>
                <h3 className="feature-title mb2">IP Geolocation Checker</h3>
                <p className="feature-description">Easily find the physical location of any IP address with our IP Geolocation Checker. Get details like country, city, latitude, longitude, and more. Completely free and fast.</p>
                <p className="feature-card__action --default-link">Start using</p>
              </Link>
            </div>
            <div className={`${tabletDevice ? 'col-6' : 'col-12 sm-col-12 md-col-3'} px2 mb3`}>
              <Link href='/image-converter' className="feature-card cursor-pointer-screen block">
                <div data-centered-text>
                <div className="feature-icon mb2">🛠️</div></div>
                <h3 className="feature-title mb2">Digital Utilities</h3>
                <p className="feature-description">Convert images to Base64, generate QR codes, and more.</p>
                <p className="feature-card__action --default-link">Start using</p>
              </Link>
            </div>
            <div className={`${tabletDevice ? 'col-6' : 'col-12 sm-col-12 md-col-3'} px2 mb3`}>
              <Link href='/image-converter/watermark' className="feature-card cursor-pointer-screen block">
                <div data-centered-text><div className="feature-icon mb2">🖼️</div></div>
                <h3 className="feature-title mb2">Image Watermark Editor</h3>
                <p className="feature-description">Protect and personalize your images with custom watermarks.</p>
                <p className="feature-card__action --default-link">Start using</p>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/*SECTION: About Section */}
      <section className="px2 py4 bg-white py4">
        <div className="max-width-3 mx-auto">
          <div className="section-header center mb4">
            <h2 className="section-title mb2">About LockBoxApp</h2>
          </div>
          <div className="center">
            <p className="section-subtitle">
              LockBoxApp is designed to enhance your digital security by providing
              easy-to-use tools for password generation, encryption, and other
              useful utilities. Our goal is to help you stay secure and efficient
              in the digital world.
            </p>
          </div>
        </div>
      </section>


      {/*SECTION: PWA Section */}
      <section className="px2 py4 bg-light-gray">
        <div className="max-width-3 mx-auto">
          <div className="section-header center mb4">
            <h2 className="section-title mb2">Install LockBoxApp as a PWA</h2>
          </div>
          <div className="center">
            <p className="section-subtitle mb2">
              For Easy Access! Did you know you can install LockBoxApp directly to your device for quick and easy access? With our Progressive Web App (PWA) feature, you can use LockBoxApp just like a native app, without the need for downloads from an app store.
            </p>
            <ul className="list-reset section-subtitle mb2">
              <li><strong>Fast Access:</strong> Launch LockBoxApp instantly from your home screen.</li>
              <li><strong>Offline Capability:</strong> Some features are available even without an internet connection.</li>
              <li><strong>No Updates Needed:</strong> Always have the latest version, automatically.</li>
              <li>
                <p className="section-subtitle">
                  To install, simply click the "Add to Home Screen" option in your browser’s settings and enjoy LockBoxApp anytime, anywhere!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        {/* Learn More Section */}
        <div className="px2 py4 bg-white">
          <div className="max-width-3 mx-auto">
            <div className="section-header center mb4">
              <h2 className="section-title mb2">Want to learn more?</h2>
            </div>
            <div className="center">
              <p className="section-subtitle">
                Want to learn more about what we do? Visit our{" "}
                <Link href="/about" className="--default-link">About</Link> and{" "}
                <Link href="/news" className="--default-link">News & updates</Link> pages! Have questions? Check out our{" "}
                <Link href="/faq" className="--default-link">FAQ</Link> for answers and tips!
              </p>
            </div>
          </div>
        </div>

      </section>

      {/*SECTION Contact Section */}
      <section className="px2 py4 bg-light-gray">
        <div className="max-width-3 mx-auto">
          <div className="section-header center mb4">
            <h2 className="section-title mb2">Get in Touch</h2>
          </div>
          <div className="center">
            <p className="section-subtitle mb2">
              If you have any questions or feedback, feel free to reach out!
            </p>
            <p className="section-subtitle">
              <span>Email: </span>
              <ContactEmail
                email={`contact@lockboxapp@@com`}
                title={`Contact me`}
                isHidden
              />
            </p>
            <div className="center mb4 mt4">
              <Link href="/about" className="btn btn-primary btn-modern btn-big">Start using</Link>
            </div>

          </div>
        </div>
      </section>

      {/*SECTION Footer */}
      <footer className="px2 py3 bg-dark-gray white center">
        <p className="footer-text">© 2025 LockBoxApp. {isMobile && <br/>}
        Built with modern security and privacy in mind.</p>
      </footer>
    </main>
  );
};

export default Landing;