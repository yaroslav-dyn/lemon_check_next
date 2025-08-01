import React, { useState, useEffect } from "react";
import Head from "next/head";
import {QRCodeCanvas} from "qrcode.react";
import useDeviceType from "@/services/useDeviceType";

const QrCodeGenerator = () => {
  const isMobile = useDeviceType();
  const [qrCodeString, setQrCodeString] = useState("");
  const [qrContent, setQrqrContent] = useState(null);
  const [qrSize, setQrSize] = useState(isMobile ? "80" : "220");
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  
  const [withLabel, setwithLabel] = useState(null);

  //const refCanvas = useRef(null);

  useEffect(() => {
    isMobile ? setQrSize("80") : setQrSize("220");
  }, [isMobile]);

  const setQrString = (str) => {
    setQrCodeString(str.target.value);
  };

  const generateQrCode = (e) => {
    e.preventDefault();
    if (!qrCodeString) {
      setQrqrContent(null)
      return;
    } 
      try {
        if (qrCodeString && qrCodeString.length < 200) {
          setQrqrContent(qrCodeString);
        } else {
          alert("Max length of text is 199 symbols");
        }
      } catch (error) {
        console.log("error qr convert", error);
      }
  };

  const changeQrCanvasSize = (e) => {
    setQrSize(e.target.value);
    setQrqrContent(null);
    generateQrCode(e);
  }

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
        <title>
          LockBoxApp | QR code generator - Strong Password Generator & Encryption
          Tools
        </title>
        <meta
          name="description"
          content="Generate custom QR codes with LockBoxApp's online QR code generator. Create QR codes for websites, WiFi, contact info, and more."
        />
        <meta
          name="keywords"
          content="QR code generator, create QR codes, custom QR codes, free QR code generator, generate QR code online"
        />
      </Head>

      <div className="qr__page">
        <main className="main_content qrcode__content">
          <div className={`main__heading ${isMobile ? "--small-bm" : ""}`}>
            <h1 className="h1_heading" data-centered-text>
              Generate <span className="--color-primary"> QR </span>
              code
            </h1>
          </div>

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
                    onChange={generateQrCode}
                    onBlur={generateQrCode}
                  ></textarea>
                </div>
              </form>

              <br />

              <div className="flex__grid align-baseline --base-gap">

                <div className="flex__grid align-center --small-gap">
                  <label htmlFor="mark_color">Color</label>
                  <input
                    defaultValue={qrBgColor}
                    onChange={(val) =>
                      setQrBgColor(val.target.value)
                    }
                    id="mark_color"
                    type="color"
                    placeholder="Choose a color"
                  />
                </div>

                <div className="flex__grid --small-gap">
                  <label htmlFor="qrSize">Size </label>

                  <input
                    className="generator__input no-x-paddings"
                    id="qrSize"
                    type="range"
                    min="10"
                    max="400"
                    step="1"
                    value={qrSize}
                    onChange={changeQrCanvasSize}
                  />
                  <span>{qrSize}</span>
                </div>

              </div>

              <br />

              {qrContent && (
                <div className="overflow-block">
                  <QRCodeCanvas
                    id="refCanvas"
                    value={qrContent}
                    size={qrSize}
                    bgColor={qrBgColor}
                  />
                </div>
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
