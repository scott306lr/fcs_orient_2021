import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";

const tasksDoneJSON = [
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:9,
    score:4,
  },
  {
    time:"21:35",
    who:"WJ",
    team:2,
    taskID:8,
    score:4,
  },
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:8,
    score:3,
  },
  {
    time:"21:34",
    who:"LR",
    team:1,
    taskID:3,
    score:4,
  },
  {
    time:"21:34",
    who:"UD",
    team:3,
    taskID:3,
    score:3,
  },
  {
    time:"21:34",
    who:"WJ",
    team:2,
    taskID:9,
    score:3,
  },
  {
    time:"21:34",
    who:"YC",
    team:4,
    taskID:3,
    score:2,
  },
]

export default function Records(props) {

  const {socket, user} = useContext(AuthContext);
  const [tasksDone, setTasksDone] = useState(tasksDoneJSON);

  useEffect(() => {
    socket.on("update record", () => {
      //setTasksDone(axios);
      console.log("updating score!");
    })
  }, [socket]);

  const iterRecords = tasksDone.map((record) => {
    return (
      <div class="max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl">
        {record.toString()}
      </div>                
    );
  });
  
  return (
    <div class="p-4 w-full overflow-hidden">
      <h2>Records</h2>
      <div id="scoreList" class="space-y-4">
        {iterRecords}
      </div>
    </div>
  );
}