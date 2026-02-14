import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

export default function StartScreen({numofQuestions,dispatch,clock,prayerData,nextPrayerText}) {
  return (
    <div className='start'>
      <Header clock={clock} prayerData={prayerData} nextPrayerText={nextPrayerText} />
        <h2>ارتقِ بمعرفتك في رمضان</h2>
        <h3>سؤال عن شهر رمضان {numofQuestions} </h3>
        <Link to="/questions"><button className='btn' onClick={()=>dispatch({type:"start"})}>سَمِّ الله وابدأ الاختبار 🌙</button></Link>
    </div>
  )
}
