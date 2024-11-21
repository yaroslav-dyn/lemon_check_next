import { useState } from "react";


const CheckboxElement = ({
  idElement,
  onCheck,
  label,
  containerClasses,
  labelClasses,
  inputClasses,
  defaultValue=false
}) => {
  const [inputMode, setInputMode] = useState(defaultValue);

  const updateModel = (e) => {
    setInputMode(e);
    onCheck(e);
  };

  return (
    <div className={containerClasses}>
      <div className={`custom__checkbox`}>
        <input
          id={idElement}
          className={inputClasses}
          type="checkbox"
          checked={inputMode}
          onChange={(e) => updateModel(e.target.checked)}
        />
        <label className={labelClasses} htmlFor={idElement}></label>
      </div>
      <label htmlFor={idElement}>{label}</label>
    </div>
  );
};
export default CheckboxElement;
