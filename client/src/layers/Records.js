import { useContext, useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { AuthContext } from "../context/AuthContext";

export default function Records(props) {

  const {socket, user} = useContext(AuthContext);
  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    socket.on("update record", () => {
      //setTasksDone(axios);
      console.log("updating score!");
    })
  }, [socket]);

  const iterRecords = tasksDone.map((record) => {
    return (
      <div className="max-w-prose mx-auto bg-white rounded-xl shadow-md hover:shadow-xl">
        {record.toString()}
      </div>                
    );
  });
  
  return (
    <div className="p-4 w-full overflow-hidden">
      <h2>Records</h2>
      <div id="scoreList" className="space-y-4">
        {iterRecords}
      </div>
    </div>
  );
}