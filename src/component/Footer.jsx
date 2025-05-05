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
          <a
            href="mailto:tarek.ali.hamed.amr@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TfiEmail />
          </a>
          <a
            href="https://www.linkedin.com/in/tarek-ali-652a98204/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/tarekali442000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://t.me/Tracer4by4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
          </a>
        </div>

        <p className="copyright">جميع الحقوق محفوظة © 2025</p>
      </div>
    </footer>
  );
}

export default Footer;
