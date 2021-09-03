import { useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";

export default function Home() {
  const [chatOpen, setChat] = useState(false);
  const [scoreOpen, setScore] = useState(false);

  function switchChat(status) {
    setChat(status);
  }
  function switchScore(status) {
    setScore(status);
  }

  return (
    <div>
      <h1 class="text-center">FCS ORIENTING 2021</h1>
      <div id = "topBar">
        <button onClick = {() => switchChat(!chatOpen)}>Chatroom</button>
        <button onClick = {() => switchScore(!scoreOpen)}>Scoreboard</button>
      </div>
      <Member />
      <div id = "chatCollapse">
        <Chatroom opened = {chatOpen} onChange = {switchChat}/>
      </div>
      <div id = "scoreCollapse">
        <Score opened = {scoreOpen} onChange = {switchScore}/>
      </div>
    </div>
  );
}