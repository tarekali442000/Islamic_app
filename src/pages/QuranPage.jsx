import React, { useEffect, useState } from "react";
import "../styles/QuranPage.css";

const QuranPage = () => {
  const [selectedSurah, setSelectedSurah] = useState(1); // سورة الفاتحة
  const [allSurahs, setAllSurahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const ayahsPerPage = 10;
  const [surahAyahs, setSurahAyahs] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json")
      .then((res) => res.json())
      .then((data) => {
        setAllSurahs(data); // كل السور
        const selected = data.find((s) => s.id === selectedSurah);
        setSurahAyahs(selected.verses);
        setCurrentIndex(0);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allSurahs.length > 0) {
      const selected = allSurahs.find((s) => s.id === selectedSurah);
      setSurahAyahs(selected.verses);
      setCurrentIndex(0);
    }
  }, [selectedSurah, allSurahs]);

  const handleNext = () => {
    const nextIndex = currentIndex + ayahsPerPage;
    if (nextIndex < surahAyahs.length) {
      setCurrentIndex(nextIndex);
    } else if (selectedSurah < 114) {
      setSelectedSurah((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - ayahsPerPage;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    } else if (selectedSurah > 1) {
      setSelectedSurah((prev) => prev - 1);
    }
  };

  return (
    <div className="quran-page">
      <h2>القرآن الكريم</h2>

      <select
        className="surah-selector"
        value={selectedSurah}
        onChange={(e) => setSelectedSurah(Number(e.target.value))}
      >
        {allSurahs.map((surah) => (
          <option key={surah.id} value={surah.id}>
            {surah.name}
          </option>
        ))}
      </select>

      <div className="ayahs-container">
        {loading ? (
          <div className="loader"></div>
        ) : (
          surahAyahs.length > 0 && (
            <>
              {selectedSurah !== 1 &&
                selectedSurah !== 9 &&
                currentIndex === 0 && (
                  <p
                    className="ayahs-text"
                    style={{ fontWeight: "bold", fontSize: "1.7rem" }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                )}
              <p className="ayahs-text">
                {surahAyahs
                  .slice(currentIndex, currentIndex + ayahsPerPage)
                  .map((ayah) => `${ayah.text} (${ayah.id})`)
                  .join(" ")}
              </p>
            </>
          )
        )}
      </div>

      <div className="pagination-buttons">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          السابق
        </button>
        <button onClick={handleNext}>التالي</button>
      </div>
    </div>
  );
};

export default QuranPage;
