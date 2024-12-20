import { useState, useEffect } from "react";
import styles from "@/styles/ImageConverter.module.css";
import CheckboxElement from "@/components/elements/checkbox.element";
//NOTE: Controls panel Watermarks editor

export const ControlsPanel = ({ onChangePosition, onChangeSettings, mobileDevice }) => {
  const [leftTop, setleftTop] = useState(true);
  const [rightTop, setRightTop] = useState(true);
  const [centerTop, setCenterTop] = useState(true);
  const [centerLeft, setCenterLeft] = useState(true);
  const [centerCenter, setCenterCenter] = useState(true);
  const [centerRight, setCenterRight] = useState(true);
  const [leftBottom, setleftBottom] = useState(true);
  const [rightBottom, setRightBottom] = useState(true);
  const [centerBottom, setCenterBottom] = useState(true);

  const [opacity, setOpacity] = useState(0.8);
  const [fontSize, setFontSize] = useState(16);
  const [gap, setGap] = useState(10);
  const [tabletScreen, setTableteScreen] = useState(false);

  useEffect(() => {
    onChangePosition({
      leftTop,
      rightTop,
      centerTop,
      leftBottom,
      rightBottom,
      centerBottom,
      centerLeft,
      centerCenter,
      centerRight,
    });
    setTableteScreen(window.innerWidth <= 1180 && window.innerWidth >= 768);
  }, [
    leftTop,
    rightTop,
    centerTop,
    leftBottom,
    rightBottom,
    centerBottom,
    centerLeft,
    centerCenter,
    centerRight,
  ]);

  return (
    <div
      className={`controls_panel flex__grid --big-gap ${
        mobileDevice && !tabletScreen ? "--column" : " "
      }`}
    >
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
          idElement={`centerLeft`}
          onCheck={setCenterLeft}
          label={`Center-left`}
          containerClasses={`flex__grid --small-gap align-center`}
        />

        <CheckboxElement
          defaultValue={true}
          idElement={`centerCenter`}
          onCheck={setCenterCenter}
          label={`Center-center`}
          containerClasses={`flex__grid --small-gap align-center`}
        />

        <CheckboxElement
          defaultValue={true}
          idElement={`centerRight`}
          onCheck={setCenterRight}
          label={`Center-Right`}
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
      </div>

      <div className="flex__grid --column justify-between --small-gap my flex-1">
        <div className="flex__grid --column --base-gap">
          {/*!SECTION: Opacity */}
          <div className="flex__grid align-center --small-gap">
            <input
              id="mark_opacity"
              className="base_input"
              onChange={(val) => {
                setOpacity(val.target.value);
                onChangeSettings({ type: "opacity", value: val.target.value });
              }}
              min={0.1}
              max={1}
              step={0.1}
              type="number"
              placeholder="opacity"
              value={opacity}
            />
            <input
              id="mark_opacity"
              className="generator__input no-x-paddings"
              onChange={(val) => {
                setOpacity(val.target.value);
                onChangeSettings({ type: "opacity", value: val.target.value });
              }}
              min={0.1}
              max={1}
              step={0.1}
              type="range"
              placeholder="opacity"
              value={opacity}
            />
            <label className="col-4" htmlFor="mark_opacity">
              Opacity
            </label>
          </div>
        </div>
        <div className="flex__grid --column --base-gap">
          {/*!SECTION: Font size */}
          <div className="flex__grid align-center --small-gap">
            <input
              onChange={(val) => {
                setFontSize(val.target.value);
                onChangeSettings({ type: "fontSize", value: val.target.value });
              }}
              className="base_input"
              id="mark_font_size"
              type="number"
              min={1}
              max={200}
              step={1}
              placeholder="Font size"
              value={fontSize}
            />
            <input
              onChange={(val) => {
                setFontSize(val.target.value);
                onChangeSettings({
                  type: "fontSize",
                  value: val.target.value,
                });
              }}
              className="generator__input no-x-paddings"
              id="mark_font_size"
              type="range"
              min={1}
              max={200}
              step={1}
              placeholder="Font size"
              value={fontSize}
            />
            <label className="col-4" htmlFor="mark_font_size">
              Font size
            </label>
          </div>
          <div className="flex__grid  align-center --small-gap">
            <input
              onChange={(val) => {
                setGap(val.target.value);
                onChangeSettings({ type: "markGaps", value: val.target.value });
              }}
              className="base_input"
              id="mark_gups"
              type="number"
              min={-100}
              max={100}
              step={1}
              placeholder="Gaps from borders"
              value={gap}
            />
            <input
              className="generator__input no-x-paddings"
              onChange={(val) => {
                setGap(val.target.value);
                onChangeSettings({ type: "markGaps", value: val.target.value });
              }}
              id="mark_gups"
              type="range"
              min={-100}
              max={100}
              step={1}
              placeholder="Gaps from borders"
              value={gap}
            />
            <label className="col-4" htmlFor="mark_font_size">
              Gap from borders
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}; //


