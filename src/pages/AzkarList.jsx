const AzkarList = ({ title, azkarData, id, azkarIcon }) => {
  if (!Array.isArray(azkarData)) {
    return <p>لا يوجد بيانات لعرضها</p>;
  }
  return (
    <div className="azkar-wrapper" id={id}>
      <h2>
        {title}
        <img className="azkar-icon" src={azkarIcon} alt="azkar icon" />
      </h2>
      <ul>
        {azkarData.map((zekr, index) => (
          <li key={index}>
            <p>{zekr.content}</p>
            {zekr.count && (
              <p>
                <strong>التكرار:</strong> {zekr.count}
              </p>
            )}
            {zekr.description && (
              <p>
                <span>{zekr.description}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AzkarList;
