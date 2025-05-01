const TopSection = ({
  cities,
  city,
  setCity,
  dateTime,
  day,
  arabicDays,
  currentTime,
}) => (
  <div className="top_sec">
    <div className="infoCard citySelect">
      <select onChange={(e) => setCity(e.target.value)} value={city}>
        {cities.map((city_Obj) => (
          <option key={city_Obj.value} value={city_Obj.value}>
            {city_Obj.name}
          </option>
        ))}
      </select>
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
export default TopSection;
