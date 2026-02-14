import {useReducer } from "react";
  const intialstate={count:0,step:1}

function reducer(state, action) {
  console.log(state , action);
  switch(action.type){
    case 'inc':
      return{...state,count:state.count + state.step};
    case 'dec':
      return{...state,count:state.count - state.step};
    case 'setCount':
      return{...state,count:action.payload};
    case 'setStep':
      return{...state,step:action.payload};
    case 'reset':
      return intialstate;

      default:
        throw new Error("UNkown Action");
  }
  
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [ state,dispatch ] = useReducer(reducer, intialstate);
  const{step,count}=state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type:"dec", payload:1})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({type:"inc", payload:1})
  };

  const defineCount = function (e) {
    dispatch({type : "setCount",payload:Number(e.target.value)});
  };

  const defineStep = function (e) {
        dispatch({type : "setStep",payload:Number(e.target.value)});
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    dispatch({type:'reset'})
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
