import { InstructionTooltip } from "@/pages/crypto-password";
import { useState } from "react";
const infoIcon = "/assets/img/icons8-question-mark-48.png";

export const InstructionNote = ({ mobileDevice=false , isDarkTheme=false, title=''}) => {
  const [tooltipState, setTooltipState] = useState(false);
  return (
    <div className="">
      <h3
        className={`inline-block flex__grid justify-left items-center ${
          tooltipState ? "open__tooltip --color-primary" : ""
        } ${!mobileDevice ? "cursor-pointer-screen" : ""}`}
        onClick={() => {
          let toolpState = tooltipState;
          setTooltipState((toolpState = !toolpState));
        }}
      >
        <div
          className={`instruction_info_icon mr0.5 ${
            tooltipState ? "active" : ""
          }`}
        >
          <img
            className={`${isDarkTheme ? "--dark-theme" : "--light-theme"}`}
            src={infoIcon}
            width={30}
          />
        </div>
        <span className="lato-thin">{title}</span>
      </h3>
      {tooltipState && (
        <div className="absolute">
          <InstructionTooltip>
            <>
              <div class="instructions">
                <ol>
                  <li>
                    <strong>Upload Your Image:</strong> Click{" "}
                    <em>Upload New Image</em> and select the file you want to
                    watermark.
                  </li>
                  <li>
                    <strong>Customize Your Watermark:</strong>
                    <ul>
                      <li>Enter text in the input field.</li>
                      <li>Select position, color, opacity, and font size.</li>
                    </ul>
                    Changes are applied instantly as you adjust settings.
                  </li>
                  <li>
                    <strong>Preview:</strong> Use the <em>Zoom Slider</em> to
                    scale the image for better visibility. (For preview only.)
                  </li>
                  <li>
                    <strong>Save Your Image:</strong> Click <em>Save Image</em>{" "}
                    to download the image with your watermark.
                  </li>
                </ol>
              </div>
            </>
          </InstructionTooltip>
        </div>
      )}
    </div>
  );
};
