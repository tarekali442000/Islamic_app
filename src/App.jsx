import { useEffect, useState } from "react";
import { Navbar } from "./component/Navbar";
import Home from "./pages/Home";
import AzkarList from "./pages/AzkarList";
import sabah from "./assets/sunny-svg.svg";
import masaa from "./assets/night-svgrepo-com.svg";
import estiqazIcon from "./assets/wake-up-svgrepo-com.svg";
import sleepIcon from "./assets/sleep-in-bed-sleep-nap-rest-svgrepo-com.svg";
import afterSalahIcon from "./assets/salah.png";
import tasbeehIcon from "./assets/tasbeeh.png";
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
  const [estiqaz, setEstiqaz] = useState([]);
  const [sleep, setSleep] = useState([]);
  const [afterSalah, setAfterSalah] = useState([]);
  const [tasbeeh, setTasbeeh] = useState([]);
  const [doaa, setDoaa] = useState([]);
  // جلب البيانات من API عند تشغيل المكون
  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json"
        );
        const data = await response.json();
        const alsabahRaw = data["أذكار الصباح"] || [];
        const alsabahAll = Array.isArray(alsabahRaw[0])
          ? [...alsabahRaw[0], ...alsabahRaw.slice(1)]
          : alsabahRaw;
        const alsabah = alsabahAll.filter((item) => item.category !== "stop");
        const almasaa = data["أذكار المساء"] || [];
        const estiqaz = data["أذكار الاستيقاظ"] || [];
        const sleep = data["أذكار النوم"] || [];
        const afterSalah = data["أذكار بعد السلام من الصلاة المفروضة"] || [];
        const tasbeeh = data["تسابيح"] || [];
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
        setEstiqaz(estiqaz);
        setSleep(sleep);
        setAfterSalah(afterSalah);
        setTasbeeh(tasbeeh);
        setDoaa(doaaCleaned);
      } catch (error) {
        console.error("فشل تحميل الأذكار:", error);
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
          path="/estiqaz"
          element={
            <AzkarList
              title="أذكار الإستيقاظ"
              azkarData={estiqaz}
              id="estiqaz"
              azkarIcon={estiqazIcon}
            />
          }
        />
        <Route
          path="/sleep"
          element={
            <AzkarList
              title="أذكار النوم"
              azkarData={sleep}
              id="sleep"
              azkarIcon={sleepIcon}
            />
          }
        />
        <Route
          path="/after-salah"
          element={
            <AzkarList
              title="أذكار بعد السلام من الصلاة المفروضة"
              azkarData={afterSalah}
              id="after-salah"
              azkarIcon={afterSalahIcon}
            />
          }
        />
        <Route
          path="/tasbeeh"
          element={
            <AzkarList
              title="تسابيح"
              azkarData={tasbeeh}
              id="tasbeeh"
              azkarIcon={tasbeehIcon}
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
