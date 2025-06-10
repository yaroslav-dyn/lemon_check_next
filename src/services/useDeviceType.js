

import React, { useState, useEffect } from "react";
import { isMobile, isTablet } from "react-device-detect";

const useDeviceType = () => {
  const [mobileDevice, setDevice] = useState(false);

   useEffect(() => {
     if (isMobile) {
       setDevice(true);
     }
   }, []);

  return mobileDevice;
};

export const useTabletType = () => {
  const [tabletDevice, setTabletDevice] = useState(false);
  useEffect(() => {
    if (isTablet) {
      setTabletDevice(true)
    }
  }, []);
  return tabletDevice;
}

export default useDeviceType;
