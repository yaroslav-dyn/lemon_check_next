import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import styles from '@/styles/ImageConvertor.module.css';
import { copyToClipboardMethod } from '@/services/base.services';
import useDeviceType from '@/services/useDeviceType';
import UISwitcher from "@/components/ui.switcher";


const ImageConvertor = (props) => {
  
  const [imageBase64, setImageBase64] = useState('');
  const [imageBase64ForCopy, setTypedImageBase64] = useState('');
  const [selectedConvertedType, setSelectedConvertedType] = useState('data');
  const imageInputRef = useRef(null);
  const areaElement = useRef();
  const mobileDevice = useDeviceType();

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
    setSelectedConvertedType(type);
    if (type === 'image') {
      setTypedImageBase64(`<img src='${imageBase64}' />`);
    } else if (type === 'data') {
      setTypedImageBase64(imageBase64);
    }
  }

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
      setTypedImageBase64(reader.result);;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    copyToClipboardMethod(areaElement)
  }

  // NOTE: HTML!
  return (
    <>
      <Head>
        <title>
          LockBoxApp | Image convertor - Strong Password Generator & Encryption
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
      <main className="main_content converter_content">
        <div className={`main__heading ${mobileDevice ? "--small-bm" : ""}`}>
          <h1 className="h1_heading" data-centered-text>
            IMAGE TO <span className="--color-primary">BASE64</span>
          </h1>
          <div className="h2_heading mb2 mt1" data-centered-text>
            Convert any image to BASE64
          </div>
        </div>

        <div data-centered-text>
          <input
            id="imageInput"
            className={styles.imageInput}
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            assept={`image/*`}
          />
          <label
            className={styles.uploadButton + " action__btn"}
            htmlFor="imageInput"
          >
            UPLOAD IMAGE
          </label>
        </div>
        <section className={`${styles.resultBlock} container__limit gap-x-3`}>
          {imageBase64 && (
            <>
              <a
                download={`base64-image-${Date.now()}.png`}
                className={`${styles.convertorImgPreview} mb2`}
              >
                <img src={imageBase64} alt="chosen" />
              </a>

              <div className={styles.convertorControlBlock} data-centered-text>
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
                    className={styles.uploadButton + " action__btn w100"}
                    onClick={copyToClipboard}
                  >
                    Copy code
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}//

export default ImageConvertor;

