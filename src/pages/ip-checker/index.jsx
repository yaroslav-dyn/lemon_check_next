import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import { getApiResponse } from "@/services/api.servise";
import styles from "@/styles/IPChecker.module.css";
import {camelToSentence} from "@/services/base.services";

const IPChecker = () => {
  const mobileDevice = useDeviceType();
  const [ipData, setApiData] = useState({});

  const ipDataMaped = useMemo(() => {
    const mData =
      ipData && Object.entries(ipData).map((key) => ({ [key[0]]: key[1] }));
    return mData;
  }, [ipData]);

  const getKeyLikeText = (key) => {
    const keyToModify = Array.isArray(key) ? key.shift() : key;
    return keyToModify ? camelToSentence(keyToModify) : key;
  }

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

          <div class="marquee-container">
            <h2 class="marquee__line --uppercase">
              <span className="--color-primary">
                — Check Your IP — Know Your Timezone
              </span>
              <span>Guess Latitude/Longitude — </span>
              <span className="--color-base">Explore Your Location</span>
              <span>Verify ISP Details — </span>
              <span>Identify Your Region</span>
            </h2>
            <h2 class="marquee__line --uppercase">
              <span className="--color-primary">
                Check Your IP — Know Your Timezone — Guess Latitude/Longitude —
              </span>
              <span className="--color-base">
                Explore Your Location — Verify ISP Details — Identify Your
                Region —
              </span>
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
                  <h2 className={`${styles.ipBlock} mb4 center`}>
                    <span className="--color-primary">IP:</span>{" "}
                    <span>{ipData.query}</span>
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
                          <li className="flex__grid justify-between">
                            <span>{getKeyLikeText(Object.keys(ipd))}: </span>
                            <spn> {Object.values(ipd)}</spn>
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
