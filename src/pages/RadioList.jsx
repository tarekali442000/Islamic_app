import { useEffect, useState, useRef } from "react";
import radioIcon from "../assets/radio1-svgrepo-com.svg";
import "../styles/Radio.css";

export default function QuranRadios({ id }) {
  const [radios, setRadios] = useState([]);
  const [loading, setLoading] = useState(false);
  const activeAudioRef = useRef(null);

  useEffect(() => {
    async function fetchRadios() {
      try {
        setLoading(true);
        const response = await fetch("https://data-rosy.vercel.app/radio.json");
        const data = await response.json();
        setRadios(data.radios);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching radios:", error);
        setLoading(false); // في حالة الخطأ بردو نوقف التحميل
      }
    }

    fetchRadios();
  }, []);

  const handlePlay = (audioElement) => {
    if (activeAudioRef.current && activeAudioRef.current !== audioElement) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }
    activeAudioRef.current = audioElement;
  };

  return (
    <>
      <section className="radio-section" id={id}>
        <h2 className="radio-title">
          إذاعات القرآن الكريم
          <img className="radio-icon" src={radioIcon} alt="radio icon" />
        </h2>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="radio-container">
            {radios.map((radio) => (
              <div className="radio-card" key={radio.id}>
                <img className="radio-img" src={radio.img} alt={radio.name} />
                <h3 className="radio-name">{radio.name}</h3>
                <audio
                  className="radio-audio"
                  controls
                  style={{ width: "100%" }}
                  onPlay={(e) => handlePlay(e.target)}
                >
                  <source src={radio.url} type="audio/mpeg" />
                  المتصفح لا يدعم الصوت
                </audio>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
