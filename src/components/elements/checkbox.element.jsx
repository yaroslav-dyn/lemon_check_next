import { useState } from "react";


const CheckboxElement = ({
  idElement,
  onCheck,
  label,
  containerClasses,
  labelClasses,
  inputClasses,
  accept="image/png, image/jpeg, image/jpg, image/gif, image/webp",
}) => {
  const [inputModle, setInputModle] = useState(false);

  const updateModel = (e) => {
    setInputModle(e);
    onCheck(e);
  };

  return (
    <div className={containerClasses}>
      <div className={`custom__checkbox`}>
        <input
          id={idElement}
          className={inputClasses}
          type="checkbox"
          checked={inputModle}
          onChange={(e) => updateModel(e.target.checked)}
          accept={accept}
        />
        <label className={labelClasses} htmlFor={idElement}></label>
      </div>
      <label htmlFor={idElement}>{label}</label>
    </div>
  );
};
export default CheckboxElement;
