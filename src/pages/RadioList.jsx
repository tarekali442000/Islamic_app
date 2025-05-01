// import { useEffect, useState, useRef } from "react";
// import radioIcon from "../assets/radio1-svgrepo-com.svg";

// export default function QuranRadios({ id }) {
//   const [radios, setRadios] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const activeAudioRef = useRef(null);

//   useEffect(() => {
//     async function fetchRadios() {
//       try {
//         setLoading(true);
//         const response = await fetch("https://data-rosy.vercel.app/radio.json");
//         const data = await response.json();
//         setRadios(data.radios); // حسب شكل البيانات اللي راجعة من الـ API
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching radios:", error);
//       }
//     }

//     fetchRadios();
//   }, []);

//   const handlePlay = (audioElement) => {
//     if (activeAudioRef.current && activeAudioRef.current !== audioElement) {
//       activeAudioRef.current.pause();
//       activeAudioRef.current.currentTime = 0;
//     }
//     activeAudioRef.current = audioElement;
//   };

//   return (
//     <>
//       <section
//         id={id}
//         style={{
//           width: "100%",
//           padding: "20px",
//           backgroundImage: "url('/images/background.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           minHeight: "100vh",
//           boxSizing: "border-box",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             color: "#222",
//             marginBottom: "30px",
//             fontSize: "30px",
//             borderBottom: "2px solid #ccc",
//             paddingBottom: "5px",
//           }}
//         >
//           إذاعات القرآن الكريم
//           <img className="radio-icon" src={radioIcon} alt="radio icon" />
//         </h2>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "30px",
//             alignItems: "stretch",
//             marginBottom: "100px",
//           }}
//         >
//           {radios.map((radio) => (
//             <div
//               key={radio.id}
//               style={{
//                 background: "rgba(255, 255, 255, 0.8)",
//                 borderRadius: "15px",
//                 padding: "15px",
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <img
//                 src={radio.img}
//                 alt={radio.name}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                   marginBottom: "10px",
//                 }}
//               />
//               <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
//                 {radio.name}
//               </h3>
//               <audio
//                 controls
//                 style={{ width: "100%" }}
//                 onPlay={(e) => handlePlay(e.target)}
//               >
//                 <source src={radio.url} type="audio/mpeg" />
//                 المتصفح لا يدعم الصوت
//               </audio>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
import { useEffect, useState, useRef } from "react";
import radioIcon from "../assets/radio1-svgrepo-com.svg";

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
      <section
        id={id}
        style={{
          width: "100%",
          padding: "20px",
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#222",
            marginBottom: "30px",
            fontSize: "30px",
            borderBottom: "2px solid #ccc",
            paddingBottom: "5px",
          }}
        >
          إذاعات القرآن الكريم
          <img className="radio-icon" src={radioIcon} alt="radio icon" />
        </h2>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              alignItems: "stretch",
              marginBottom: "100px",
            }}
          >
            {radios.map((radio) => (
              <div
                key={radio.id}
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "15px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={radio.img}
                  alt={radio.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                  {radio.name}
                </h3>
                <audio
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
