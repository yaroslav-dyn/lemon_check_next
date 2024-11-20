import React, { useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import InputFileElement from "@/components/elements/input_file.element";
import styles from "@/styles/ImageConverter.module.css";
import { calculatePositionByPosition } from "@/services/watermarksLogic";
import { ControlsPanel } from "@/pages/image-converter/watermark/parts/controls-panel";
import { InstructionNote } from "@/pages/image-converter/watermark/parts/instruction-note";

const ImageWatermarkPage = (props) => {
  const mobileDevice = useDeviceType();
  const canvasRef = useRef(null);
  const canvasContainer = useRef(null);
  const zoomInputRef = useRef(null);
  const [watermakText, setWatermarkText] = useState("lockboxapp.com");
  const [uploadedImage, setImage] = useState(null);
  const [positionObject, setPositionObject] = useState(null);
  const [settingsObject, setSettingsObject] = useState({
    color: "#000000",
    opacity: "0.8",
    fontSize: "16",
    markGaps: "10",
  });
  const [imageName, setImageName] = useState("");
  const [zoomLevelState, setZoomLevelState] = useState("1");

  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );

  useEffect(() => {
    if (uploadedImage) {
      generateWaterMarks();
      canvasContainer && (canvasContainer.current.style.maxHeight = "600px");
    }
  }, [uploadedImage]);

  useEffect(() => {
    if (!canvasRef || (canvasRef && !canvasRef.current)) return;
    generateWaterMarks();
  }, [positionObject, settingsObject, watermakText]);

  const uplaodImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImageName(file?.name);
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWaterMarks = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const { color, opacity, fontSize, markGaps } = settingsObject;
    let calculatedFontSize = fontSize || 16;

    img.src = uploadedImage;
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = parseFloat(opacity) || 0.8;
      const textWidth = ctx.measureText(watermakText).width;

      // if (img.width > 2000) {
      //   calculatedFontSize = 32;
      // }
      if (!positionObject) return;

      for (let side in positionObject) {
        if (positionObject[side]) {
          const { xPosition, yPosition } = await calculatePositionByPosition(
            img,
            side,
            parseInt(calculatedFontSize),
            textWidth,
            markGaps
          );
          ctx.fillText(watermakText, xPosition, yPosition);
        }
      }
    };
  };

  const getLimits = (param) => {
    const zoomElement = zoomInputRef && zoomInputRef.current;
    if (!zoomElement) return;
    switch (param) {
      case "MIN":
        return zoomElement.min;
      case "MAX":
        return zoomElement.max;
    }
  };

  const saveImage = () => {
    const fileName =
      "w_marks__" + imageName || `img_${Date.now()}_watermarks.jpg`;
    const imageUrl = canvasRef && canvasRef.current.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const setPositionMark = (pos) => {
    setPositionObject(pos);
  };

  const setSettings = (settings) => {
    const updatedSettigns = { ...settingsObject };
    updatedSettigns[settings.type] = settings.value;
    setSettingsObject(updatedSettigns);
  };

  const handleZoom = (e) => {
    const zoomLevel = e.target.value;
    setZoomLevelState(zoomLevel);
    const canvas = canvasRef && canvasRef.current;
    canvas.style.transform = `scale(${zoomLevel})`;
    canvas.style.transformOrigin = "0 0";
  };

  return (
    <>
      <Head>
        <title>LockBoxApp | Watermarks - add Watermarks Tools</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      {/* SECTION: CONVERTER MAIN HEADING */}
      <main className="main_content converter_content">
        <div className={`main__heading ${mobileDevice ? "--small-bm" : ""}`}>
          <div data-centered-text>
            <h1 className="h1_heading">
              Add<span className="--color-primary"> Watermarks </span>
              {/* <br /> to Your Images */}
            </h1>
            <div className="slogan__text mb1 mt1" data-centered-text>
              <span className="--color-primary">Protect</span> and personalize
              your <span className="--color-primary">images</span> effortlessly
            </div>
          </div>
        </div>

        {/*SECTION: Canvas and controls */}
        <section className={`${mobileDevice ? "" : "container__limit"}`}>
          {/*SECTION: Uploaded image */}
          <form
            name="wtermarks_form"
            onSubmit={(e) => {
              e.preventDefault();
              generateWaterMarks();
            }}
          >
            {uploadedImage && (
              <>
                <div className={`${mobileDevice ? "" : ""}`}>
                  <label className="block mb2" htmlFor="watermakText">
                    Type your desired watermark text
                  </label>
                  <textarea
                    id="watermakText"
                    rows={1}
                    defaultValue={watermakText}
                    name="watermark-content"
                    className="generator__content--area"
                    id="watermarkContent"
                    placeholder="Enter watermark text"
                    onChange={(e) => setWatermarkText(e.target.value)}
                  />
                  <br />
                  {/*SECTION: CONTROL PANEL ELEMENT  */}
                  <ControlsPanel
                    onChangePoistion={setPositionMark}
                    onChangeSettings={setSettings}
                    mobileDevice={mobileDevice}
                  />
                  <br />
                  {/*SECTION: Canvas */}
                  <div className="mb2">
                    <label className="mb1 block" htmlFor="zoom">
                      Zoom level: <span>{zoomLevelState}</span>
                    </label>
                    <div className="flex__grid --small-gap">
                      <span> {getLimits("MIN")}</span>
                      <input
                        ref={zoomInputRef}
                        className="generator__input no-x-paddings"
                        id="zoom"
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.1"
                        value={zoomLevelState}
                        onChange={handleZoom}
                      />
                      <span> {getLimits("MAX")}</span>
                    </div>
                  </div>
                </div>
                <div ref={canvasContainer} className={styles.canvasContainer}>
                  <canvas className="" ref={canvasRef} />
                </div>
                {/* TODO: Deprecated: changes applied automatically */}
                {/* <div className="flex__grid justify-end my2">
                  <button
                    id="btn"
                    className="action__btn --bg-primary mb2"
                    onClick={() => generateWaterMarks()}
                  >
                    Apply Watermarks
                  </button>
                </div> */}
              </>
            )}

            {!uploadedImage && (
              <div className="flex__grid --column justify-center align-center">
                <div>
                  <InstructionNote
                    isDarkTheme={isDarkTheme}
                    mobileDevice={mobileDevice}
                    title="Upload an image and follow instruction"
                  />
                </div>
                <br />
                <InputFileElement
                  handleFileLoad={uplaodImage}
                  slug="watermark"
                  accept="image/png, image/jpeg, image/jpg, image/gif, image/webp;capture=camera"
                  labelClasses="center"
                  title="Upload image"
                />
              </div>
            )}

            {/*SECTION: BUTTONS */}
            {uploadedImage && (
              <section className="container_limit no-x-paddings">
                <hr className="--base-divider 2x --bg-primary mb2 mt-2.4" />

                <div className="flex__grid justify-between flex-1 align-start">
                  <InputFileElement
                    handleFileLoad={uplaodImage}
                    slug="watermark"
                    accept="image/png, image/jpeg, image/jpg, image/gif, image/web;capture=camera"
                    title="Upload new image"
                    labelClasses={`--secondary-btn center`}
                    insure
                  />

                  <button
                    id="btn"
                    className="action__btn --bg-accent mb2"
                    onClick={() => saveImage()}
                  >
                    Save image
                  </button>
                </div>
              </section>
            )}
          </form>
        </section>
      </main>
    </>
  );
}; //
export default ImageWatermarkPage;
