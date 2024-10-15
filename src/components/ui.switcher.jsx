
import SwitchSelector from "react-switch-selector";


const UISwitcher = ({ options, onSwitch, elementWidth }) => {
  return (
    <div className="your-required-wrapper" style={{ width: elementWidth ? elementWidth : 200, height: 40 }}>
      <SwitchSelector
        onChange={onSwitch}
        options={options}
        initialSelectedIndex={0}
        backgroundColor={"#6a6565"}
        fontColor={"#ffffff"}
      />
    </div>
  );
};

export default UISwitcher;
