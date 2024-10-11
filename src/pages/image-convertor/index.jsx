import React, { useState, useRef } from 'react';
import styles from '@/styles/ImageConvertor.module.css';
import { copyToClipboardMethod } from '@/services/base.services';
import useDeviceType from '@/services/useDeviceType';



const ImageConvertor = () => {
  
  const [imageBase64, setImageBase64] = useState('');
  const [imageBase64ForCopy, setTypedImageBase64] = useState('');
  const [selectedConvertedType, setSelectedConvertedType] = useState('data');
  const imageInputRef = useRef(null);
  const areaElement = useRef();
  const mobileDevice = useDeviceType();

  const onChangeDataType = (type) => {
    setSelectedConvertedType(type.target.value);
    if (type.target.value === 'image') {
      setTypedImageBase64(`<img src='${imageBase64}' />`);
    } else if (type.target.value === 'data') {
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
          />
          <label
            className={styles.uploadButton + " action__btn"}
            htmlFor="imageInput"
          >
            UPLOAD IMAGE
          </label>
        </div>
        <section className={styles.resultBlock}>
          {imageBase64 && (
            <>
              <a
                download={`base64-image-${Date.now()}.png`}
                className={styles.convertorImgPreview}
              >
                <img src={imageBase64} alt="chosen" />
              </a>

              <div className={styles.convertorControlBlock} data-centered-text>
                <div className="flex__grid justify-center">
                  <div className={styles.codeTypeBoxes}>
                    <input
                      className={styles.codeTypeBoxesCheckbox}
                      type="radio"
                      id="dataType"
                      name="base64CodeType"
                      value="data"
                      checked={selectedConvertedType === "data"}
                      onChange={onChangeDataType}
                    />
                    <label htmlFor="dataType">Like data</label>
                  </div>

                  <div>
                    <input
                      className={styles.codeTypeBoxesCheckbox}
                      type="radio"
                      id="imageType"
                      name="base64CodeType"
                      value="image"
                      checked={selectedConvertedType === "image"}
                      onChange={onChangeDataType}
                    />
                    <label htmlFor="imageType">Like image</label>
                  </div>
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

