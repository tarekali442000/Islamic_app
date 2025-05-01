import { useState, useEffect } from "react";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "40px",
        left: "40px",
        backgroundColor: "#2c83aa",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        fontSize: "20px",
        cursor: "pointer",
        width: "60px",
        height: "60px",
        zIndex: 1000,
        opacity: showButton ? 1 : 0,
        transform: showButton ? "translateY(0)" : "translateY(100px)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // حركة أنعم وأحلى
        pointerEvents: showButton ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTop;
