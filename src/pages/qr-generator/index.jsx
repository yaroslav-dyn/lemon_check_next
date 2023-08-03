import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import QRCodeCanvas from 'qrcode.react';



const QrCodeGenerator = () => {

  const [qrCodeString, setQrCodeString] = useState('');
  const [qrContent, setQrqrContent] = useState(null);
  const [withLabel, setwithLabel] = useState(null);

  //const refCanvas = useRef(null);



  const setQrString = (str) => {
    setQrCodeString(str.target.value);
  }

  const generateQrCode = (e) => {
    e.preventDefault();
    setQrqrContent(qrCodeString);
  }

  const saveQrToImage = () => {
    const canvasElement = document.getElementById('refCanvas');
    const image = canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    console.log('image', image);    
    window.location.href = image;
  }

  return (
    <>
      <Head>
        <title>LemonCheck</title>
        <meta name="author" content="LemonCheck LTD"></meta>
        <meta name="description" content="LemonCheck, Strong password generator" />
        <meta name="keywords" content="Generate QR code" />
        <meta name="title" content="Generate QR code, QRcfrom input" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="qr__page">
        <main className="main_content qrcode__content">

          <h1 className="main__heading" data-centered-text>Generate QR code</h1>

          <br />

          <div className='qrcode__content__actions generator__content--actions' data-centered-text>
            <form
              name="generatorQrForm"
              id="generatorQrForm"
              onSubmit={generateQrCode}
            >
              <label htmlFor="qrStringInput">Type your text in the field bellow:</label>
              <div>
                <br />
                <textarea
                  className="generator__content--area"
                  id="qrStringInput"
                  type="text"
                  value={qrCodeString}
                  onInput={setQrString}
                  onBlur={generateQrCode}>
                </textarea>
              </div>
            </form>

            <br />

            {qrContent &&
              <QRCodeCanvas
                id="refCanvas"
                marginSize="1"
                value={qrContent}
                size="180"
                bgColor="#f2e302"
              />
            }
            {withLabel &&
              <i>qrContent</i>
            }

            <br />
            <div>
              {qrContent &&
                <button
                  id="btn"
                  className="generator__content--btn"
                  onClick={saveQrToImage}
                >
                  Save QR
                </button>
              }
            </div>

          </div>
        </main>
      </div>

    </>
  );
}

export default QrCodeGenerator;