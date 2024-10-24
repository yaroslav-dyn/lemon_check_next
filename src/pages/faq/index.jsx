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

            {isMobile && <hr className="block --base-divider my4" />}

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
                  <b>Manual IP Lookup</b>: If you'd like to check the geolocation of a
                  different IP address, simply type it into the input field and
                  click Search IP. The page will then display geolocation
                  information for the IP address you entered.
                </p>

                <p>
                  <b>Real-Time Information</b>: The results are fetched in real-time
                  from{" "}
                  <Link className="--default-link" href={`https://ip-api.com/docs/legal`} target="_blank">
                    ip-api.com
                  </Link>
                  , so you can get up-to-date location data instantly.
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
