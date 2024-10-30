import { useEffect, useRef, useState } from "react";
import AppHeader from "@/components/Header.static";
import Footer from "@/components/footer.static";
import useDeviceType from "@/services/useDeviceType";
import "@/styles/normalize.css";
import "@/styles/globals.css";
import "@/styles/color-schema.css";
import "@/styles/elements.css";
import "@/styles/bottom_bar.css";
import "basscss/css/basscss.min.css";
import { isTablet } from "react-device-detect";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }) {
  const appContainerRef = useRef(null);
  const isMobile = useDeviceType();
  const [theme, setTheme] = useState("light__theme");

  function setColorschema(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("Service Worker registered"))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

  return (
    <>
      <div
        className={`${isMobile ? "mobile__view" : ""} ${
          isTablet ? "tablet__view" : ""
        } `}
      >
        <SnackbarProvider>
          <div id="appContainer" className={`app__container ${theme}`}>
            <AppHeader changeSchema={setColorschema} />
            <Component {...pageProps} theme={theme} />
            <Footer />
          </div>
        </SnackbarProvider>
      </div>
    </>
  );
}
