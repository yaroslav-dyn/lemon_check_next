import Head from "next/head";
import Link from "next/link";
import React from "react";
import ContactEmail from "@/components/elements/contact_email.element"

const Terms = () => {
  return (
    <>
      <Head>
        <title>LockBox | Terms of Service</title>
        <meta name="keywords" content="LockBox Terms of Service" />
        <meta name="description" content="LockBox Terms of Service" />
        <meta name="title" content="LockBox Terms of Service" />
      </Head>

      <div className="main_content">
        <main className="container__limit">
          <h5 className="underline">Last Updated: october 17, 2024</h5>
          <div className="main__heading --small-bm">
            <h1 className="h1_heading pb1 lato-bold" data-centered-text>
              Terms of <span className="--color-primary">Service </span>
            </h1>
          </div>

          <section className="content-text">
            <article>
              Welcome to{" "}
              <Link className="--default-link" href={`/`} target="_blank">
                LockBox
              </Link>
              .
              <p>
                By accessing or using our services, you agree to comply with and
                be bound by the following terms and conditions (the "Terms"). If
                you do not agree to these Terms, please do not use our services.
              </p>
            </article>

            <ul className="list-reset">
              <li>
                <p>
                  1. Acceptance of Terms By using the LockBox website, mobile
                  app, or any related services (collectively, the "Service"),
                  you acknowledge that you have read, understood, and agree to
                  be bound by these Terms and any applicable laws and
                  regulations. These Terms apply to all visitors, users, and
                  others who access or use the Service.
                </p>
              </li>
              <li>
                <p>
                  2. Description of Services LockBox provides tools including,
                  but not limited to:
                </p>
                <p>
                  Password Generator Password Encryption Image-to-Base64
                  Converter Alias Generator QR Code Generator The Service is
                  provided on an "as is" basis without any warranties or
                  guarantees regarding availability, security, or performance.
                </p>
              </li>
              <li>
                <p>
                  3. User Responsibilities Account Security: Users are
                  responsible for the confidentiality of any data they generate
                  using the Service. LockBox does not store passwords,
                  encryption keys, or other sensitive data, and users are
                  responsible for safeguarding this information. Compliance with
                  Laws: Users agree to comply with all applicable laws and
                  regulations while using the Service. Any misuse, including
                  attempts to hack or disrupt the service, will result in
                  immediate termination of access. Proper Use: You agree not to
                  use the Service for any unlawful or malicious activity,
                  including but not limited to the transmission of viruses,
                  malware, or the use of stolen data.
                </p>
              </li>
              <li>
                <p>
                  4. Disclaimer of Warranties LockBox provides the Service "as
                  is" and without any warranty or condition, whether express,
                  implied, or statutory. LockBox specifically disclaims any
                  implied warranties of title, merchantability, fitness for a
                  particular purpose, and non-infringement.
                </p>
                <p>
                  While we strive to provide a secure and reliable service, we
                  cannot guarantee that the Service will be free of errors,
                  uninterrupted, or entirely secure. You use the Service at your
                  own risk.
                </p>
              </li>
              <li>
                <p>
                  5. Limitation of Liability To the fullest extent permitted by
                  law, LockBox will not be liable for any damages, losses, or
                  claims arising from your use of or inability to use the
                  Service. This includes but is not limited to:
                </p>
                <p>
                  Loss of data Security breaches Any indirect, incidental, or
                  consequential damages
                </p>
              </li>
              <li>
                <p>
                  6 .Modifications to the Service LockBox reserves the right to
                  modify, update, or discontinue the Service at any time without
                  notice. We are not liable for any changes or disruptions that
                  may occur as a result.
                </p>
              </li>
              <li>
                <p>
                  7. Termination We may terminate or suspend access to our
                  Service immediately, without prior notice or liability, for
                  any reason whatsoever, including without limitation if you
                  breach the Terms. Upon termination, your right to use the
                  Service will immediately cease.
                </p>
              </li>
              <li>
                <p>
                  8. These Terms shall be governed by and construed in
                  accordance with the laws of Ukraine, without regard to its
                  conflict of law provisions. Any disputes arising from or
                  relating to these Terms or the use of our Service will be
                  subject to the exclusive jurisdiction of the courts located in
                  Ukraine. <br />
                  However, if you are accessing this service from outside
                  Ukraine, you agree that you are responsible for compliance
                  with any local laws applicable to your use of the service.
                </p>
              </li>
              <li>
                <p>
                  9. Changes to the Terms We reserve the right to update or
                  modify these Terms at any time. Any changes will be posted on
                  this page, and your continued use of the Service constitutes
                  your acceptance of the revised Terms.
                </p>
              </li>
              <li>
                <p>
                  10. Contact Us If you have any questions or concerns about
                  these Terms, please contact us at:
                </p>
              </li>
              Email:{" "}
              <ContactEmail
                email={`lemon-check@proton@@me`}
                title={`Contact email`}
                isHidden
              />.
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};
export default Terms;
