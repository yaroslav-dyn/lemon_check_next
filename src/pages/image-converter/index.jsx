import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import styles from "@/styles/Imageconverter.module.css";
import { copyToClipboardMethod, base64ToImage } from "@/services/base.services";
import useDeviceType from "@/services/useDeviceType";
import UISwitcher from "@/components/ui.switcher";

const Imageconverter = (props) => {
  const [imageBase64, setImageBase64] = useState("");
  const [rootConvertType, setConvertType] = useState(undefined);
  const [imageBase64ForCopy, setTypedImageBase64] = useState("");
  const [dataToConvert, setDataToConvert] = useState("");
  const [convertedFromData, setConvertedFromData] = useState("");
  const [invalidBase64, setBase64invalidState] = useState("");
  const [selectedConvertedType, setSelectedConvertedType] = useState("data");
  const imageInputRef = useRef(null);
  const areaElement = useRef();
  const convertedFromDataLink = useRef(null);
  const mobileDevice = useDeviceType();

  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );

  const operationOptions = [
    {
      label: "Like image",
      value: "image",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
    {
      label: "Like data",
      value: "data",
      selectedBackgroundColor: !isDarkTheme ? "limegreen" : "#E94E3D",
      fontColor: !isDarkTheme ? "#000" : "#fff",
      selectedFontColor: "#fff",
    },
  ];

  const onChangeDataType = (type) => {
    setSelectedConvertedType(type);
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
      if(!blobFromData) {
        setBase64invalidState(true)
        setConvertedFromData("");
        return
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

  const changeConverterType = () => {
    setImageBase64("");
    setConvertedFromData("");
    setBase64invalidState(false);
    setConvertType(undefined);
  };

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
          content="Easily convert images to Base64 format with LockBoxApp. Our free tool lets you encode images into Base64 for seamless integration into your applications."
        />
        <meta
          name="keywords"
          content="convert image to base64, image to base64 online, encode image to base64, Base64 converter, free Base64 encoding tool"
        />
      </Head>
      //SECTION: CONVERTER HEADING
      <main className="main_content converter_content">
        <div className={`main__heading ${mobileDevice ? "--small-bm" : ""}`}>
          <>
            {!rootConvertType ? (
              <div data-centered-text>
                <h1 className="h1_heading --uppercase">
                  image <span className="--color-primary"> Converter </span>
                </h1>
                {/* <div className="h2_heading mb1 mt1" data-centered-text>
                  Choose an option
                </div> */}
              </div>
            ) : (
              <div>
                <ConverterHeading
                  type={rootConvertType}
                  changeConverterType={changeConverterType}
                />
              </div>
            )}
          </>
        </div>

        {/*SECTION: CONVERTER TYPE  */}
        {!rootConvertType && (
          <section className={"container__limit gap-x-3"}>
            <div
              className={`flex__grid ${
                mobileDevice ? "--column" : ""
              } --base-gap justify-center`}
            >
              <button
                onClick={() => setConvertType("image")}
                className={`action__btn --secondary-btn 
                  ${
                    mobileDevice
                      ? styles.convertTypeBageMobile
                      : styles.convertTypeBage
                  }
                }`}
              >
                image to base64
              </button>
              <button
                onClick={() => setConvertType("data")}
                className={`action__btn --secondary-btn
                  ${
                    mobileDevice
                      ? styles.convertTypeBageMobile
                      : styles.convertTypeBage
                  }`}
              >
                base64 to image{" "}
              </button>
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
            <div
              className={`${
                dataToConvert &&
                (mobileDevice
                  ? "flex__grid --column"
                  : convertedFromData
                  ? "flex__grid justify-between align-baseline"
                  : "")
              }`}
            >
              <div className="flex__grid --column justify-between ">
                <textarea
                  className={`${styles.codeArea} mb2`}
                  name="text_will_convert"
                  id="textWillConvert"
                  cols="30"
                  rows={mobileDevice ? 8 : 10}
                  placeholder="Input base64 data"
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
              {convertedFromData && !invalidBase64 && (
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
                      <img
                        className="w-100"
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

//SECTION: HEADING ELEMENT
const ConverterHeading = ({ type, changeConverterType }) => {
  return (
    <div>
      {type === "image" ? (
        <div>
          <h1 className="h1_heading" data-centered-text>
            <button className="action__btn--text" onClick={changeConverterType}>
              &#8592;
            </button>
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
          <h1 className="h1_heading" data-centered-text>
            <button className="action__btn--text" onClick={changeConverterType}>
              &#8592;
            </button>
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
