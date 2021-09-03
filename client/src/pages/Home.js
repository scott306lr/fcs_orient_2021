import { useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";

export default function Home() {
  const [chatOpen, setChat] = useState(false);
  const [scoreOpen, setScore] = useState(false);

  return (
    <div>
      <h1>FCS ORIENTING 2021</h1>
      <div id = "topBar">
        <button onClick = {() => setChat(!chatOpen)}>Chatroom</button>
        <button onClick = {() => setScore(!scoreOpen)}>Scoreboard</button>
      </div>
      <Member />
      <div id = "chatCollapse">
        <Chatroom />
      </div>
      <div id = "scoreCollapse">
        <Score />
      </div>
    </div>
  );
}