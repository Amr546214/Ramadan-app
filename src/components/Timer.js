import React, { useEffect } from 'react'

export default function Timer({dispatch,timeremaining}) {
     const minutes = Math.floor(timeremaining / 60);
  const seconds = timeremaining % 60;


    useEffect(function(){
        const id =setInterval(function(){
           dispatch({type:"tick"})
        },1000)
        return ()=> clearInterval(id);
    },[dispatch])
  return (
    <div className='timer'>
         {/* {String(minutes).padStart(2, '0')}:
         {String(seconds).padStart(2, '0')} */}
         {minutes <10 && '0'}{minutes}:
         {seconds <10 && '0'}{seconds}

    </div>
  )
}
 