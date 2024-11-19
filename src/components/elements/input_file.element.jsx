
import {insureAction} from "@/services/base.services"

const InputFileElement = ({
  handleFileLoad,
  inputRef,
  title = "UPLOAD",
  accept = "*",
  mobileDevice,
  containerClasses="",
  labelClasses="",
  slug,
  insure=false
}) => {
  return (
    <div className={containerClasses}>
      <input
        id={`fileInput_${slug}`}
        className="inputClasses"
        hidden={true}
        type="file"
        onChange={(e) =>
          insure
            ? insureAction(handleFileLoad(e), "Old image will be deleted, continue ?")
            : handleFileLoad(e)
        }
        accept={accept}
      />
      <label
        className={`action__btn ${labelClasses}`}
        htmlFor={`fileInput_${slug}`}
      >
        {title}
      </label>
    </div>
  );
};
export default InputFileElement;
