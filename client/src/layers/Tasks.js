import Task from "../components/task";

export default function Tasks(props) {

  const taskList = [
    {
      name: "Question 1",
      type: 1,
      done: false 
    },
    {
      name: "Question 2",
      type: 1,
      done: false 
    },
    {
      name: "Question 3",
      type: 1,
      done: false 
    }
  ];

  const itemList = taskList.map((taskJSON) => {
    return <li><Task name={taskJSON.name} /></li>
  });

  return (
    <ul id = "taskList">
        {itemList}
    </ul>
  );
}