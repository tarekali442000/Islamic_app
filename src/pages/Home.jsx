import { useEffect, useRef, useState } from "react";
import Prayer from "../component/Prayer";
import TopSection from "../component/TopSection";

function Home() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("cairo");
  const [day, setDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("prayerNotificationsEnabled") === "true";
  });
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const notificationTimers = useRef([]);

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
  }, [city, refreshIndex]);

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

  useEffect(() => {
    return () => {
      notificationTimers.current.forEach((timerId) => clearTimeout(timerId));
      notificationTimers.current = [];
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "prayerNotificationsEnabled",
      notificationsEnabled ? "true" : "false"
    );
    if (!notificationsEnabled) {
      notificationTimers.current.forEach((timerId) => clearTimeout(timerId));
      notificationTimers.current = [];
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    if (!day) return;
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 5, 0, 0);
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timerId = setTimeout(() => {
      setRefreshIndex((val) => val + 1);
    }, timeUntilMidnight);

    return () => clearTimeout(timerId);
  }, [day]);

  useEffect(() => {
    if (!notificationsEnabled) return;
    if (notificationPermission !== "granted") return;
    if (!prayerTimes || Object.keys(prayerTimes).length === 0) return;

    notificationTimers.current.forEach((timerId) => clearTimeout(timerId));
    notificationTimers.current = [];

    const prayerLabels = {
      Fajr: "صلاة الفجر",
      Dhuhr: "صلاة الظهر",
      Asr: "صلاة العصر",
      Maghrib: "صلاة المغرب",
      Isha: "صلاة العشاء",
    };

    const scheduleNotifications = () => {
      const now = new Date();
      const today = new Date();

      Object.entries(prayerLabels).forEach(([key, label]) => {
        const timeStr = prayerTimes[key];
        if (!timeStr) return;
        const [hoursStr, minutesStr] = timeStr.split(":");
        const target = new Date(today);
        target.setHours(Number(hoursStr), Number(minutesStr), 0, 0);

        const delay = target.getTime() - now.getTime();
        if (delay > 0) {
          const timeoutId = setTimeout(() => {
            new Notification(`حان وقت ${label}`, {
              body: `${label} الآن (${timeStr})`,
              icon: "/icons/icon-192.png",
            });
          }, delay);
          notificationTimers.current.push(timeoutId);
        }
      });

      const midnight = new Date(today);
      midnight.setHours(24, 5, 0, 0);
      const untilMidnight = midnight.getTime() - now.getTime();
      if (untilMidnight > 0) {
        const midnightTimer = setTimeout(() => {
          setRefreshIndex((val) => val + 1);
        }, untilMidnight);
        notificationTimers.current.push(midnightTimer);
      }
    };

    scheduleNotifications();
  }, [notificationsEnabled, notificationPermission, prayerTimes, day, city]);

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

  const handleEnableNotifications = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("التنبيهات غير مدعومة في هذا المتصفح.");
      return;
    }

    if (Notification.permission === "granted") {
      setNotificationPermission("granted");
      setNotificationsEnabled(true);
      return;
    }

    if (Notification.permission === "denied") {
      alert("تم رفض إذن الإشعارات. رجاءً فعّلها من إعدادات المتصفح.");
      setNotificationPermission("denied");
      setNotificationsEnabled(false);
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === "granted") {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  };

  const handleDisableNotifications = () => {
    setNotificationsEnabled(false);
    notificationTimers.current.forEach((timerId) => clearTimeout(timerId));
    notificationTimers.current = [];
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
          <div className="notification-card">
            <div className="notification-text">
              <h3>تنبيهات الصلاة</h3>
              <p>
                فعّل تنبيه الأذان بناءً على مواقيت المدينة الحالية أثناء بقاء
                الصفحة مفتوحة.
              </p>
            </div>
            {notificationsEnabled ? (
              <button className="notification-btn enabled" onClick={handleDisableNotifications}>
                إيقاف التنبيهات
              </button>
            ) : (
              <button className="notification-btn" onClick={handleEnableNotifications}>
                تفعيل التنبيهات
              </button>
            )}
          </div>
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
