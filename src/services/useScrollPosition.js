import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = (e) => {
    if (!e.target) return;
    const target = e.target;
    setScrollTop(target?.documentElement?.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return scrollTop;
};

export default useScrollPosition;
