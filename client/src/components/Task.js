export default function Task(props) {

  const task = {
    name: props.name,
    info: "This is a question."
  };

  return (
    <div>
        <h3>{task.name}</h3>
        <p>{task.info}</p>
    </div>
  );
}