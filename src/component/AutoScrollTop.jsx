import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // عشان يطلع بسلاسة
    });
  }, [pathname]);

  return null;
};

export default AutoScrollTop;
