import Head from "next/head";
import Link from "next/link";
import React from "react";
import LogoTextElement from "@/components/elements/logo_text.element";
import useDeviceType from "@/services/useDeviceType";

const payPalQr = `assets/img/payment/QRCode_PayPal.png`;
const payPalLink =
  "https://www.paypal.com/donate/?hosted_button_id=3QS2H6HWRV2V8";

const NewsPage = () => {
  const mobileDevice = useDeviceType();
  const pixelEncryptImg = "/assets/img/pixel_crypto.png";
  const lockboxAlt = "/assets/img/lockboxAlt.webp";
  const passwordGeneratorImg = "/assets/img/password_generator_icon.png";
  const cryptoQr = "/assets/img/qr_crypto__img.png";
  const cryptoMatrix = "/assets/img/crypto_matrix.png";

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
              August 4, 2025 – 📝 New Feature: Text Formatter!
            </h2>
            <p>
              We're excited to introduce our new Text Formatter page, designed to help you quickly and easily format your text! This tool provides a variety of options to clean up, transform, and standardize your text content for better readability and presentation.
            </p>
            <strong className="--color-prmary">What's New:</strong>
            <ul className="list-reset">
              <li>
                <b className="--color-base">Multiple Formatting Options:</b> Trim spaces, remove extra line breaks, and more.
              </li>
              <li>
                <b className="--color-base">Real-Time Preview:</b> See your formatted text instantly as you make changes.
              </li>
              <li>
                <b className="--color-base">Easy Copy & Export:</b> Copy your formatted text with one click or export it for use elsewhere.
              </li>
            </ul>
            <p>
              Visit the <Link href={"/text-formatter"} className="--default-link">Text Formatter</Link> page now to try out these new features and enhance your text editing workflow!
            </p>
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              August 1, 2025 – 🎨 Light Color Theme Update & Redesign!
            </h2>
            <p>
              We are excited to announce a fresh update to LockBoxApp with a brand new light color theme! This redesign brings a brighter, cleaner, and more modern look to the entire app, enhancing readability and user experience.
            </p>
            <strong className="--color-prmary">What's New:</strong>
            <ul className="list-reset">
              <li>
                <b className="--color-base">Light Theme Colors:</b> Enjoy a crisp white background with soft accent colors for a pleasant visual experience.
              </li>
              <li>
                <b className="--color-base">Header Background:</b> The header now features a vibrant gradient background inspired by the landing page's hero section.
              </li>
              <li>
                <b className="--color-base">Consistent Typography:</b> All text and UI elements have been updated to match the landing page's typography and color scheme for a cohesive look.
              </li>
              <li>
                <b className="--color-base">Footer Styling:</b> The footer background and text colors have been adjusted to blend seamlessly with the light theme.
              </li>
            </ul>
            <p>
              Explore the updated design across all pages, including the password generator and landing page. We hope you enjoy the new look and feel!
            </p>
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              July 8, 2025 – ✨ QR Generator Enhanced: Size and Color Options Added!
            </h2>
            <p>
              We've updated our QR Code Generator page to give you more control over your QR codes! You can now easily adjust the size and color of the generated QR codes directly on the page.
            </p>
            <strong className="--color-prmary">What's New:</strong>
            <ul className="list-reset">
              <li>
                <b className="--color-base">Custom Size:</b> Choose the perfect size for your QR code.
              </li>
              <li>
                <b className="--color-base">Custom Color:</b> Select a color for your QR code to match your branding or preference.
              </li>
            </ul>
            <p>
              Head over to the <Link href={"/qr-generator"} className="--default-link">QR Code Generator</Link> page to try out these new features!
            </p>
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              June 6, 2025 – ✨ Exciting Update: Image Watermark & Preview Features Added!
            </h2>
            <p>
              We're excited to announce significant enhancements to our Watermarks Editor! You can now use images as watermarks, in addition to text. This update brings more flexibility and customization options to protect and personalize your images.
            </p>
            <strong className="--color-prmary">What's New:</strong>
            <ul className="list-reset">
              <li>
                <b className="--color-base">Image Watermarks:</b> Upload your own image to use as a watermark.
              </li>
              <li>
                <b className="--color-base">New Controls:</b> Easily adjust the size and gap from borders specifically for image watermarks.
              </li>
              <li>
                <b className="--color-base">Full-Screen Preview:</b> Get a better look at your watermarked image with the new full-screen preview functionality.
              </li>
            </ul>
            <p>
              These new features are designed to give you more control and better visualization when adding watermarks. Head over to the <Link href={"/image-converter/watermark"} className="--default-link">Watermarks Editor</Link> to try them out!
            </p>
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              November 21, 2024 – 🎉 New Feature Announcement: <br />
              <span className="--color-primary">
                {" "}
                <Link
                  href={"/image-converter/watermark"}
                  className="--default-link"
                >
                  Watermarks Editor
                </Link>{" "}
              </span>{" "}
              Now Live! 🚀
            </h2>
            <p>
              We're thrilled to announce the launch of our{" "}
              <Link
                href={"/image-converter/watermark"}
                className="--default-link"
              >
                Watermarks Editor!
              </Link>{" "}
              and personalize your images effortlessly, right in your browser.
              Whether you're securing your work from unauthorized use or simply
              adding a touch of customization, the{" "}
              <Link
                href={"/image-converter/watermark"}
                className="--default-link"
              >
                Watermarks Editor
              </Link>{" "}
              offers a seamless, intuitive experience.
            </p>
            <strong className="--color-prmary">Key Features:</strong>
            <ol>
              <li>
                <b className="--color-base">Live Customization</b>
                <p>
                  Instantly see changes applied to your image as you adjust
                  settings for text, position, color, opacity, and font size.
                </p>
              </li>
              <li>
                <b className="--color-base">Flexible Positioning</b>
                <p>
                  Choose from predefined locations like top-left, center-center,
                  or bottom-right to position your watermark with precision.
                </p>
              </li>
              <li>
                <b className="--color-base"> Zoom Preview</b>
                <p>
                  Use the zoom slider to preview your image at different scales.
                  This is especially handy for larger images.
                </p>
              </li>
              <li>
                <b className="--color-base"> On-the-Go Adjustments</b>
                <p>
                  No need to hit “Apply”! Your changes update dynamically as you
                  adjust any setting.
                </p>
              </li>
              <li>
                <b className="--color-base"> One-Click Download</b>
                <p>
                  Save your watermarked image with a single click after
                  perfecting your design.
                </p>
              </li>
            </ol>
            <strong>
              Why Use the{" "}
              <Link
                href={"/image-converter/watermark"}
                className="--default-link"
              >
                Watermarks Editor?
              </Link>{" "}
            </strong>
            <p>
              Adding watermarks is an essential step to: Protect your content
              from unauthorized use or copying. Maintain brand identity by
              displaying your logo or text on shared images. Customize images
              for personal or business use.
            </p>
            <strong>
              {" "}
              How to Get <span className="--color-primary">Started</span>{" "}
            </strong>
            <br />
            Head over to our Image Watermarking Tool and upload your image to
            try it out. Whether you're adding a small logo or bold text, our
            editor makes the process fast and fun! Let us know what you think
            and share your feedback! 💡 Your suggestions help us improve and
            bring even more value to{" "}
            <Link href={"/"} className="--default-link --color-primary">
              LockBoxApp
            </Link>
            .
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              November 5, 2024 – New Feature: Securely{" "}
              <span className="--color-primary">Store Encrypted Passwords</span>{" "}
              on Your Device
            </h2>
            <p>
              We’re excited to announce a new addition to LockBoxApp’s
              functionality—users can now save encrypted passwords with an alias
              on their device, enhancing accessibility while maintaining
              security. With this feature, you can encrypt your passwords and
              store them locally within your device’s storage (IndexedDB),
              making it easy to retrieve them anytime.
            </p>
            <p>
              <strong>Please note</strong>: that this feature uses experimental
              local storage (IndexedDB) and is designed to support users needing
              quick access to securely stored data on their own devices.
              However, as this storage is experimental, we recommend continuing
              to use external password recovery or management systems for
              critical passwords. LockBoxApp cannot guarantee recovery of lost
              data due to limitations of local storage.
            </p>
          </article>

          <hr className="--base-divider x2 --bg-primary mt2 mb2" />

          <article className="content-text">
            <h2 className="mb0">
              🎉 October 29, 2024 – Update: Enhanced{" "}
              <span className="--color-primary">Image Converter</span>{" "}
            </h2>
            <p>
              Now Supports both: data and image Format! We’ve added a new
              capability to our Image Converter feature. Alongside converting
              between standard base64 and image formats, the converter now
              seamlessly handles images in{" "}
              <span className="--color-primary">base64 data</span> and like
              image: <br />
              <code className="--color-primary">
                {"<img src='data:image/png;base64,....' />"}
              </code>
              .
            </p>
            <strong className="--color-base"> What’s New:</strong>
            <p>
              Automatic Data URI Detection: Paste a data URI (starting with
              data:image/...;base64,) directly into the converter, and it will
              handle the cleanup automatically. Flexible Conversion: The
              converter now removes any extra HTML elements or characters (like
              /&gt;) for a smooth experience.
            </p>
            <strong className="--color-base"> How It Works:</strong>
            <p>
              Image to Base64: Upload any image, and it will be converted to a
              base64 string ready for embedding or use. Base64 to Image: Paste
              your base64 string, whether it’s standalone or embedded in a data
              URI, and convert it back to a downloadable image file. We’re
              always looking for ways to make the LockBox tools more
              user-friendly and versatile. Give it a try on our Image Converter
              page, and let us know what you think!
            </p>
          </article>

          <article className="content-text">
            <h2 className="mb0">
              October 24, 2024 – New Feature:{" "}
              <span className="--color-primary">
                IP Geolocation Checker Now Live!
              </span>
            </h2>
            <p>
              We are excited to announce the release of our latest feature—IP
              Geolocation Checker! This tool allows you to instantly check the
              location information of any IP address, including details like
              country, region, city, and even latitude and longitude.
            </p>
            <h3 className="mb1 --color-primary">How It Works:</h3>
            <ul className="list-reset">
              <li>
                &#8212; On page load, the tool automatically detects and
                displays your current IP address.
              </li>
              <li>
                &#8212; You can also enter any other IP address to check its
                geolocation data.
              </li>
              <li>
                &#8212; Use this tool to explore IP data quickly and accurately,
                whether it's your own or another IP you're curious about!
              </li>
            </ul>
            <p>
              Check out the{" "}
              <Link
                className="--default-link --color-primary"
                href={`/ip-checker`}
                target={mobileDevice ? "_self" : "_blank"}
              >
                IP Geolocation Checker
              </Link>{" "}
              now and explore more at{" "}
              <Link href={"/"} className="--default-link --color-primary">
                LockBoxApp
              </Link>
            </p>
          </article>
          <hr className="--base-divider x2 --bg-primary mt2 mb2" />
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
          <hr className="--base-divider x2 --bg-primary mt0 mb2" />

          <div className="flex__grid justify-between">
            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src={passwordGeneratorImg}
              alt="password generator"
            />

            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src={cryptoMatrix}
              alt="crypto matrix"
            />
            <img
              style={{ width: mobileDevice ? 60 : 200, height: "auto" }}
              src={cryptoQr}
              alt="QR code"
            />
          </div>
          <hr className="--base-divider x2 --bg-primary mt2 mb2" />
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
              {/* <li>
                <strong>IP Geolocation Checker</strong>: Check the geolocation
                of an IP address with ease.
              </li> */}
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
          <hr className="--base-divider --bg-primary mb2" />
          <article className="content-text">
            <h2 className="mb2">Support New Features and Improvements</h2>{" "}
            <div className="">
              <div className="flex__grid  justify-between align-end">
                <div className="py2">
                  <span className="--color-primary">Scan</span> to{" "}
                  <span className="--color-primary">Support</span> Future
                  Updates or use the{" "}
                  <Link
                    className="--base-link"
                    href={payPalLink}
                    target="_blank"
                  >
                    link
                  </Link>
                </div>
                <div className="flex__grid justify-center">
                  <div className="border --border-3x --base-rounded inline-block --color-primary px1 pt1 pb0">
                    <img src={payPalQr} alt={`payPalLink`} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};
export default NewsPage;
