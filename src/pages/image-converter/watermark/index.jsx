import React, { useState, useMemo, useRef, useEffect } from "react";
import Head from "next/head";
import useDeviceType from "@/services/useDeviceType";
import InputFileElement from "@/components/elements/input_file.element";
import styles from "@/styles/ImageConverter.module.css";
import CheckboxElement from "@/components/elements/checkbox.element";

const ImageWatermarkPage = () => {
  const mobileDevice = useDeviceType();
  const canvasRef = useRef(null);
  const [watermakText, setWatermarkText] = useState("Test it text!");
  const [uploadedImage, setImage] = useState(null);
  const [positionObject, setPositionObject] = useState(null);

  useEffect(() => {
    if (uploadedImage) {
      generateWaterMarks();
    }
  }, [uploadedImage]);

  const uplaodImage = (e) => {
    console.log("img", e.target.value);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const calculatePositionByPosition = async (image, position, fontSize) => {
    const wmLengthFactor = watermakText && watermakText.length;
    let sideFactor = {};

    switch (position) {
      case "leftTop":
        sideFactor = { xPosition: 10, yPosition: fontSize };
        break;
      case "centerTop":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor,
          yPosition: fontSize,
        };
        break;
      case "rightTop":
        sideFactor = {
          xPosition:
            image.width - (wmLengthFactor + (wmLengthFactor + fontSize)),
          yPosition: fontSize,
        };
        break;
      case "leftBottom":
        sideFactor = { xPosition: 10, yPosition: image.height - fontSize };
        break;
      case "centerBottom":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor,
          yPosition: image.height - fontSize,
        };
        break;
      case "rightBottom":
        sideFactor = {
          xPosition:
            image.width - (wmLengthFactor + (wmLengthFactor + fontSize)),
          yPosition: image.height - fontSize,
        };
        break;
    }
    return sideFactor;
  };


  const generateWaterMarks = (fontSize) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const calculatedFontSize = fontSize || 30;
    const wmLengthFactor = watermakText && watermakText.length;

    img.src = uploadedImage;
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = `${calculatedFontSize}px inherit`;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

      if (!positionObject) return;

      for (let side in positionObject) {
        if (positionObject[side]) {
          const { xPosition, yPosition } = await calculatePositionByPosition(
            img,
            side,
            calculatedFontSize
          );
          console.log("calc pos", xPosition, yPosition, positionObject);
          
          ctx.fillText(watermakText, xPosition, yPosition);
        }
      }
    };
  };

  const setPositionMark = (pos) => {
    setPositionObject(pos);
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

        {/*SECTION: Canvas and congtrols*/}
        <section className={"container__limit --x-small"}>
          {/*SECTION: Uploaded image */}
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
              <ControlsPanel onChangePoistion={setPositionMark} />

              <br />

              {/*SECTION: Canvas */}
              <div className={styles.canvasContainer}>
                <canvas className="limit_img" ref={canvasRef}></canvas>
              </div>
            </div>
          )}

          {!uploadedImage && (
            <div className="flex__grid justify-center">
              <InputFileElement
                handleFileLoad={uplaodImage}
                slug="watermark"
                accept=""
                labelClasses="center"
                title="Upload image"
              />
            </div>
          )}

          {uploadedImage && (
            <section className="container_limit no-x-paddings">
              <hr className="--base-divider 2x --bg-primary mb2 mt-2.4" />

              <div className="flex__grid justify-between flex-1 ">
                <InputFileElement
                  handleFileLoad={uplaodImage}
                  slug="watermark"
                  accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                  title="Upload image"
                  labelClasses={`--secondary-btn center`}
                />

                <button
                  id="btn"
                  className="action__btn mb2"
                  onClick={() => generateWaterMarks()}
                >
                  Apply Watermark
                </button>
              </div>
            </section>
          )}

          {/* <div className="py2 container__limit --x-small no-x-paddings">
            <div className="flex__grid justify-between">
              <InputFileElement
                handleFileLoad={uplaodImage}
                slug="watermark"
                accept=""
              />
            </div>
            {/* <button
              id="btn"
              className="generator__content--btn --small-margin --secondary-btn"
              onClick={() => copyToClipBoard()}
            >
              Copy
            </button>
          </div> */}

          {/* <canvas className="limit_img" ref={canvasRef}></canvas> */}
        </section>
      </main>
    </>
  );
}; //
export default ImageWatermarkPage;

const ControlsPanel = ({ onChangePoistion }) => {
  const [leftTop, setleftTop] = useState(false);
  const [rightTop, setRightTop] = useState(false);
  const [centerTop, setCenterTop] = useState(false);

    const [leftBottom, setleftBottom] = useState(false);
    const [rightBottom, setRightBottom] = useState(false);
    const [centerBottom, setCenterBottom] = useState(false);

  useEffect(() => {
    onChangePoistion({
      leftTop,
      rightTop,
      centerTop,
      leftBottom,
      rightBottom,
      centerBottom,
    });
  }, [leftTop, rightTop, centerTop, leftBottom, rightBottom, centerBottom]);

  return (
    <div className="controls_panel">
      <div className={styles.positionPanel}>
        <CheckboxElement
          idElement={`leftTop`}
          onCheck={setleftTop}
          label={`Left-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          idElement={`center-top`}
          onCheck={setCenterTop}
          label={`Center-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          idElement={`right-Top`}
          onCheck={setRightTop}
          label={`Right-top`}
          containerClasses={`flex__grid --small-gap align-center`}
        />

        <CheckboxElement
          idElement={`leftBottom`}
          onCheck={setleftBottom}
          label={`Left-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          idElement={`centerBottom`}
          onCheck={setCenterBottom}
          label={`Center-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
        <CheckboxElement
          idElement={`right-bottom`}
          onCheck={setRightBottom}
          label={`Right-bottom`}
          containerClasses={`flex__grid --small-gap align-center`}
        />
      </div>
    </div>
  );
}; //
