import { useEffect } from "react";
import AppHeader from '@/components/Header.static';
import Footer from '@/components/footer.static';
import useDeviceType from "@/services/useDeviceType";
import '@/styles/normalize.css';
import '@/styles/globals.css';
import '@/styles/elements.css';
import "@/styles/bottom_bar.css";
import "basscss/css/basscss.min.css";

export default function App({ Component, pageProps }) {

const isMobile = useDeviceType();

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
      <div className={`primary__theme ${isMobile ? "mobile__view" : ""}`}>
        <AppHeader />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
