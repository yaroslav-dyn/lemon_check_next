import React, { useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import InputFileElement from "@/components/elements/input_file.element";
import styles from "@/styles/ImageConverter.module.css";
import CheckboxElement from "@/components/elements/checkbox.element";
import { calculatePositionByPosition } from "@/pages/image-converter/watermark/watermarksLogic";

const ImageWatermarkPage = () => {
  const mobileDevice = useDeviceType();
  const canvasRef = useRef(null);
  const canvasContainer = useRef(null);
  const [watermakText, setWatermarkText] = useState("lockboxapp.com");
  const [uploadedImage, setImage] = useState(null);
  const [positionObject, setPositionObject] = useState(null);
  const [settingsObject, setSettingsObject] = useState({
    color: "#000000",
    opacity: "0.8",
    fontSize: "14",
  });
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    if (uploadedImage) {
      generateWaterMarks();
      canvasContainer && (canvasContainer.current.style.maxHeight = "600px");
    }
  }, [uploadedImage]);

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
    const { color, opacity, fontSize } = settingsObject;
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
            textWidth
          );
          ctx.fillText(watermakText, xPosition, yPosition);
        }
      }
    };
  };

  const saveImage = () => {
    const fileName = 'w_marks__' + imageName || `img_${Date.now()}_watermarks.jpg`;
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
              your images effortlessly
            </div>
          </div>
        </div>

        {/*SECTION: Canvas and controls */}
        <section className={"container__limit --x-small"}>
          {/*SECTION: Uploaded image */}
          <form
            name="wtermarks_form"
            onSubmit={(e) => {
              e.preventDefault();
              generateWaterMarks();
            }}
          >
            {uploadedImage && (
              <div>
                {/* <img
                className="limit_img mb2"
                src={uploadedImage}
                alt="uploaded image"
              /> */}

                <textarea
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
                />

                <br />

                {/*SECTION: Canvas */}
                <div>
                  <label className="mb2 block" htmlFor="zoom">
                    Zoom level:
                  </label>
                  <div className="flex__grid --small-gap">
                    <span> 0.1</span>
                    <input
                      className="generator__input no-x-paddings"
                      id="zoom"
                      type="range"
                      min="0.1"
                      max="1.5"
                      step="0.1"
                      defaultValue="1"
                      onChange={handleZoom}
                    />
                    <span> 1.5</span>
                  </div>
                  <div className="flex__grid justify-center my2">
                    <button
                      id="btn"
                      className="action__btn --bg-primary mb2"
                      onClick={() => generateWaterMarks()}
                    >
                      Apply Watermarks
                    </button>
                  </div>
                </div>

                <div ref={canvasContainer} className={styles.canvasContainer}>
                  <canvas className="limit_img" ref={canvasRef} />
                </div>
              </div>
            )}

            {!uploadedImage && (
              <div className="flex__grid justify-center">
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

const ControlsPanel = ({ onChangePoistion, onChangeSettings }) => {
  const [leftTop, setleftTop] = useState(true);
  const [rightTop, setRightTop] = useState(true);
  const [centerTop, setCenterTop] = useState(true);
  const [centerCenter, setCenterCenter] = useState(true);

  const [leftBottom, setleftBottom] = useState(true);
  const [rightBottom, setRightBottom] = useState(true);
  const [centerBottom, setCenterBottom] = useState(true);

  useEffect(() => {
    onChangePoistion({
      leftTop,
      rightTop,
      centerTop,
      leftBottom,
      rightBottom,
      centerBottom,
      centerCenter,
    });
  }, [
    leftTop,
    rightTop,
    centerTop,
    leftBottom,
    rightBottom,
    centerBottom,
    centerCenter,
  ]);

  return (
    <div className="controls_panel">
      {/*NOTE: Positions */}
      <div className={styles.positionPanel}>
        <CheckboxElement
          defaultValue={true}
          idElement={`leftTop`}
          onCheck={setleftTop}
          label={`Left-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          defaultValue={true}
          idElement={`center-top`}
          onCheck={setCenterTop}
          label={`Center-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          defaultValue={true}
          idElement={`right-Top`}
          onCheck={setRightTop}
          label={`Right-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />

        <CheckboxElement
          defaultValue={true}
          idElement={`leftBottom`}
          onCheck={setleftBottom}
          label={`Left-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          defaultValue={true}
          idElement={`centerBottom`}
          onCheck={setCenterBottom}
          label={`Center-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          defaultValue={true}
          idElement={`right-bottom`}
          onCheck={setRightBottom}
          label={`Right-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          defaultValue={true}
          idElement={`centerCenter`}
          onCheck={setCenterCenter}
          label={`Center-center`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
      </div>

      <div className="flex__grid justify-between --small-gap align-center my2">
        {/*!SECTION: Color */}
        <div className="flex__grid align-center --small-gap">
          <input
            onChange={(val) =>
              onChangeSettings({ type: "color", value: val.target.value })
            }
            id="mark_color"
            type="color"
            placeholder="Choose a color"
          />
          <label htmlFor="mark_color">Color</label>
        </div>
        {/*!SECTION: Opacity */}
        <div className="flex__grid align-center --small-gap">
          <input
            id="mark_opacity"
            className="base_input"
            onChange={(val) =>
              onChangeSettings({ type: "opacity", value: val.target.value })
            }
            min={0.1}
            max={1}
            step={0.1}
            type="number"
            placeholder="opacity"
            defaultValue={0.8}
          />
          <label htmlFor="mark_opacity">Opacity</label>
        </div>
        {/*!SECTION: Font size */}
        <div className="flex__grid align-center --small-gap">
          <input
            onChange={(val) =>
              onChangeSettings({ type: "fontSize", value: val.target.value })
            }
            className="base_input"
            id="mark_font_size"
            type="number"
            min={1}
            max={200}
            step={1}
            placeholder="Font size"
            defaultValue={16}
          />
          <label htmlFor="mark_font_size">Font size</label>
        </div>
      </div>
    </div>
  );
}; //
