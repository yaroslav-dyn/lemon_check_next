import { useEffect, useState, useMemo, ref, useRef } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import { getApiResponse } from "@/services/api.servise";
import styles from "@/styles/IPChecker.module.css";
import {
  snakeToSentence,
  ipRegex,
  copyToClipboardMethod,
} from "@/services/base.services";
import Preloader from "@/components/elements/loading.element";
import MapWorldElement from "@/components/elements/map_world.element";

const primaryIPIcon = "/assets/icons/icons8-ip-48-primary.png";
const lightIPIcon = "/assets/icons/icons8-ip-48-light.png";
const extAPIURL = "https://ipwhois.app/json/";
const copyIcon = "/assets/icons/icons8-clipboard-64.png";
const extIPFilledUrl = (ip) => extAPIURL + "/" + ip;
const ipExcludedFields = [
  "success",
  "country_neighbours",
  "timezone_dstOffset",
  "timezone_gmtOffset",
  "currency_plural",
];

const IPChecker = (props) => {
  const mobileDevice = useDeviceType();
  const [ipData, setApiData] = useState({});
  const [initialIP, setInitialIP] = useState("");
  const [ipInput, setIpinput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const refId = useRef(null);

  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );

  const safeKeyFromArray = (ipF) => {
    if (ipF && Object.keys(ipF) && Array.isArray(Object.keys(ipF))) {
      return Object.keys(ipF);
    } else return [];
  };

  const ipDataMaped = useMemo(() => {
    const mData =
      ipData && Object.entries(ipData).map((key) => ({ [key[0]]: key[1] }));
    return mData.filter(
      (ipF) => ipF && !ipExcludedFields.includes(safeKeyFromArray(ipF).shift())
    );
  }, [ipData]);

  const ipNotValid = useMemo(() => !ipRegex.test(ipInput), [ipInput]);

  const getKeyLikeText = (key) => {
    const keyToModify = Array.isArray(key) ? key.shift() : key;
    return keyToModify ? snakeToSentence(keyToModify) : key;
  };

  const setIpAddress = (addr) => setIpinput(addr);

  const searchIp = async () => {
    if (ipNotValid) return;
    await getIpData(ipInput);
  };

  const getIpData = async (ip) => {
    setLoading(true);
    try {
      const res = await getApiResponse(
        null,
        !ip ? extAPIURL : extIPFilledUrl(ip),
        "GET",
        null,
        false,
        false,
        false
      );
      setApiData(res);
      setIpinput(res && res.ip);
      setLoading(false);
      !ip && setInitialIP(res.ip);
    } catch (error) {
      console.error("error");
      setLoading(false);
    }
  };

  const copyIp = () => {
    copyToClipboardMethod(refId);
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
          <div
            className={`main__heading ${mobileDevice ? "pb0" : "--small-bm"}`}
          >
            <h1 className="h1_heading" data-centered-text>
              <span className="--color-primary">IP</span>{" "}
              <span className="--color-base">Checker</span>
            </h1>
          </div>

          <MarqueeElement mobileDevice={mobileDevice} />

          <div className={`container__limit ${mobileDevice ? "w-100" : ""}`}>
            {isLoading ? (
              <Preloader />
            ) : (
              <article
                className={` ${
                  !mobileDevice ? "flex__grid justify-between --big-gap" : ""
                } content-text`}
              >
                {!isLoading && ipData && Object.keys(ipData).length > 0 ? (
                  <>
                    <div className="ip__section mb2">
                      <h2
                        className={`mt0 ${styles.ipBlock} ${
                          mobileDevice
                            ? ipNotValid
                              ? "mb0"
                              : "mb2"
                            : ipNotValid
                            ? "mb0"
                            : "mb2"
                        } center flex__grid justify-between align-center`}
                      >
                        <div className="flex__grid align-center">
                          {initialIP === ipInput && (
                            <img
                              src={isDarkTheme ? primaryIPIcon : lightIPIcon}
                              alt="Your IP"
                              height={30}
                            />
                          )}
                        </div>
                        <div className="flex__grid">
                          <form
                            style={{
                              maxWidth: mobileDevice ? "220px" : "unset",
                            }}
                            name={`ipSearching`}
                            onSubmit={(e) => {
                              e.preventDefault();
                              searchIp();
                            }}
                          >
                            <input
                              className={`--no_style-input ${
                                initialIP === ipInput
                                  ? "--color-primary"
                                  : "--color-base"
                              }`}
                              ref={refId}
                              type="text"
                              value={ipInput}
                              onInput={(e) => setIpAddress(e.target.value)}
                            />
                          </form>
                        </div>
                        <div
                          className={`inline-block mr0.5 ${
                            mobileDevice ? "" : "cursor-pointer-screen"
                          } `}
                          onClick={copyIp}
                        >
                          <img
                            className={`align-middle ${
                              isDarkTheme ? "" : "--img-filter-invert"
                            }`}
                            style={{ width: "auto", height: "26px" }}
                            src={copyIcon}
                          />
                        </div>
                      </h2>
                      {/*SECTION: INVALID IP MESSAGE */}
                      {ipNotValid && (
                        <p className="flex__grid justify-end my1">
                          <span className="--color-accent">
                            IP address is not valid
                          </span>
                        </p>
                      )}
                      <div>
                        {ipInput && (
                          <button
                            disabled={ipNotValid}
                            className="generator__content--btn mb1 lato-regular"
                            onClick={searchIp}
                          >
                            SEARCH IP
                          </button>
                        )}
                      </div>

                      <MapWorldElement
                        size={mobileDevice ? "responsive" : "md"}
                        value={ipInput}
                        color={isDarkTheme ? "#E94E3D" : "limegreen"}
                        ipLocation={ipData}
                      />
                    </div>
                    <div className="ip_data__block">
                      <ul
                        className={`list-reset ${
                          !mobileDevice
                            ? styles.ipDataTable
                            : styles.ipDataTableMobile
                        }`}
                      >
                        {ipDataMaped &&
                          ipDataMaped.map((ipd, index) => (
                            <li
                              className={`flex__grid justify-between mb1 ${
                                index % 2 > 0
                                  ? "--color-primary"
                                  : "--color-base"
                              }`}
                              key={ipd.ip}
                            >
                              <span>{getKeyLikeText(Object.keys(ipd))}: </span>
                              {Object.keys(ipd).shift() === "country_flag" ? (
                                <img
                                  height={24}
                                  src={Object.values(ipd)}
                                  alt={Object.keys(ipd)}
                                />
                              ) : (
                                <span>{Object.values(ipd)}</span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    {!isLoading && (
                      <h2 className="mb0 center --color-base">
                        Data is not available, sorry
                      </h2>
                    )}
                  </>
                )}
              </article>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default IPChecker;

//TODO: Temporary solution (add dynamic line with calculating count)
const MarqueeElement = ({ mobileDevice }) => {
  return (
    <div className={`marquee-container ${mobileDevice ? "mb2" : "mb4"}`}>
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
  );
};
