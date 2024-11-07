import React from "react";

function CopyIpButton({ mobileDevice, isDarkTheme, copyAction, copyIcon }) {
  return (
    <button
      className={`inline-block mr0.5 --no-style-btn ${
        mobileDevice ? "" : "cursor-pointer-screen"
      }`}
      onClick={copyAction}
    >
      <img
        className={`align-middle ${isDarkTheme ? "" : "--img-filter-invert"}`}
        style={{ width: "auto", height: "26px" }}
        src={copyIcon}
        alt="Copy Icon"
      />
    </button>
  );
}

export default CopyIpButton;
