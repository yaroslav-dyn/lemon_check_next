
import { useState, useEffect } from "react";
import SwitchSelector from "react-switch-selector";


const UISwitcher = ({ options, onSwitch, elementWidth }) => {

const [currentColorTheme, setCurrentTheme] = useState("auto__theme");


useEffect(() => {
  const themeFromStorage = localStorage.getItem("lb_current__theme");
  setCurrentTheme(themeFromStorage);
  console.log("ct", themeFromStorage);
}, [currentColorTheme]);


  return (
    <div
      className="your-required-wrapper"
      style={{ width: elementWidth ? elementWidth : 200, height: 40 }}
    >
      <SwitchSelector
        name='componentSelector'
        onChange={onSwitch}
        options={options}
        initialSelectedIndex={0}
        backgroundColor={"#000"}
        fontColor={"#ffffff"}
      />
    </div>
  );
};

export default UISwitcher;
