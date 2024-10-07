
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

const useDeviceType = () => {
  const [mobileDevice, setDevice] = useState(false);
   useEffect(() => {
     if (isMobile) {
       setDevice(true);
     }
   }, []);

  return mobileDevice;
};

export default useDeviceType;
