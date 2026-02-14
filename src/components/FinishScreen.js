export default function FinishScreen({ dispatch, Points, maxpoints, highscore }) {
  const percentage = Math.round((Points / maxpoints) * 100);

  return (
    <div className="finish-wrap">
      <div className="finish-card">

        <h2>🎉 انتهى الاختبار</h2>

        {/* دائرة النسبة */}
        <div className="score-ring">
          <span>{percentage}%</span>
        </div>

        <p className="result">
          درجتك: <strong>{Points}</strong> / {maxpoints}
        </p>

        <p className="highscore">
          أعلى نتيجة: <strong>{highscore}</strong>
        </p>

        <button
          className="btn btn-ui restart"
          onClick={() => dispatch({ type: "restart" })}
        >
          🔁 إعادة المحاولة
        </button>

      </div>
    </div>
  );
}
