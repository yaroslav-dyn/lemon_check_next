import { BottomBarlinks } from "@/components/Header.static";
import Link from "next/link";
import useDeviceType from "@/services/useDeviceType";

export default function Footer() {
  const isMobile = useDeviceType();

  return (
    <footer className="footer flex__grid --column justify-between">
      <div
        className={`footer__nav__panel flex__grid justify-between ${
          isMobile ? "mb4" : "mb4"
        }`}
      >
        <div className="base-1/2">
          <h5 className="footer__nav__heading">SERVICES</h5>
          <div className={`footer__nav ${isMobile ? "--one-column" : ""}`}>
            {BottomBarlinks &&
              BottomBarlinks.map((link) => (
                <div key={link.alias}>
                  <Link className="--default-link" href={link.url}>
                    {link.title}
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="base-1/2">
          <h5 className="footer__nav__heading">DOCUMENTS & LEGAL</h5>
          <div className="footer__nav --one-column">
            <div>
              <Link className="--default-link" href="/about">
                About
              </Link>
            </div>
            <div>
              <Link className="--default-link" href="/faq">
                FAQ
              </Link>
            </div>
            <div>
              <Link className="--default-link" href="/faq">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="base-1/2">
          <h5 className="footer__nav__heading"> CONTACT ME </h5>
          <div>
            <Link
              className="--default-link"
              href={`mailto:lemon-check@proton.me`}
            >
              Email
            </Link>
          </div>
        </div>
      </div>
      <div className="flex__grid justify-center">
        <small className="--color-primary">©2024 LockBox </small>
      </div>
    </footer>
  );
}
