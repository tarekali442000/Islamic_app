import { useEffect, useState } from "react";
import { Navbar } from "./component/Navbar";
import Home from "./pages/Home";
import AzkarList from "./pages/AzkarList";
import sabah from "./assets/sunny-svg.svg";
import masaa from "./assets/night-svgrepo-com.svg";
import dua from "./assets/dua-hands-svg.svg";
import ScrollToTop from "./component/ScrollToTop";
import RadioList from "./pages/RadioList";
import HadithList from "./pages/HadithList";
import QuranPage from "./pages/QuranPage";
import Footer from "./component/Footer";
import AutoScrollTop from "./component/AutoScrollTop";
import { Routes, Route } from "react-router-dom";

function App() {
  const [azkarAlsabah, setAzkarAlsabah] = useState([]);
  const [azkarAlmassa, setAzkarAlmassa] = useState([]);
  const [doaa, setDoaa] = useState([]);
  const [loading, setLoading] = useState(false);
  // جلب البيانات من API عند تشغيل المكون
  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json"
        );
        const data = await response.json();
        setLoading(false);
        const alsabah = data["أذكار الصباح"]?.[0] || [];
        const almasaa = data["أذكار المساء"] || [];
        const doaaRaw = data["أدعية الأنبياء"] || [];
        const doaaCleaned = doaaRaw.map((item) => {
          const content = item.content
            .replace(/\\n/g, "\n")
            .replace(/(,\s*['"])+/g, "")
            .replace(/^"|"$/g, "");

          return {
            ...item,
            content,
          };
        });
        setAzkarAlsabah(alsabah);
        setAzkarAlmassa(almasaa);
        setDoaa(doaaCleaned);
      } catch (error) {
        console.error("فشل تحميل الأذكار:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAzkar();
  }, []);

  return (
    <>
      <AutoScrollTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/morning"
          element={
            <AzkarList
              title="أذكار الصباح"
              azkarData={azkarAlsabah}
              id="morning"
              azkarIcon={sabah}
            />
          }
        />
        <Route
          path="/evening"
          element={
            <AzkarList
              title="أذكار المساء"
              azkarData={azkarAlmassa}
              id="evening"
              azkarIcon={masaa}
            />
          }
        />
        <Route
          path="/doaa"
          element={
            <AzkarList
              title="أدعية"
              azkarData={doaa}
              id="doaa"
              azkarIcon={dua}
            />
          }
        />
        <Route path="/radio" element={<RadioList id="radio" />} />
        <Route path="/hadith" element={<HadithList id="hadith" />} />
        <Route path="/quran" element={<QuranPage />} />
      </Routes>
      <Footer id="about" />
      <ScrollToTop />
    </>
  );
}

export default App;
