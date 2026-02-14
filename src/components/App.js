import { useEffect, useReducer, useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import '../Quiz.css'

import Header from './Header'
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './startScreen';
import Questions from './Questions';
import FinishScreen from './FinishScreen';
import PrayerApp from './Azkar';

const Sec_Per_Question=20
const intialstate={
  questions:[],
  status:'Loading',
  index:0,
  answer:null,
  Points:0,
  highscore:0,
  timeremaining:10
}

function reducer(state,action){
  switch(action.type){
    case 'dataRecieved':
      return{
        ...state,
        questions: action.payload,
        status:'ready'
      };
      case 'datafailed':
        return{
          ...state,
          status:'error'
        }
        case 'start':
          return{
            ...state,
            status:"active",
            timeremaining: state.questions.length * Sec_Per_Question ,
          }
          case 'newAnswer':
            const question= state.questions.at(state.index);
            return{
              ...state,
                    answer:action.payload,
      Points: action.payload === question.correctOption
        ? Number(state.Points) + Number(question.points)
        : state.Points,
            }
            case 'next':
              return{
                ...state,
                index: state.index + 1,
                answer:null,
              }
            
              case 'finish':
                return{
                  ...state,
                  status:'finished',
                  highscore:
                  state.Points > state.highscore ? state.Points : state.highscore,
                }
                case 'restart':
                  return{
                    ...intialstate,
                    questions:state.questions,
                    status:'ready',
                     highscore:
                  state.Points > state.highscore ? state.Points : state.highscore,
                  }
                  case 'tick':
                    return{
                      ...state,
                      timeremaining: state.timeremaining-1,
                      status: state.timeremaining ===0 ?'finished':state.status
                    }

    default:
      console.warn("Unknown action:", action);
      return state;
  }
}
function App() {
    const [clock, setClock] = useState("");
     const [prayerData, setPrayerData] = useState(null);
  const [nextPrayerText, setNextPrayerText] = useState("");
  
  const [{questions,status,index,answer,Points,highscore,timeremaining},dispatch]=useReducer(reducer,intialstate);

  const numofQuestions=questions.length;
  const maxpoints= questions.reduce(
    (prev,cur)=> prev + cur.points,
    0
  )

  useEffect(() => {
  if (!prayerData) return;

  const arabicNames = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };

  const mainPrayersOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const interval = setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const displayHour = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";

    setClock(`${displayHour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`);

    const nowInMinutes = hour * 60 + minute;

    let next = null;
    let minDiff = Infinity;

    mainPrayersOrder.forEach((name) => {
      const timeStr = prayerData.timings[name];
      if (!timeStr) return;

      const [h, m] = timeStr.split(":").map(Number);
      const prayerMinutes = h * 60 + m;

      if (prayerMinutes > nowInMinutes && prayerMinutes - nowInMinutes < minDiff) {
        minDiff = prayerMinutes - nowInMinutes;
        next = name;
      }
    });

    if (next) {
      const prayerTime = prayerData.timings[next];
      const [ph, pm] = prayerTime.split(":").map(Number);
      const hoursLeft = Math.floor(minDiff / 60);
      const minutesLeft = minDiff % 60;

      if (hour === ph && minute === pm && second === 0) {
        new Notification("🕌 حان الآن وقت الصلاة", {
          body: `صلاة ${arabicNames[next]}`,
          icon: "/hlal.jpg",
        });
}
      setNextPrayerText(
        hoursLeft === 0
          ? `الصلاة القادمة ${arabicNames[next]} بعد ${minutesLeft} دقيقة`
          : `الصلاة القادمة ${arabicNames[next]} بعد ${hoursLeft} ساعة و ${minutesLeft} دقيقة`
      );
    }
  }, 1000);

  return () => clearInterval(interval);
}, [prayerData]);


useEffect(() => {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5")
    .then(res => res.json())
    .then(res => setPrayerData(res.data))
    .catch(console.error);
}, []);



  useEffect(function(){
    fetch("http://localhost:9000/questions").then(res => res.json())
      .then(data => dispatch({type: 'dataRecieved',payload:data})).catch(err => dispatch({type:'datafailed'}));

  },[])
  return (
    <div className="App"> 
   <BrowserRouter>
    <Routes>
       <Route path='/questions' element={<Main>
   {status === "Loading" && <Loader/>}
   {status === "error" && <Error/>}
   {status === "ready" && <StartScreen numofQuestions={numofQuestions} dispatch={dispatch}clock={clock} prayerData={prayerData} nextPrayerText={nextPrayerText} />}
   {status === "active" && <Questions question={questions[index]} dispatch={dispatch} answer={answer} index={index} Points={Points} numOfQuestions={numofQuestions}maxpoints={maxpoints} timeremaining={timeremaining}/>}
   {status === "finished" && <FinishScreen dispatch={dispatch} Points={Points} maxpoints={maxpoints} highscore={highscore}  />}
   </Main> } />
      <Route path='/' element={<PrayerApp clock={clock} setClock={setClock} prayerData={prayerData} setPrayerData={setPrayerData} nextPrayerText={nextPrayerText} setNextPrayerText={setNextPrayerText}/>} />
    </Routes>
   </BrowserRouter>
   
    </div>
  );
}
export default App;
