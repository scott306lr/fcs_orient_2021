import React, { useState } from 'react';
export default function Task(props) {

  const [answerText, setAnswer] = useState("");

  const task = {
    id: props.id,
    name: "Task",
    info: "This is a question.",
    answer: "This is the answer."
  };

  // const task = getAPI();

  function answerCheck(answerText) {
    if (answerText === task.answer) {
      alert('YES!');
      function scoreRenew() {
    
      }
      scoreRenew();
    } else {
      alert ('NO');
    }
  }

  const completeTask = (
    <div>
      <p>{task.info}</p>
      <img src = {`../assets/tasks/${task.id}.jpg`} alt = "Task Image"/>
      <br />
      <input placeholder="請輸入答案" value={answerText} onChange={e => setAnswer(e.target.value)}/>
      <button onClick = {() => answerCheck(answerText)}>上傳</button>
    </div>
  );

  return (
    <div>
        <h3>{task.name}</h3>
        {props.open ? completeTask: ""}
    </div>
  );
}