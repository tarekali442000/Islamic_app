import { useState, useRef, useEffect } from "react";

const TopSection = ({
  cities,
  city,
  setCity,
  dateTime,
  day,
  arabicDays,
  currentTime,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get the currently selected city name for display
  const selectedCityName = cities.find(c => c.value === city)?.name || "";
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleCitySelect = (cityValue) => {
    setCity(cityValue);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="top_sec">
      <div className="infoCard citySelect" ref={dropdownRef}>
        <div 
          className="custom-city-select"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedCityName}</span>
          <i className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}></i>
        </div>
        
        {isDropdownOpen && (
          <div className="city-options-container">
            <ul className="city-options">
              {cities.map((cityObj) => (
                <li 
                  key={cityObj.value} 
                  className={`city-option ${city === cityObj.value ? 'selected' : ''}`}
                  onClick={() => handleCitySelect(cityObj.value)}
                >
                  {cityObj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="infoCard hijridate">
        <h3>التاريخ :</h3>
        <h4>{dateTime}</h4>
      </div>
      <div className="infoCard hejry">
        <h3>اليوم :</h3>
        <h4>{arabicDays[day]}</h4>
      </div>
      <div className="infoCard time">
        <h3>الساعة :</h3>
        <h4>{currentTime}</h4>
      </div>
    </div>
  );
};

export default TopSection;
