import { useEffect, useState, useMemo, ref, useRef } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import { getApiResponse } from "@/services/api.servise";
import styles from "@/styles/IPChecker.module.css";
import { camelToSentence } from "@/services/base.services";
import { copyToClipboardMethod } from "@/services/base.services";

const IPChecker = (props) => {
  const mobileDevice = useDeviceType();
  const [ipData, setApiData] = useState({});
  const copyIcon = "/assets/icons/icons8-clipboard-64.png";
  const refId = useRef(null)

   const isDarkTheme = useMemo(
     () => props.theme === "primary__theme",
     [props.theme]
   );

  const ipDataMaped = useMemo(() => {
    const mData =
      ipData && Object.entries(ipData).map((key) => ({ [key[0]]: key[1] }));
    return mData;
  }, [ipData]);

  const getKeyLikeText = (key) => {
    const keyToModify = Array.isArray(key) ? key.shift() : key;
    return keyToModify ? camelToSentence(keyToModify) : key;
  };

  const getIpData = async () => {
    const extUrl = "http://ip-api.com/json";
    try {
      const res = await getApiResponse(
        null,
        extUrl,
        "GET",
        null,
        false,
        false,
        false
      );
      setApiData(res);
    } catch (error) {
      console.error("error");
    }
  };

  const copyIp = () => {
    copyToClipboardMethod(refId);
  } ;

  useEffect(() => {
    getIpData();
  }, []);

  return (
    <>
      <Head>
        <title>
          LockBoxApp | IP Geolocation Checker - Find the Location of Any IP
          Address | LockBoxApp
        </title>

        <meta
          name="description"
          content="Easily find the physical location of any IP address with our IP Geolocation Checker. Get details like country, city, latitude, longitude, and more. Completely free and fast."
        />

        <meta
          name="keywords"
          content="IP geolocation checker, IP address location, find IP address, IP geolocation, locate IP address, IP lookup, IP geolocation tool, LockBoxApp IP checker"
        />
      </Head>

      <div className={`${styles.ipCheckerPage} ip_checker__page`}>
        <main className="main_content ">
          <div className={`main__heading --small-bm`}>
            <h1 className="h1_heading" data-centered-text>
              <span className="--color-primary"> IP </span>
              <span className="--color-base">Checker</span>
            </h1>
          </div>

          <div className={`marquee-container ${mobileDevice ? 'mb2' : 'mb4'}`}>
            <h2 className="marquee__line --uppercase">
              <span className="--color-primary">Check Your IP</span>
              <span className="--color-base">&#10070;</span>
              <span>Know Your Timezone</span>
              <span>&#10070;</span>
              <span className="--color-primary">Guess Latitude/Longitude</span>
              <span>&#10070;</span>
              <span className="--color-base">Explore Your Location</span>
              <span>&#10070;</span>
              <span className="--color-primary">Verify ISP Details</span>
              <span>&#10070;</span>
              <span className="--color-base">Identify Your Region</span>
              <span className="--color-base">&#10070;</span>

              <span className="--color-primary">Check Your IP</span>
              <span className="--color-base">&#10070;</span>
              <span>Know Your Timezone</span>
              <span>&#10070;</span>
              <span className="--color-primary">Guess Latitude/Longitude</span>
              <span>&#10070;</span>
              <span className="--color-base">Explore Your Location</span>
              <span>&#10070;</span>
              <span className="--color-primary">Verify ISP Details</span>
              <span>&#10070;</span>
              <span className="--color-base">Identify Your Region</span>
            </h2>
          </div>

          <div
            className={`container__limit --x-small ${
              mobileDevice ? "w-100" : ""
            }`}
          >
            <article className="content-text">
              {ipData && Object.keys(ipData).length > 0 ? (
                <>
                  <h2
                    className={`${styles.ipBlock} mb4 center flex__grid justify-between align-center`}
                  >
                    <span></span>
                    <div>
                      {!mobileDevice && (
                        <span className="--color-base">IP: </span>
                      )}
                      <input
                        className="--no_style-input --color-primary"
                        ref={refId}
                        type="text"
                        value={ipData.query}
                      />
                    </div>
                    <div
                      className={`inline-block ${
                        mobileDevice ? "" : "cursor-pointer-screen"
                      } `}
                      onClick={copyIp}
                    >
                      <img
                        className={`align-middle ${
                          isDarkTheme ? "" : "--img-filter-invert"
                        }`}
                        style={{ width: 36, height: "auto" }}
                        src={copyIcon}
                      />
                    </div>
                  </h2>

                  <div className="ip_data__block">
                    {ipDataMaped &&
                      ipDataMaped.map((ipd, index) => (
                        <ul
                          className={`list-reset ${
                            index % 2 > 0 ? "--color-primary" : "--color-base"
                          }`}
                          key={ipd.query}
                        >
                          <li className="flex__grid justify-between mb1">
                            <span>{getKeyLikeText(Object.keys(ipd))}: </span>
                            <span>{Object.values(ipd)}</span>
                          </li>
                          {/* <hr
                            className={`--base-divider ${
                              index % 2 > 0 ? "--bg-primary" : "--bg-base"
                            }`}
                          /> */}
                        </ul>
                      ))}
                  </div>
                </>
              ) : (
                <h2 className="mb0 center">Data is not available, sorry</h2>
              )}
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default IPChecker;
