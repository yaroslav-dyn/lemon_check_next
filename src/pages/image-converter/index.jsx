import React, { useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/ImageConverter.module.css";
import { copyToClipboardMethod, base64ToImage } from "@/services/base.services";
import useDeviceType from "@/services/useDeviceType";
import UISwitcher from "@/components/ui.switcher";

const backIconLight = "/assets/icons/icons8-logout-rounded-left-48.png";
const backIconDark = "/assets/icons/icons8-logout-rounded-left-48-dark.png";
const imgTypeBageIcon = "/assets/icons/icons8-image-file-48.png";
const dataTypeBageIcon = "/assets/icons/icons8-64-bit-50.png";

const Imageconverter = (props) => {
  const [imageBase64, setImageBase64] = useState("");
  const [rootConvertType, setConvertType] = useState(undefined);
  const [imageBase64ForCopy, setTypedImageBase64] = useState("");
  const [dataToConvert, setDataToConvert] = useState("");
  const [convertedFromData, setConvertedFromData] = useState("");
  const [invalidBase64, setBase64invalidState] = useState("");
  const imageInputRef = useRef(null);
  const areaElement = useRef();
  const convertedFromDataLink = useRef(null);
  const mobileDevice = useDeviceType();

  const router = useRouter();
  const searchParams = useSearchParams();

  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );

  const operationOptions = [
    {
      label: "Like data",
      value: "data",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
    {
      label: "Like image",
      value: "image",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
  ];

  const onChangeDataType = (type) => {
    if (type === "image") {
      setTypedImageBase64(`<img src='${imageBase64}' />`);
    } else if (type === "data") {
      setTypedImageBase64(imageBase64);
    }
  };

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setTypedImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const convertFromDataToImage = () => {
    if (dataToConvert) {
      const blobFromData = base64ToImage(dataToConvert);
      if (!blobFromData) {
        setBase64invalidState(true);
        setConvertedFromData("");
        return;
      }
      setBase64invalidState(false);
      const urlFromBlob = URL.createObjectURL(blobFromData);
      setConvertedFromData(urlFromBlob);
    }
  };

  const saveImgToFile = () => {
    convertedFromDataLink &&
      convertedFromDataLink.current &&
      convertedFromDataLink.current.click();
  };

  const copyToClipboard = () => {
    copyToClipboardMethod(areaElement);
  };

  const changeConverterType = (type) => {
    setImageBase64("");
    setConvertedFromData("");
    setBase64invalidState(false);
    setConvertType(type);
    router.replace("/image-converter");
  };

  useEffect(() => {
    if (searchParams.has("type")) {
      const sParam = searchParams.get("type");
      if (sParam === "image" || sParam === "data") {
        setConvertType(sParam);
      }
    }
  }, [searchParams]);

  // NOTE: HTML!
  return (
    <>
      <Head>
        <title>
          LockBoxApp | Image converter - Strong Password Generator & Encryption
          Tools
        </title>
        <meta
          name="description"
          content="Easily convert images to Base64 and visa versa format with LockBoxApp. Our free tool lets you encode images into Base64 for seamless integration into your applications."
        />
        <meta
          name="keywords"
          content="convert image to base64 and visa versa, image to base64 online, base64 to image, online encode image to base64, online encode base64 to image converter, free Base64 encoding tool"
        />
      </Head>
      {/* SECTION: CONVERTER MAIN HEADING */}
      <main className="main_content converter_content">
        <div className={`main__heading ${mobileDevice ? "--small-bm" : ""}`}>
          <>
            {!rootConvertType ? (
              <div data-centered-text>
                <h1 className="h1_heading">
                  Image <span className="--color-primary"> Converter </span>
                </h1>
                <div className="slogan__text mb1 mt1" data-centered-text>
                  Convert images seamlessly:{" "}
                  <span className="--color-primary">encode</span> or{" "}
                  <span className="--color-primary">decode</span> with a click
                </div>
              </div>
            ) : (
              <div>
                <ConverterHeading
                  type={rootConvertType}
                  changeConverterType={changeConverterType}
                  isDarkTheme={isDarkTheme}
                  mobileDevice={mobileDevice}
                />
              </div>
            )}
          </>
        </div>

        {/*SECTION: CONVERTER TYPES LIST (BUTTONS)*/}
        {!rootConvertType && (
          <section className={"container__limit gap-x-3"}>
            <div
              className={`flex__grid ${mobileDevice ? "--column" : ""} ${
                !mobileDevice ? "--base-gap" : ""
              } justify-center`}
            >
              {/* {mobileDevice && (
                <hr className="--base-divider x2 --bg-primary w-100 my1" />
              )} */}
              <div>
                <button
                  onClick={() => {
                    setConvertType("image");
                    router.replace("/image-converter?type=image");
                  }}
                  className={`action__btn --bg-accent --uppercase w-100
                    ${
                      mobileDevice
                        ? styles.convertTypeBageMobile
                        : styles.convertTypeBage
                    }
                  `}
                >
                  <div
                    className={`${
                      mobileDevice
                        ? "flex__grid align-center justify-center --extra_small-gap"
                        : ""
                    }`}
                  >
                    {mobileDevice && (
                      <Image src={imgTypeBageIcon} width={24} height={24} />
                    )}
                    <span> image to base64</span>
                  </div>
                </button>
                {!mobileDevice && (
                  <div
                    className={`flex__grid align-center --extra_small-gap ${styles.converterInfoBlockOne}`}
                  >
                    <Image
                      className={`${isDarkTheme ? "" : "--img-filter-invert"}`}
                      src={imgTypeBageIcon}
                      width={38}
                      height={38}
                    />
                    <p className="left">
                      Convert images for <br />
                      web usage or storage
                    </p>
                  </div>
                )}
              </div>
              {mobileDevice && (
                <hr className="--base-divider x2 --bg-primary w-100 my1" />
              )}
              <div
                className={`${
                  mobileDevice
                    ? "flex__grid align-center justify-center --extra_small-gap"
                    : ""
                }`}
              >
                <button
                  onClick={() => {
                    setConvertType("data");
                    router.replace("/image-converter?type=data");
                  }}
                  className={`action__btn --bg-accent --uppercase w-100  
                    ${
                      mobileDevice
                        ? styles.convertTypeBageMobile
                        : styles.convertTypeBage
                    }`}
                >
                  <div
                    className={`${
                      mobileDevice
                        ? "flex__grid align-center justify-center --extra_small-gap"
                        : ""
                    }`}
                  >
                    {mobileDevice && (
                      <Image src={dataTypeBageIcon} width={24} height={24} />
                    )}
                    <span> base64 to image </span>
                  </div>
                </button>
                {!mobileDevice && (
                  <div
                    className={`flex__grid align-center --extra_small-gap ${styles.converterInfoBlockTwo}`}
                  >
                    <Image
                      className={`${isDarkTheme ? "" : "--img-filter-invert"}`}
                      src={dataTypeBageIcon}
                      width={38}
                      height={38}
                    />
                    <p className="left">
                      Decode base64 strings <br /> back to images
                    </p>
                  </div>
                )}
              </div>
              {/* {mobileDevice && (
                <hr className="--base-divider x2 --bg-primary w-100 my1" />
              )} */}
            </div>
          </section>
        )}

        {/*SECTION INPUT DATA BY TYPE  */}
        {rootConvertType && rootConvertType === "image" && (
          <div className="container__limit">
            {!imageBase64 && (
              <FileInpuElement
                handleImageChange={handleImageChange}
                imageInputRef={imageInputRef}
                mobileDevice={mobileDevice}
                handleConverterType={changeConverterType}
              />
            )}
          </div>
        )}

        {/*SECTION: BASE64 TO IMAGE  */}
        {rootConvertType && rootConvertType === "data" && (
          <div
            className={`container__limit ${
              convertedFromData ? "" : "--x-small"
            }`}
          >
            {/* <p className="justify">
              <small className="">
                Paste base64 string starts from <br />
                <span className="--color-primary">
                  {"<img src='data:image/png;base64,....'/> "}
                </span>
                <br />
                or{" "}
                <span className="--color-primary">
                  {"data:image/png;base64,..."}
                </span>
              </small>
            </p> */}
            <div
              className={`${
                dataToConvert &&
                (mobileDevice
                  ? "flex__grid --column"
                  : convertedFromData
                  ? "flex__grid justify-between align-baseline"
                  : "")
              } --base-gap`}
            >
              <div className="flex__grid --column justify-between flex-1 --base-gap">
                <textarea
                  className={`${styles.codeArea} mb2 flex-1`}
                  name="text_will_convert"
                  id="textWillConvert"
                  cols="30"
                  rows={mobileDevice ? 8 : 14}
                  placeholder="Input base64 data here"
                  onInput={(e) => {
                    setDataToConvert(e.target.value);
                  }}
                  onChange={(e) => setDataToConvert(e.target.value)}
                />

                <button
                  className={
                    styles.uploadButton + " action__btn --primary-btn w100"
                  }
                  onClick={convertFromDataToImage}
                >
                  CONVERT
                </button>
              </div>
              {invalidBase64 && (
                <h3 className="center --color-accent">Invalid base64 data!</h3>
              )}
              {dataToConvert && convertedFromData && !invalidBase64 && (
                <div className={``}>
                  <div>
                    <a
                      ref={convertedFromDataLink}
                      download={`converted-image-${Date.now()}.png`}
                      className={`${
                        !mobileDevice ? styles.converterImgPreview : ""
                      } mb2 block`}
                      href={convertedFromData}
                    >
                      <Image
                        width={327}
                        height={327}
                        className="w-100 --h-auto"
                        src={convertedFromData}
                        alt="converted from base64"
                      />
                    </a>
                  </div>
                  <button
                    className={
                      styles.uploadButton + " action__btn --secondary-btn w100"
                    }
                    onClick={saveImgToFile}
                  >
                    SAVE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/*SECTION: IMAGE TO BASE64*/}
        {rootConvertType && (
          <section className={`${styles.resultBlock} container__limit gap-x-3`}>
            {imageBase64 && (
              <>
                <a
                  download={`base64-image-${Date.now()}.png`}
                  className={`${styles.converterImgPreview} mb2`}
                >
                  <img src={imageBase64} alt="chosen" />
                </a>

                <div className="flex__grid --column justify-between">
                  <div
                    className={styles.converterControlBlock}
                    data-centered-text
                  >
                    <div className="flex__grid justify-center ">
                      <UISwitcher
                        isDark={isDarkTheme}
                        options={operationOptions}
                        onSwitch={onChangeDataType}
                        elementWidth={180}
                      />
                    </div>
                    <br />
                    <div></div>
                  </div>

                  <FileInpuElement
                    handleImageChange={handleImageChange}
                    imageInputRef={imageInputRef}
                    handleConverterType={changeConverterType}
                  />
                </div>

                <div className={styles.generatedCodeBlock}>
                  <textarea
                    className={styles.codeArea}
                    value={imageBase64ForCopy}
                    ref={areaElement}
                    name="base_code"
                    id="base_code"
                    cols="30"
                    rows={mobileDevice ? 8 : 10}
                    readOnly
                    onClick={copyToClipboard}
                  />
                  <div>
                    <br />
                    <button
                      className={
                        styles.uploadButton +
                        " action__btn --secondary-btn w100"
                      }
                      onClick={copyToClipboard}
                    >
                      Copy code
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </>
  );
}; //

export default Imageconverter;

//SECTION: (TYPE pages) HEADING ELEMENT
const ConverterHeading = ({
  type,
  changeConverterType,
  isDarkTheme,
  mobileDevice,
}) => {
  return (
    <div>
      {type === "image" ? (
        <div>
          <h1 className="h1_heading" data-centered-text>
            {/* <button className="action__btn--text" onClick={changeConverterType}>
              &#8592;
            </button> */}
            <span
              className={`align-middle ${
                mobileDevice ? "" : "cursor-pointer-screen"
              } `}
              onClick={() => changeConverterType()}
            >
              <Image
                src={isDarkTheme ? backIconLight : backIconDark}
                alt="back"
                width={44}
                height={44}
              />
            </span>
            <span></span> IMAGE TO{" "}
            <span className="--color-primary">BASE64</span>
          </h1>
          <div className="h2_heading mb1 mt1" data-centered-text>
            Convert an image to BASE64
          </div>
          <small className="--base-label block center">
            ** accept{" "}
            <span className="--color-primary">png, jpeg, jpg, gif,webp</span>{" "}
          </small>
        </div>
      ) : (
        <>
          <h1 className="h1_heading " data-centered-text>
            {/* <button className="action__btn--text" onClick={changeConverterType}>
              &#8592; 
            </button> */}
            <span
              className={`align-middle bg-primary ${
                mobileDevice ? "" : "cursor-pointer-screen"
              } `}
              onClick={() => changeConverterType()}
            >
              <Image
                src={isDarkTheme ? backIconLight : backIconDark}
                alt="back"
                width={44}
                height={44}
              />
            </span>
            <span>
              {" "}
              BASE64 TO <span className="--color-primary">IMAGE</span>
            </span>
          </h1>
          <div className="h2_heading mb1 mt1" data-centered-text>
            Convert <span className="--color-primary">BASE64</span> to image
          </div>
        </>
      )}
    </div>
  );
};

//TODO: Re-write to base component
const FileInpuElement = ({
  handleImageChange,
  handleConverterType,
  imageInputRef,
  mobileDevice,
}) => {
  return (
    <div className="container__limit --x-small my2" data-centered-text>
      <input
        id="imageInput"
        className={`${styles.imageInput} ${mobileDevice ? "block" : ""}`}
        type="file"
        ref={imageInputRef}
        onChange={handleImageChange}
        assept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
      />
      <label
        className={styles.uploadButton + " action__btn"}
        htmlFor="imageInput"
      >
        UPLOAD IMAGE
      </label>
    </div>
  );
};
