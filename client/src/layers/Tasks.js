import React, { useState } from 'react';
import Task from "../components/Task";

export default function Tasks(props) {
  const [opened, setOpen] = useState(-1);
  const taskList = [
    {
      taskID: 1,
      name: "Question 1",
      type: 1,
      done: false 
    },
    {
      taskID: 2,
      name: "Question 2",
      type: 1,
      done: false 
    },
    {
      taskID: 3,
      name: "Question 3",
      type: 1,
      done: false 
    }
  ];

  const itemList = taskList.map((taskJSON) => {
    return (
      <div class = "task" onClick={() => setOpen(taskJSON.taskID)}>
        <Task id = {taskJSON.taskID} open = {opened === taskJSON.taskID}/>
      </div>
    );
  });

  return (
    <div id = "taskList">
        {itemList}
    </div>
  );
}