import React, { useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import ImageNext from "next/image";
import Link from "next/link";
import useDeviceType from "@/services/useDeviceType";
import InputFileElement from "@/components/elements/input_file.element";
import styles from "@/styles/ImageConverter.module.css";
import { calculateTextPlaceByPosition, calculateImageWatermarkPosition } from "@/services/watermarksLogic";
import { ControlsPanel } from "@/components/parts/controls-panel";
import { InstructionNote } from "@/components/parts/instruction-note";
import { isMobile } from "react-device-detect";

const backIconLight = "/assets/icons/icons8-logout-rounded-left-48.png";
const backIconDark = "/assets/icons/icons8-logout-rounded-left-48-dark.png";

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
    imageSize: '48'
  });
  const [imageName, setImageName] = useState("");
  const [zoomLevelState, setZoomLevelState] = useState("1");
  const [watermarkImageFile, setWatermarkImageFile] = useState(null);
  const [watermarkImageUrl, setWatermarkImageUrl] = useState(null);

  const isDarkTheme = useMemo(
    () => props.theme === "primary__theme",
    [props.theme]
  );


  useEffect(() => {
    if (!canvasRef || (canvasRef && !canvasRef.current)) return;
    generateWaterMarks();
  }, [positionObject, settingsObject, watermakText, watermarkImageUrl]);

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

  const uploadWatermarkImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setWatermarkImageFile(file);
      reader.onload = (event) => {
        setWatermarkImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWaterMarks = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const { color, opacity, fontSize, markGaps, imageSize, imageMarkGaps } = settingsObject;
    let calculatedFontSize = fontSize || 16;

    img.src = uploadedImage;
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw text watermark
      if (watermakText && positionObject) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.globalAlpha = parseFloat(opacity) || 0.8;
        const textWidth = ctx.measureText(watermakText).width;

        for (let side in positionObject) {
          if (positionObject[side]) {
            const { xPosition, yPosition } = await calculateTextPlaceByPosition(
              img,
              side,
              parseInt(calculatedFontSize),
              textWidth,
              markGaps
            );
            ctx.fillText(watermakText, xPosition, yPosition);
          }
        }
      }
      // Draw image watermark
      if (watermarkImageUrl && positionObject) {
        const watermarkImg = new Image();
        watermarkImg.src = watermarkImageUrl;
        watermarkImg.onload = () => {
          // Calculate proportional height based on original dimensions and new width (imageSize)
          const { naturalWidth: originalWidth, naturalHeight: originalHeight } = watermarkImg;
          const newHeight = (originalHeight / originalWidth) * imageSize;

          // Apply opacity to image watermark
          ctx.globalAlpha = parseFloat(opacity) || 0.8;
          console.log("🚀 ~ img.onload= ~ parseFloat(opacity) || 0.8:", parseFloat(opacity) || 0.8)

          for (let side in positionObject) {
            if (positionObject[side]) {
              const { xPosition, yPosition } = calculateImageWatermarkPosition(
                img,
                side,
                imageSize, 
                newHeight, 
                imageMarkGaps
              );
              // Draw the image with the new width and calculated height
              ctx.drawImage(watermarkImg, xPosition, yPosition, imageSize, newHeight);
            }
          }
        };
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
        <meta
          name="description"
          content="Enhance your images with LockBoxApp’s Watermarks Editor. Add custom text watermarks to protect your content, personalize visuals, and maintain brand identity. Adjust positions, opacity, color, and font size dynamically with our easy-to-use browser-based tool. No downloads required!"
        />
        <meta
          name="keywords"
          content="Add watermark to image online, Watermark editor, Custom watermarks for images, Online image watermark tool, Free watermark generator, Protect images with watermarks, Dynamic watermarking tool, Image editor with watermark, Personalize images online, Add text watermark to photos"
        />
      </Head>
      {/* SECTION: CONVERTER MAIN HEADING */}
      <main className="main_content converter_content">
        <div
          className={`main__heading ${mobileDevice ? "--x-small-bm " : "--x-small-bm"
            }`}
        >
          <div data-centered-text>
            <h1 className="h1_heading flex__grid justify-center --small-gap">
              <div className="">
                <Link
                  href={"/image-converter"}
                  className={`align-middle ${mobileDevice ? "" : "cursor-pointer-screen"
                    } `}
                >
                  <ImageNext
                    src={isDarkTheme ? backIconLight : backIconDark}
                    alt="back"
                    width={44}
                    height={44}
                  />
                </Link>
              </div>
              <div>
                Add<span className="--color-primary"> Watermarks </span>
              </div>
              {/* <br /> to Your Images */}
            </h1>
            <div className="slogan__text mb1 mt1" data-centered-text>
              <span className="--color-primary">Protect</span> and personalize
              your <span className="--color-primary">images</span> effortlessly
            </div>
          </div>
        </div>

        {/*SECTION: Canvas and controls */}
        <section className={``}>

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
              <br />
              <Link className="--default-link" href={`/faq#watermarks`}>
                How to Get Started
              </Link>
            </div>
          )}

          {/*SECTION: Uploaded image */}
          <form
            name="wtermarks_form"
            onSubmit={(e) => {
              e.preventDefault();
              generateWaterMarks();
            }}
          >
            {/* SECTION: LEFT PANEL */}
            {uploadedImage && (
              <div className={`${mobileDevice ? 'mt2' : 'flex__grid justify-between align-baseline gap-x-6 mt3'}`}>

                <div className={`${mobileDevice ? "" : "flex-1 "}`}>

                  <div className={`flex__grid gap-x-3 ${mobileDevice ? '--column' : 'flex__grid gap-x-3'}`} >
                    <div>
                      <label className="block mb2" htmlFor="watermakText">
                        Type your desired watermark text
                      </label>
                      <textarea
                        id="watermakText"
                        rows={1}
                        defaultValue={watermakText}
                        name="watermark-content"
                        className="generator__content--area"
                        placeholder="Enter watermark text"
                        onChange={(e) => setWatermarkText(e.target.value)}
                      />
                    </div>


                    <div>
                      <label className="block mb2" htmlFor="watermarkImage">
                        Upload watermark image (optional)
                      </label>
                      <InputFileElement
                        handleFileLoad={uploadWatermarkImage}
                        slug="watermark-image"
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                        labelClasses="center"
                        title="Upload Image Watermark"
                      />
                    </div>
                  </div>

                  <br />
                  {/*SECTION: CONTROL PANEL ELEMENT  */}
                  <ControlsPanel
                    onChangePosition={setPositionMark}
                    onChangeSettings={setSettings}
                    mobileDevice={mobileDevice}
                    isImageUploaded={!!watermarkImageFile}
                    isTextFilled={!!watermakText}
                  />
                  <br />
                  {/*SECTION: BUTTONS */}
                  {uploadedImage && (
                    <section className="container_limit no-x-paddings">

                      {/* <hr className="--base-divider  --bg-accent mb2 mt-2.4" /> */}

                      <div className={`flex__grid flex-1 align-start ${isMobile ? 'gap-x-3' : 'gap-x-6'}`}>

                        <InputFileElement
                          handleFileLoad={uplaodImage}
                          slug="watermark"
                          accept="image/png, image/jpeg, image/jpg, image/gif, image/web;capture=camera"
                          title={isMobile ? 'New image' : 'Upload new image'}
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
                </div>

                <div>
                  {/* SECTION: Canvas */}
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
                  <div 
                    ref={canvasContainer} 
                    className={`${styles.canvasContainer} ${styles.halfWidth}`}>
                    <canvas className="" ref={canvasRef} />
                  </div>
                </div>

              </div>
            )}


          </form>
        </section>
      </main>
    </>
  );
}; //
export default ImageWatermarkPage;
