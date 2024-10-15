import React, { useState } from "react";
import Head from "next/head";
import QRCodeCanvas from "qrcode.react";
import useDeviceType from "@/services/useDeviceType";

const QrCodeGenerator = () => {
  const [qrCodeString, setQrCodeString] = useState("");
  const [qrContent, setQrqrContent] = useState(null);
  const [withLabel, setwithLabel] = useState(null);
  const isMobile = useDeviceType();
  //const refCanvas = useRef(null);

  const setQrString = (str) => {
    setQrCodeString(str.target.value);
  };

  const generateQrCode = (e) => {
    e.preventDefault();
    try {
      if (qrCodeString && qrCodeString.length < 200) {
        setQrqrContent(qrCodeString);
      } else {
        alert('Max length of text is 199 symbols')
      }
    } catch(error) {
      console.log('error qr convert', error)
    }
  };

  const saveQrToImage = () => {
    var canvas = document.getElementById("refCanvas");
    // Convert the canvas to data
    var image = canvas.toDataURL();
    // Create a link
    var aDownloadLink = document.createElement("a");
    // Add the name of the file to the link
    aDownloadLink.download = `qr_${Date.now()}.png`;
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
  };

  return (
    <>
      <Head>
        <title>LockBox</title>
        <meta name="author" content="LockBox LTD"></meta>
        <meta
          name="description"
          content="LockBox, Strong password generator"
        />
        <meta name="keywords" content="Generate QR code" />
        <meta name="title" content="Generate QR code, QRcfrom input" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="qr__page">
        <main className="main_content qrcode__content">
          <div className="main__heading">
            <h1 className="h1_heading" data-centered-text>
              Generate <span className="--color-primary"> QR </span>
              code
            </h1>
          </div>

          <br />

          <div className={`container__limit ${isMobile ? "" : "fit-content"}`}>
            <div
              className="qrcode__content__actions generator__content--actions no-x-paddings --small-gap"
              data-centered-text
            >
              <form
                name="generatorQrForm"
                id="generatorQrForm"
                onSubmit={generateQrCode}
              >
                <label htmlFor="qrStringInput">
                  Type your text in the field bellow:
                </label>
                <div>
                  <br />
                  <textarea
                    className="generator__content--area"
                    id="qrStringInput"
                    type="text"
                    value={qrCodeString}
                    onInput={setQrString}
                    onBlur={generateQrCode}
                  ></textarea>
                </div>
              </form>

              <br />

              {qrContent && (
                <QRCodeCanvas
                  id="refCanvas"
                  marginSize={1}
                  value={qrContent}
                  size={isMobile ? "80" : "220"}
                  bgColor="#f2e302"
                />
              )}
              {withLabel && <i>qrContent</i>}

              <br />
              <div>
                {qrContent && (
                  <button
                    id="btn"
                    className="generator__content--btn"
                    onClick={saveQrToImage}
                  >
                    Save QR
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default QrCodeGenerator;
