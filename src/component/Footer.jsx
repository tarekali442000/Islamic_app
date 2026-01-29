import "../styles/Footer.css"; // هنربط ملف الـ CSS هنا
import { FaLinkedinIn, FaGithub, FaTelegramPlane } from "react-icons/fa"; // أيقونات
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
function Footer({ id }) {
  return (
    <footer className="footer" id={id}>
      <div className="footer-container">
        <h2 className="footer-title">
          "وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنْفَعُ الْمُؤْمِنِينَ"
        </h2>
        <div className="footer-links">
          <Link to="/" className="footer-btn">
            الرئيسية
          </Link>
          <Link to="/radio" className="footer-btn">
            الراديو
          </Link>

          <Link to="/quran" className="footer-btn">
            المصحف
          </Link>
          <Link to="/hadith" className="footer-btn">
            السنة
          </Link>
          <Link to="/doaa" className="footer-btn">
            أدعية
          </Link>

          <Link to="/morning" className="footer-btn">
            أذكار الصباح
          </Link>
          <Link to="/evening" className="footer-btn">
            أذكار المساء
          </Link>
        </div>

        <div className="social-links">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <TfiEmail />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaLinkedinIn />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaGithub />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <FaTelegramPlane />
          </a>
        </div>

        <p className="copyright">جميع الحقوق محفوظة © 2026</p>
      </div>
    </footer>
  );
}

export default Footer;
