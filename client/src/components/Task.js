export default function Task(props) {

  const task = {
    id: props.id,
    name: "Task",
    info: "This is a question."
  };

  const completeTask = (
    <div>
      <p>{task.info}</p>
      <img src = {`../assets/tasks/${task.id}.jpg`} alt = "Task Image"/>
      <br />
      <input placeholder="請輸入答案" />
      <button onClick = {() => alert('Submission made.')}>上傳</button>
    </div>
  );

  return (
    <div>
        <h3>{task.name}</h3>
        {props.open ? completeTask: ""}
    </div>
  );
}