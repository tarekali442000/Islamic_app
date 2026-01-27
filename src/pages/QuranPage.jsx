import React, { useEffect, useState, useRef } from "react";
import "../styles/QuranPage.css";

const QuranPage = () => {
  const [selectedSurah, setSelectedSurah] = useState(1); // سورة الفاتحة
  const [allSurahs, setAllSurahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const dropdownRef = useRef(null);
  const ayahsPerPage = 10;
  const [surahAyahs, setSurahAyahs] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json")
      .then((res) => res.json())
      .then((data) => {
        setAllSurahs(data); // كل السور
        setFilteredSurahs(data);
        const selected = data.find((s) => s.id === selectedSurah);
        setSurahAyahs(selected.verses);
        setCurrentIndex(0);
        setLoading(false);
      });
  }, [selectedSurah]);

  useEffect(() => {
    if (allSurahs.length > 0) {
      const selected = allSurahs.find((s) => s.id === selectedSurah);
      setSurahAyahs(selected.verses);
      setCurrentIndex(0);
    }
  }, [selectedSurah, allSurahs]);

  useEffect(() => {
    // Handle clicks outside the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Filter surahs based on search term
    if (searchTerm.trim() === "") {
      setFilteredSurahs(allSurahs);
    } else {
      const filtered = allSurahs.filter((surah) =>
        surah.name.includes(searchTerm)
      );
      setFilteredSurahs(filtered);
    }
  }, [searchTerm, allSurahs]);

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

  const handleSurahSelect = (surahId) => {
    setSelectedSurah(surahId);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="quran-page">
      <h2>المصحف</h2>

      <div className="custom-select-container" ref={dropdownRef}>
        <button
          className="select-button"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
        >
          {allSurahs.find((s) => s.id === selectedSurah)?.name || "اختر سورة"}
        </button>

        {showDropdown && (
          <div className="select-dropdown">
            <div className="search-container">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>
            <ul className="select-options" role="listbox">
              {filteredSurahs.map((surah) => (
                <li
                  key={surah.id}
                  className={`select-option ${
                    selectedSurah === surah.id ? "selected" : ""
                  }`}
                  onClick={() => handleSurahSelect(surah.id)}
                  role="option"
                  aria-selected={selectedSurah === surah.id}
                >
                  {surah.name}
                </li>
              ))}
              {filteredSurahs.length === 0 && (
                <li className="no-results">لا توجد نتائج</li>
              )}
            </ul>
          </div>
        )}
      </div>

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
                    style={{ fontWeight: "bold", fontSize: "1.8rem" }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
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
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && selectedSurah === 1}
        >
          السابق
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentIndex + ayahsPerPage >= surahAyahs.length &&
            selectedSurah === 114
          }
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default QuranPage;
