import Head from "next/head";
import Link from "next/link";
import React from "react";
import useDeviceType from "@/services/useDeviceType";
import LogoTextElement from "@/components/elements/logo_text.element";

const faqContent = [
  {
    title: "How can I use the Password Generator?",
    content: "",
    id: "password-generator",
    url: "#password-generator",
  },
  {
    title: "How can I encrypt my password?",
    content: "",
    id: "encrypt-password",
    url: "#encrypt-password",
  },
  {
    title: "How can I decrypt my password?",
    content: "",
    id: "decrypt-password",
    url: "#decrypt-password",
  },
  {
    title: "How can I use the IP Checker?",
    content: "",
    id: "ip-checker",
    url: "#ip-checker",
  },
  {
    title: "How can I add watermarks to my images?",
    content: "",
    id: "watermarks",
    url: "#watermarks",
  },

  {
    title: "Where are my images processed?",
    content: "",
    id: "watermarks_where_processed",
    url: "#watermarks_where_processed",
  },
  {
    title: "What happens to my image after adding a watermark?",
    content: "",
    id: "watermarks_happens",
    url: "#watermarks_happens",
  },
  {
    title: "Can I use copyrighted images?",
    content: "",
    id: "watermarks_copyright",
    url: "#watermarks_copyright",
  },
];

const onFitemClick = (e) => {
  e.preventDefault();
  const contentItem = document.getElementById(`${e.target.dataset.id}`);
  contentItem &&
    contentItem.scrollIntoView({ behavior: "smooth", block: "end" });
};

const AboutPage = () => {
  const isMobile = useDeviceType();
  return (
    <>
      <Head>
        <title>
          LockBoxApp | FAQ - Strong Password Generator & Encryption Tools
        </title>
        <meta
          name="description"
          content="LockBoxApp Frequently asked questions, FAQ"
        />
      </Head>

      <div className="main_content">
        <main>
          <div className={`main__heading ${isMobile ? "--x-small-bm" : ""}`}>
            <LogoTextElement suffix="FAQ" />
            {/* <h1 className="h1_heading --color-base" data-centered-text>
              Frequency Asked Questions
            </h1> */}
          </div>

          <div className="md-flex">
            {/* FAQ Navifation */}

            <aside className="content-text md-col-4 xs-border-botrtom">
              <div className="--pos-sticky top-11">
                {faqContent &&
                  faqContent.map((qf) => (
                    <h3
                      className="faq__item--heading --color-base my2"
                      key={qf.id}
                    >
                      <Link
                        onClick={onFitemClick}
                        className="--default-link"
                        data-id={qf.id}
                        href={qf.url}
                      >
                        {qf.title}
                      </Link>
                    </h3>
                  ))}
              </div>
            </aside>

            {isMobile && <hr className="block --base-divider x2 my3" />}

            {/* FAQ Content */}
            <article className="md-col-8">
              <section className="content-text">
                <h3 className="--color-primary" id="password-generator">
                  How can I use the Password Generator?
                </h3>

                <p className="pt">
                  Set Password Length: Use the length slider to choose how many
                  characters your password should have. Special Characters:
                  Check or uncheck the box to include or exclude special
                  characters (e.g., @, #, $) in your password. Copy Password:
                  Once the password is generated, simply click the password
                  field or 'copy' button as well, and it will automatically be
                  copied to your clipboard!
                </p>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="encrypt-password" className="content-text">
                <h3 className="--color-primary">
                  How can I encrypt my password?
                </h3>
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
                  password be decrypted. It's important to choose a phrase
                  that's memorable for you but difficult for others to guess.
                </p>

                <h3> Encryption Process: </h3>
                <p>
                  When you input your password and secret phrase, our system
                  combines them and uses advanced encryption algorithms to
                  generate an encrypted version of your password. This encrypted
                  output is a secure, unreadable format that can only be decoded
                  with the correct secret phrase.
                </p>

                {/* <h3> Why Encryption Matters:</h3>
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
                </p> */}
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="decrypt-password" className="content-text">
                <h3 className="--color-primary">
                  How I can decrypt my password?
                </h3>

                <p>
                  If you ever need to retrieve the original password, simply
                  input the same secret phrase and encrypted password. The
                  system will decrypt the encrypted data back into your
                  password, allowing you access to your secure information.
                </p>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="ip-checker" className="content-text">
                <h3 className="--color-primary">
                  How can I use the IP Checker?
                </h3>
                <strong>Using our IP Checker is simple! Here's how: </strong>

                <p>
                  <b>Automatic IP Detection</b>: When you visit the IP Checker
                  page, it will automatically detect and display geolocation
                  information based on your current IP address. This includes
                  your country, city, latitude, longitude, and more.
                </p>

                <p>
                  <b>Manual IP Lookup</b>: If you'd like to check the
                  geolocation of a different IP address, simply type it into the
                  input field and click Search IP. The page will then display
                  geolocation information for the IP address you entered.
                </p>

                <p>
                  <b> Domain Name Lookup: </b>
                  You can also use the tool to look up geolocation information
                  based on a domain name. Enter a domain (e.g., example.com) in
                  the input field, and the tool will resolve the domain to its
                  associated IP address and fetch its geolocation data. Simply
                  click the Search icon after typing in the domain.
                </p>

                <p>
                  <b>Real-Time Information</b>: The results are fetched in
                  real-time from{" "}
                  <Link
                    className="--default-link"
                    href={`https://ipwhois.io/terms`}
                    target="_blank"
                  >
                    ipwhois.io
                  </Link>
                  , so you can get up-to-date location data instantly.
                </p>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="watermarks" className="content-text">
                <h3 className="--color-primary">
                  How can I add watermarks to my images?
                </h3>

                <ul className="list-reset">
                  <li className="mb2">
                    <strong>1. Upload Your Image:</strong>
                    <div>
                      Click Upload New Image and choose the image you want to
                      watermark. <br />
                      The uploaded image will appear in the preview area.
                    </div>
                  </li>
                  <li className="mb2">
                    <strong>2. Customize Your Watermark (Live Updates):</strong>
                    <ul className="list-reset">
                      <li>
                        Enter Text: Type your desired watermark text in the
                        input field.
                      </li>
                      <li>
                        Positioning: Choose from pre-set locations (e.g.,
                        top-left, bottom-right, etc.) for your watermark.
                      </li>
                      <li>
                        <strong>Style Adjustments:</strong>
                        <ul className="list-reset">
                          <li>
                            <div>
                              Adjust opacity, font size, gaps, and color to suit
                              your image.
                            </div>
                          </li>
                          <li>
                            <div>
                              Every change is applied instantly, so you can see
                              the results live.
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="mb2">
                    <strong>3. Preview with Zoom</strong>:
                    <div>
                      Use the Zoom Slider to scale the preview for better
                      placement visualization. This feature is for preview
                      purposes only and will not change the final output's
                      dimensions.
                    </div>
                  </li>
                  <li>
                    <strong> 4. Save the Image</strong>:
                    <div>
                      Once you're happy with the watermark's appearance, click
                      Save Image to download the finalized image with the
                      watermark embedded.
                    </div>
                  </li>
                </ul>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="watermarks_where_processed" className="content-text">
                <h3 className="--color-primary">
                  Where are my images processed?
                </h3>
                <p>
                  All images uploaded for watermarking are processed directly in
                  your browser. LockBoxApp does not store or share your images.
                </p>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="watermarks_happens" className="content-text">
                <h3 className="--color-primary">
                  What happens to my image after adding a watermark?
                </h3>
                <p>
                  Your image remains on your device. You can save the edited
                  version locally, and no copy of the image is saved by
                  LockBoxApp.
                </p>
              </section>

              <hr
                className={`${
                  isMobile ? "my2" : "my4"
                } block --bg-primary --base-divider`}
              />

              <section id="watermarks_copyright" className="content-text">
                <h3 className="--color-primary">
                  Can I use copyrighted images?
                </h3>
                <p>
                  You are responsible for ensuring you have the rights to upload
                  and modify any image used with this tool.
                </p>
              </section>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
