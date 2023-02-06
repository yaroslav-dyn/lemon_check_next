import React, { useState, useRef } from 'react';
import AppHeader from '../../components/Header.static';
import styles from '../../styles/ImageConvertor.module.css'

const ImageConvertor = () => {

  const [imageBase64, setImageBase64] = useState('');
  const imageInputRef = useRef(null);

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // NOTE: HTML!
  return (
    <>
      <AppHeader />
      <main className='main_content converter_content'>
        <h1 className="main__heading" data-centered-text> Convert image to base64 </h1>
        <div data-centered-text>
          <input id="imageInput" className={styles.imageInput} type="file" ref={imageInputRef} onChange={handleImageChange} />
          <label className={styles.uploadButton} htmlFor="imageInput">UPLOAD IMAGE</label>
        </div>
          <section className={styles.resultBlock}>
          {imageBase64 &&
            <React.Fragment>

              <a href={imageBase64} download="svg-image.svg" className={styles.convertorImgPreview}>
                <img src={imageBase64} alt="chosen" />
              </a>

              <div className={styles.convertorControlBlock} data-centered-text>
                <button className={styles.uploadButton}>Download CSV</button>
                <br />
                <button className={styles.uploadButton}>Copy code</button>  
              </div>


              <textarea 
              className={styles.codeArea} 
              value={imageBase64} 
              name="base_code" 
              id="base_code" cols="30" rows="10" 
              readOnly
              />
            </React.Fragment>
          }
        </section>
      </main>

    </>
  )
}//

export default ImageConvertor;

