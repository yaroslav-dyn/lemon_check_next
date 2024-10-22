import SwitchSelector from "react-switch-selector";
import { useState, useEffect } from "react";
import useDeviceType from "@/services/useDeviceType";

const SchemaSelectorElement = ({ onChangeTheme }) => {
  const mobileDevice = useDeviceType();

  const [currentTheme, setCurrentTheme] = useState("primary__theme");

  const sunIcon = "/assets/icons/icons8-sun-48-light.png";
  const osThemeIcon = "/assets/icons/icons8-operating-system-48-light.png";
  const moonIcon = "/assets/icons/icons8-moon-48-light.png";

  // const options = [
  //   {
  //     label: mobileDevice ? "L" : "Light",
  //     value: "light__theme",
  //     selectedBackgroundColor: "limegreen",
  //     selectedFontColor: "#fff",
  //   },
  //   {
  //     label: mobileDevice ? "A" : "Auto",
  //     value: "auto__theme",
  //     selectedBackgroundColor: "#066bc0",
  //     // currentTheme === "light__theme" ? "limegreen" : "E94E3D",
  //     selectedFontColor: "#fff",
  //   },
  //   {
  //     label: mobileDevice ? "D" :"Dark",
  //     value: "primary__theme",
  //     selectedBackgroundColor: "#E94E3D",
  //     selectedFontColor: "#fff",
  //   },
  // ];

  const options = [
    {
      label: (
        <img
          className="lb__theme_icon"
          src={sunIcon}
          style={{ width: 40, height: "auto" }}
        />
      ),
      value: "light__theme",
      selectedBackgroundColor: "limegreen",
      selectedFontColor: "#fff",
    },
    {
      label: (
        <img
          className="lb__theme_icon"
          src={osThemeIcon}
          style={{ width: 40, height: "auto" }}
        />
      ),
      value: "auto__theme",
      selectedBackgroundColor: "#066bc0",
      // currentTheme === "light__theme" ? "limegreen" : "E94E3D",
      selectedFontColor: "#fff",
    },
    {
      label: (
        <img
          className="lb__theme_icon"
          src={moonIcon}
          style={{ width: 40, height: "auto" }}
        />
      ),
      value: "primary__theme",
      selectedBackgroundColor: "#E94E3D",
      selectedFontColor: "#fff",
    },
  ];

  const onChangeSelector = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("lb_current__theme", theme);
    if (theme === "auto__theme") {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? onChangeTheme("primary__theme")
        : onChangeTheme("light__theme");
         setCurrentTheme("auto__theme");
        localStorage.setItem("lb_current__theme", "auto__theme");
    } else {
      onChangeTheme(theme);
    }

  };

  // TODO: Wierd sideeffect on all swithers
  const onChangeSystemTheme = (event) => {
    const theme = event.matches ? "primary__theme" : "light__theme";
    setCurrentTheme(theme);
    onChangeTheme(theme);
  };

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      ? "primary__theme"
      : "light__theme";
    setCurrentTheme(systemTheme);
    onChangeSelector(systemTheme);
    localStorage.setItem("lb_current__theme", "auto__theme");
  }, []);

  return (
    <div
      className="theme__selector"
      style={{ width: 'max-content', height: 'auto' }}
    >
      <SwitchSelector
        name="ThemeSelector"
        onChange={onChangeSelector}
        options={options}
        initialSelectedIndex={1}
        backgroundColor={"fff"}
        fontColor={"#fff"}
        selectedFontColor={"#fff"}
      ></SwitchSelector>
    </div>
  );
};
export default SchemaSelectorElement;
