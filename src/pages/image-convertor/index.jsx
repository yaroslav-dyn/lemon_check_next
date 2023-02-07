import React, { useState, useRef } from 'react';
import AppHeader from '../../components/Header.static';
import styles from '../../styles/ImageConvertor.module.css'
import { copyToClipboardMethod } from '@/services/base.services'

const ImageConvertor = () => {

  const [imageBase64, setImageBase64] = useState('');
  const [imageBase64ForCopy, setTypedImageBase64] = useState('');
  const [selectedConvertedType, setSelectedConvertedType] = useState('data');
  const imageInputRef = useRef(null);
  const areaElement = useRef();


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
      <AppHeader />
      <main className='main_content converter_content'>
        <h1 className="main__heading" data-centered-text> Convert image to base64 </h1>
        <div data-centered-text>
          <input id="imageInput" className={styles.imageInput} type="file" ref={imageInputRef} onChange={handleImageChange} />
          <label className={styles.uploadButton + ' action__btn'} htmlFor="imageInput">UPLOAD IMAGE</label>
        </div>
        <section className={styles.resultBlock}>
          {imageBase64 &&
            <React.Fragment>

              <a href={imageBase64}
                download={`base64-image-${Date.now()}.png`}
                className={styles.convertorImgPreview}>
                <img src={imageBase64} alt="chosen" />
              </a>

              <div
                className={styles.convertorControlBlock}
                data-centered-text>
                <button
                  className={styles.uploadButton + ' action__btn'}
                  onClick={copyToClipboard}
                >
                  Download CSV
                </button>
                <br />
                <button
                  className={styles.uploadButton + ' action__btn'}>
                  Copy code
                </button>
              </div>

              <div className={styles.generatedCodeBlock}>

                <div>
                  <input
                    type="radio"
                    id="dataType"
                    name="base64CodeType"
                    value="data"
                    checked={selectedConvertedType === 'data'}
                    onChange={onChangeDataType} />
                  <label htmlFor="dataType">Like data</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="imageType"
                    name="base64CodeType"
                    value="image"
                    checked={selectedConvertedType === 'image'}
                    onChange={onChangeDataType} />
                  <label htmlFor="imageType">Like image</label>
                </div>

                <br />

                <textarea
                  className={styles.codeArea}
                  value={imageBase64ForCopy}
                  ref={areaElement}
                  name="base_code"
                  id="base_code" cols="30" rows="10"
                  readOnly
                  onClick={copyToClipboard}
                />
              </div>

            </React.Fragment>
          }
        </section>
      </main>

    </>
  )
}//

export default ImageConvertor;  

