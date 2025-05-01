import { useEffect, useState } from "react";
import Prayer from "../component/Prayer";
import TopSection from "../component/TopSection";

function Home() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("cairo");
  const [day, setDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const arabicDays = {
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
    Sunday: "الأحد",
  };

  const cities = [
    { name: "القاهرة", value: "cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "السويس", value: "Suez" },
    { name: "أسيوط", value: "Asyut" },
    { name: "دمياط", value: "Dumiat" },
    { name: "طنطا", value: "Tanta" },
    { name: "الزقازيق", value: "Zaqaziq" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "مطروح", value: "Matrouh" },
    { name: "بورسعيد", value: "Port Said" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=eg`
        );
        const data_Prayer = await response.json();
        setLoading(false);
        setPrayerTimes(data_Prayer.data.timings);

        const day = parseInt(data_Prayer.data.date.hijri.day, 10);

        const month = data_Prayer.data.date.hijri.month.ar;
        const year = data_Prayer.data.date.hijri.year;
        const formattedHijriDate = `${day}-${month}-${year}`;
        setDateTime(formattedHijriDate);
        setDay(data_Prayer.data.date.gregorian.weekday.en);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrayerTimes();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval); // تنظيف عند الخروج
  }, []);

  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "مساءً" : "صباحاً";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${perd}`;
  };
  return (
    <>
      <section className="landingSection">
        <div className="container">
          <TopSection
            cities={cities}
            city={city}
            setCity={setCity}
            dateTime={dateTime}
            day={day}
            arabicDays={arabicDays}
            currentTime={currentTime}
          />
          <div className="prayer-wrapper">
            {loading ? (
              // <p>جارٍ التحميل...</p>
              <div className="loader"></div>
            ) : (
              <>
                {[
                  { name: "الفجر:", key: "Fajr" },
                  { name: "الظهر:", key: "Dhuhr" },
                  { name: "العصر:", key: "Asr" },
                  { name: "المغرب:", key: "Maghrib" },
                  { name: "العشاء:", key: "Isha" },
                ].map((prayer) => (
                  <Prayer
                    key={prayer.key}
                    name={prayer.name}
                    time={formatTimes(prayerTimes[prayer.key])}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
