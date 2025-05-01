// import { useState } from "react";
// import mosque from "../assets/mosque.png";
// import styles from "../styles/Navbar.module.css";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.navbarContent}>
//         <div
//           className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
//         >
//           <Link to="/" className={styles.navLink}>
//             الرئيسية
//           </Link>
//           <Link to="/radio" className={styles.navLink}>
//             الراديو
//           </Link>
//           <Link to="/quran" className={styles.navLink}>
//             القرآن الكريم
//           </Link>
//           <Link to="/hadith" className={styles.navLink}>
//             أحاديث
//           </Link>
//           <Link to="/doaa" className={styles.navLink}>
//             أدعية
//           </Link>

//           <div className={styles.dropdown}>
//             <button className={styles.dropdownToggle}>الأذكار ▼</button>
//             <div className={styles.dropdownMenu}>
//               <Link to="/morning" className={styles.navLink}>
//                 الصبـــاح
//               </Link>
//               <Link to="/evening" className={styles.navLink}>
//                 المســـاء
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className={styles.branding}>
//           <Link to="/" className={styles.navLinkLogo}>
//             <h1 className={styles.siteName}>مواقيتي</h1>
//           </Link>
//           <img src={mosque} alt="شعار مواقيتي" className={styles.logo} />

//           {/* زرار المينيو */}
//           <button className={styles.menuButton} onClick={toggleMenu}>
//             {menuOpen ? "✖" : "☰"}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };
import { useState, useRef, useEffect } from "react";
import mosque from "../assets/mosque.png";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div
          ref={menuRef}
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        >
          <Link to="/" className={styles.navLink}>
            الرئيسية
          </Link>
          <Link to="/radio" className={styles.navLink}>
            الراديو
          </Link>
          <Link to="/quran" className={styles.navLink}>
            القرآن الكريم
          </Link>
          <Link to="/hadith" className={styles.navLink}>
            أحاديث
          </Link>
          <Link to="/doaa" className={styles.navLink}>
            أدعية
          </Link>

          <div className={styles.dropdown}>
            <button className={styles.dropdownToggle}>الأذكار ▼</button>
            <div className={styles.dropdownMenu}>
              <Link to="/morning" className={styles.navLink}>
                الصبـــاح
              </Link>
              <Link to="/evening" className={styles.navLink}>
                المســـاء
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.branding}>
          <Link to="/" className={styles.navLinkLogo}>
            <h1 className={styles.siteName}>مواقيتي</h1>
          </Link>
          <img src={mosque} alt="شعار مواقيتي" className={styles.logo} />

          {/* زرار المينيو */}
          <button
            ref={buttonRef}
            className={styles.menuButton}
            onClick={toggleMenu}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
};
