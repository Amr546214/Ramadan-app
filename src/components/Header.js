import { Link } from "react-router-dom";

function Header({ clock, prayerData, nextPrayerText }) {
  return (
    <div className="prayer-head">
      <div className="top-bar">
        <div className="logo">
          <Link to="/">
            <img src="/hlal.jpg" alt="logo" />
          </Link>
          <span>My Prayer</span>
        </div>

        <Link to="/questions">
          <button className="top-btn">اختبر نفسك</button>
        </Link>
      </div>
      <div style={{ textAlign: "center", marginTop: 6, opacity: 0.85 }}>
        {prayerData?.date?.gregorian?.date}
      </div>
      
      <h2 style={{ textAlign: "center", margin: "6px 0 2px" }}>{clock}</h2>

      <p style={{ textAlign: "center", margin: 0, opacity: 0.85 }}>
        {nextPrayerText}
      </p>
      
    </div>
  );
}

export default Header;
