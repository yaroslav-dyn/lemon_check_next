import { useEffect, useState, useMemo, ref, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
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
import CopyBtnElement from "@/components/elements/copy_button.element";

const primaryIPIcon = "/assets/icons/icons8-ip-48-primary.png";
const lightIPIcon = "/assets/icons/icons8-ip-48-light.png";
const defaultIPIcon = "/assets/icons/icons8-ip-48.png";
const domainIcon = "/assets/icons/domain-registration-website-svgrepo-com.svg";
const searchIcon = "/assets/icons/find-location-symbolic.svg";

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

const extDomainAPIURL = (domain) => extAPIURL + "/" + domain;

const IPChecker = (props) => {
  const mobileDevice = useDeviceType();
  const [ipData, setApiData] = useState({});
  const [domainDataValid, setDomainDataStatus] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [initialIP, setInitialIP] = useState("");
  const [ipInput, setIpinput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const refId = useRef(null);
  const refDomain = useRef(null);

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
    const searchUrl = !ip ? extAPIURL : extIPFilledUrl(ip);
    console.log("🚀 ~ getIpData ~ searchUrl:", searchUrl);
    try {
      const res = await getApiResponse(
        null,
        searchUrl,
        "GET",
        null,
        false,
        false,
        false
      );
      setApiData(res);
      setIpinput(res && res.ip);
      setLoading(false);
      setDomainName("");
      setDomainDataStatus(false);
      !ip && setInitialIP(res.ip);
    } catch (error) {
      console.error("error");
      setLoading(false);
    }
  };

  const copyIp = () => {
    copyToClipboardMethod(refId);
  };

  const copyDomain = () => {
    copyToClipboardMethod(refDomain);
  };

  const getDataByDomain = async () => {
    let domain = domainName.replace(/(^\w+:|^)\/\//, "");
    domain = domain.split("/")[0];
    const domainSearchURL = extDomainAPIURL(domain);
    try {
      const res = await getApiResponse(
        null,
        domainSearchURL,
        "GET",
        null,
        false,
        false,
        false
      );
      if (!res || (res && !res?.ip)) {
        setDomainDataStatus(true);
        return;
      }
      setDomainDataStatus(false);
      setApiData(res);
      setIpinput(res && res.ip);
      setLoading(false);
    } catch (error) {
      console.error("error");
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getDataByDomain()
  // }, [domainName]);

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
          content="IP geolocation checker, IP address location, find IP address, IP geolocation, locate IP address, IP lookup, IP geolocation tool, LockBoxApp IP checker, IP by domain"
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
                    <div className="ip__section mb2 flex__grid --column justify-between">
                      <div>
                        {/*SECTION: DOMAIN FORM */}
                        <div className="mb2">
                          <div
                            className={`${styles.ipBlock} flex__grid align-center mb2 --small-gap`}
                          >
                            <Image
                              className={`${
                                isDarkTheme ? "--img-filter-invert" : ""
                              } ml0.5`}
                              src={domainIcon}
                              alt="Your domain"
                              height={30}
                              width={30}
                            />
                            <form
                              style={{
                                maxWidth: mobileDevice ? "220px" : "unset",
                              }}
                              className="w-100"
                              name={`domainSearching`}
                              onSubmit={(e) => {
                                e.preventDefault();
                                getDataByDomain();
                              }}
                            >
                              <input
                                className={`--no_style-input --color-base flex-1`}
                                ref={refDomain}
                                type="text"
                                value={domainName}
                                onInput={(e) => setDomainName(e.target.value)}
                                placeholder="Get data by domain"
                              />
                            </form>
                            <div className="flex__grid items-center --small-gap">
                              <CopyBtnElement
                                mobileDevice={mobileDevice}
                                isDarkTheme={isDarkTheme}
                                copyIcon={copyIcon}
                                copyAction={copyDomain}
                              />
                              <button
                                disabled={!domainName}
                                className="--no-style-btn"
                                onClick={getDataByDomain}
                              >
                                <Image
                                  className={`${
                                    isDarkTheme ? "--img-filter-invert" : ""
                                  } cursor-pointer-screen`}
                                  src={searchIcon}
                                  height={24}
                                  width={24}
                                  alt="search"
                                />
                              </button>
                            </div>
                          </div>
                          {/* {domainName && (
                            <button
                              disabled={!domainName}
                              className="generator__content--btn --secondary-btn mb1 lato-regular"
                              onClick={getDataByDomain}
                            >
                              SEARCH BY DOMAIN
                            </button>
                          )} */}
                        </div>
                        {/*SECTION: IP FORM */}
                        <div
                          className={`mt0 ${styles.ipBlock} ${
                            mobileDevice
                              ? ipNotValid
                                ? "mb0"
                                : "mb2"
                              : ipNotValid
                              ? "mb0"
                              : "mb2"
                          } center flex__grid align-center --small-gap`}
                        >
                          <div
                            className="flex__grid align-center"
                            onClick={() => getIpData()}
                          >
                            {initialIP === ipInput ? (
                              <Image
                                className="ml0.5 cursor-pointer-screen"
                                src={isDarkTheme ? primaryIPIcon : lightIPIcon}
                                alt="Your IP"
                                height={30}
                                width={30}
                              />
                            ) : (
                              <Image
                                className={`${
                                  isDarkTheme ? "--img-filter-invert" : ""
                                } ml0.5 cursor-pointer-screen`}
                                src={defaultIPIcon}
                                alt="Your IP"
                                width={30}
                                height={30}
                              />
                            )}
                          </div>
                          <div className="flex__grid flex-1">
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
                                className={`--no_style-input flex-1 ${
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

                          <div className="flex__grid items-center --small-gap">
                            <CopyBtnElement
                              mobileDevice={mobileDevice}
                              isDarkTheme={isDarkTheme}
                              copyIcon={copyIcon}
                              copyAction={copyIp}
                            />

                            <button
                              className="--no-style-btn"
                              onClick={() => searchIp()}
                            >
                              <Image
                                className={`${
                                  isDarkTheme ? "--img-filter-invert" : ""
                                } cursor-pointer-screen`}
                                src={searchIcon}
                                height={24}
                                width={24}
                                alt="search"
                              />
                            </button>
                          </div>
                        </div>
                        {/*SECTION: INVALID IP MESSAGE */}
                        {(ipNotValid || domainDataValid) && (
                          <p className="flex__grid justify-end my1">
                            <span className="--color-accent">
                              {ipNotValid ? "IP address" : "Domain name "} is
                              not valid
                            </span>
                          </p>
                        )}
                        {/* <div>
                          {ipInput && (
                            <button
                              disabled={ipNotValid}
                              className="generator__content--btn mb1 lato-regular"
                              onClick={searchIp}
                            >
                              SEARCH IP
                            </button>
                          )}
                        </div> */}
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
