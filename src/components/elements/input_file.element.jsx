
const InputFileElement = ({
  handleFileLoad,
  inputRef,
  title = "UPLOAD",
  accept = "*",
  mobileDevice,
  containerClasses="",
  labelClasses="",
  slug
}) => {
  return (
    <div className={containerClasses}>
      <input
        id={`fileInput_${slug}`}
        className="inputClasses"
        hidden={true}
        type="file"
        onChange={handleFileLoad}
        accept={accept}
      />
      <label className={`action__btn ${labelClasses}`} htmlFor={`fileInput_${slug}`}>
        {title}
      </label>
    </div>
  );
};
export default InputFileElement;
