import React from 'react'

export default function Progress({index,numOfQuestions,Points,maxpoints,answer}) {
  return (
    <header className="progress">
      {/* <meter min="0" max={numOfQuestions} value={index + Number(answer !== null)} /> */}
      {/* <details>
  <summary>Show Instructions</summary>
  <p>This is the quiz instructions...</p>
  <p>This is the quiz instructions...</p>
  <p>This is the quiz instructions...</p>
</details> */}
{/* <dialog open>
  <p>Time is up!</p>
  <button>Close</button>
</dialog>

 */}
 {/* <input list="skills" />
<datalist id="skills">
  <option value="React" />
  <option value="Vue" />
  <option value="Angular" />
</datalist> */}
{/* <fieldset>
  <legend>User Info</legend>
  <input placeholder="Name" />
  <input placeholder="Email" />
</fieldset> */}
{/* <output>Score: {Points}</output> */}
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>{Points}</strong> / {maxpoints}
      </p>
    </header>
  );
}
