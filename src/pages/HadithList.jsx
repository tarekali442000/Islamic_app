// import React, { useEffect, useState } from "react";
// import "../styles/HadithList.css";
// import hadithIcon from "../assets/hadith-svgrepo-com.svg";

// const API_URL =
//   "https://hadis-api-id.vercel.app/hadith/abu-dawud?page=2&limit=300";

// const HadithList = () => {
//   const [hadiths, setHadiths] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(9); // العدد الابتدائي للعرض

//   useEffect(() => {
//     const fetchHadiths = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error("فشل في جلب البيانات من الخادم.");
//         }
//         const data = await response.json();
//         if (Array.isArray(data.items)) {
//           setHadiths(data.items);
//         } else {
//           setError("لا توجد بيانات متاحة.");
//         }
//       } catch (err) {
//         setError(err.message || "حدث خطأ أثناء تحميل الأحاديث.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHadiths();
//   }, []);

//   const showMoreHadiths = () => {
//     setVisibleCount((prevCount) => prevCount + 9);
//   };

//   const showLessHadiths = () => {
//     setVisibleCount((prevCount) => Math.max(prevCount - 9, 9));
//     // مينفعش يقل عن 9
//   };

//   if (loading) return <div className="loader"></div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="hadith-list-container">
//       <h2>
//         سنن أبي داود
//         <img className="hadith-icon" src={hadithIcon} alt="hadith icon" />
//       </h2>
//       <div className="hadiths-grid">
//         {hadiths.slice(0, visibleCount).map((hadith) => (
//           <div key={hadith.number} className="hadith-card">
//             <h3 className="hadith-number">حديث رقم: {hadith.number}</h3>
//             <p className="hadith-text">{hadith.arab}</p>
//           </div>
//         ))}
//       </div>

//       {/* الزرارين مع بعض */}
//       <div className="buttons-container">
//         {visibleCount > 9 && (
//           <button className="load-more-button" onClick={showLessHadiths}>
//             عرض أقل
//           </button>
//         )}
//         {visibleCount < hadiths.length && (
//           <button className="load-more-button" onClick={showMoreHadiths}>
//             عرض المزيد
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HadithList;

import React, { useEffect, useState } from "react";
import "../styles/HadithList.css";
import hadithIcon from "../assets/hadith-svgrepo-com.svg";

const API_URL =
  "https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$QPrPrCrS3BLsXwUn1ZweBOgNLJheGWJ7iPBYGZz3YqQUJddQdLS";

const HadithList = () => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9); // العدد الابتدائي للعرض

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم.");
        }
        const data = await response.json();
        console.log(data.hadiths.data.hadithArabic);
        if (Array.isArray(data.hadiths.data)) {
          setHadiths(data.hadiths.data);
        } else {
          setError("لا توجد بيانات متاحة.");
        }
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء تحميل الأحاديث.");
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, []);

  const showMoreHadiths = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  const showLessHadiths = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 9, 9));
    // مينفعش يقل عن 9
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="hadith-list-container">
      <h2>
        صحيح البخاري
        <img className="hadith-icon" src={hadithIcon} alt="hadith icon" />
      </h2>
      <div className="hadiths-grid">
        {hadiths.slice(0, visibleCount).map((hadith) => (
          <div key={hadith.id} className="hadith-card">
            <h3 className="hadith-number">حديث رقم: {hadith.id}</h3>
            <p className="hadith-text">{hadith.hadithArabic}</p>
          </div>
        ))}
      </div>

      {/* الزرارين مع بعض */}
      <div className="buttons-container">
        {visibleCount > 9 && (
          <button className="load-more-button" onClick={showLessHadiths}>
            عرض أقل
          </button>
        )}
        {visibleCount < hadiths.length && (
          <button className="load-more-button" onClick={showMoreHadiths}>
            عرض المزيد
          </button>
        )}
      </div>
    </div>
  );
};

export default HadithList;
