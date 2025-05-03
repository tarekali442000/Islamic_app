import { useState, useRef, useEffect } from "react";
import mosque from "../assets/rea_mosque_icon.png";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close dropdown when toggling menu
    if (!menuOpen) {
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavLinkClick = () => {
    // Close mobile menu when a link is clicked
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu when clicking outside
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      // Close dropdown when clicking outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    // Handle resize events to reset state on larger screens
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div
          ref={menuRef}
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        >
          <Link to="/" className={styles.navLink} onClick={handleNavLinkClick}>
            الرئيسية
          </Link>
          <Link
            to="/radio"
            className={styles.navLink}
            onClick={handleNavLinkClick}
          >
            الراديو
          </Link>
          <Link
            to="/quran"
            className={styles.navLink}
            onClick={handleNavLinkClick}
          >
            القرآن الكريم
          </Link>
          <Link
            to="/hadith"
            className={styles.navLink}
            onClick={handleNavLinkClick}
          >
            أحاديث
          </Link>
          <Link
            to="/doaa"
            className={styles.navLink}
            onClick={handleNavLinkClick}
          >
            أدعية
          </Link>

          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownToggle}
              onClick={toggleDropdown}
              ref={dropdownButtonRef}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              الأذكار {dropdownOpen ? "▲" : "▼"}
            </button>
            <div
              className={`${styles.dropdownMenu} ${
                dropdownOpen ? styles.dropdownOpen : ""
              }`}
            >
              <Link
                to="/morning"
                className={styles.navLink}
                onClick={handleNavLinkClick}
              >
                الصبـــاح
              </Link>
              <Link
                to="/evening"
                className={styles.navLink}
                onClick={handleNavLinkClick}
              >
                المســـاء
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.branding}>
          <Link
            to="/"
            className={styles.navLinkLogo}
            onClick={handleNavLinkClick}
          >
            <h1 className={styles.siteName}>مواقيتي</h1>
          </Link>
          <img src={mosque} alt="شعار مواقيتي" className={styles.logo} />

          {/* زرار المينيو */}
          <button
            ref={buttonRef}
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
};
