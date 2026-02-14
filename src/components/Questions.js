import React from 'react'
import Options from './options'
import Progress from './Progress'
import Timer from './Timer'
import Footer from './Footer'

export default function Questions({question,dispatch,answer,index,Points,numOfQuestions,maxpoints,timeremaining}) {
  return (
    <div className='quiz-page'>
      <div className="quiz-card">

      <Progress index={index} Points={Points} numOfQuestions={numOfQuestions} maxpoints={maxpoints} answer={answer} />
        <h4>{question.question}</h4>
       <Options question={question} dispatch={dispatch} answer={answer}/>
       <Footer/>
        <Timer dispatch={dispatch} timeremaining={timeremaining}/>
         {answer !== null && index <numOfQuestions-1 && <button className='btn btn-next' onClick={()=> dispatch({type:"next"})}>التالى</button>}
         {answer !== null && index === numOfQuestions-1 && <button className='btn btn-ui' onClick={()=> dispatch({type:"finish"})}>انهاء</button>}
      </div>
      
    </div>
  )
}
 