import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";

const arabicNames = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const mainPrayersOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerApp({ prayerData, clock, nextPrayerText }) {
  const [highlight, setHighlight] = useState("");
  const [azkar, setAzkar] = useState([]);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!prayerData || !nextPrayerText) return;

    const match = Object.keys(arabicNames).find((key) =>
      nextPrayerText.includes(arabicNames[key])
    );

    if (match) setHighlight(match);
  }, [nextPrayerText, prayerData]);

  // ✅ تحميل الأذكار من public/data/Azkar.json
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/Azkar.json")
      .then((res) => {
        if (!res.ok) throw new Error("Azkar.json not found");
        return res.json();
      })
      .then((data) => {
        const sabah = data?.sabah ?? [];
        setAzkar(sabah);
        setIndex(0);
        setCounter(sabah[0]?.val ?? 0);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCounter = () => {
    setCounter((c) => (c > 0 ? c - 1 : 0));
  };

  const handleNextZekr = async () => {
    if (counter > 0) {
      await Swal.fire({
        title: "خطأ",
        text: "كمّل الذكر الأول",
        icon: "error",
        confirmButtonText: "تمام",
      });
      return;
    }

    if (index + 1 < azkar.length) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setCounter(azkar[nextIndex]?.val ?? 0);
    } else {
      Swal.fire("خلصت الأذكار ✔");
      setIndex(0);
      setCounter(azkar[0]?.val ?? 0);
    }
  };

  if (!prayerData || azkar.length === 0)
    return <p className="loading">Loading...</p>;

  return (
    <div className="prayer-page">
      <div className="prayer-wrap">
        <Header clock={clock} prayerData={prayerData} nextPrayerText={nextPrayerText} />

        <div className="grid">
          <div className="card">
            <div className="card-title">
              <h4>مواقيت الصلاة</h4>
            </div>

            <ul className="times">
              {mainPrayersOrder.map((key) => (
                <li
                  key={key}
                  className={`time-item ${highlight === key ? "active" : ""}`}
                >
                  <span className="name">{arabicNames[key]}</span>
                  <span className="t">{prayerData.timings[key]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="card-title">
              <h4>اذكار</h4>
            </div>

            <div className="azkar-body">
              <div className={`zekr-box ${counter === 0 ? "done" : ""}`}>
                {azkar[index]?.zekr}
              </div>

              <div className="counter-pill">
                المتبقي: <span>{counter}</span>
              </div>

              <div className="btns">
                <button className="btn primary" onClick={handleCounter}>
                  تسبيح
                </button>
                <button className="btn secondary" onClick={handleNextZekr}>
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
