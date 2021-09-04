import { useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";

export default function Home() {
  const [chatOpen, setChat] = useState(false);
  const [scoreOpen, setScore] = useState(false);

  function switchChat(status) {
    console.log('switch');
    document.getElementById("chatCollapse").style.width = status ? "100%": "0%";
    setChat(status);
  }
  function switchScore(status) {
    document.getElementById("scoreCollapse").style.width = status ? "100%": "0%";
    setScore(status);
  }

  return (
    <div>
      <h1 class="text-center">FCS ORIENTING 2021</h1>
      <div id = "topBar">
        <button onClick = {() => switchChat(true)}>Chatroom</button>
        <button onClick = {() => switchScore(true)}>Scoreboard</button>
      </div>
      <Member />
      <button onClick = {() => {
        switchChat(false);
        switchScore(false);
      }}>
        X
      </button>
      <div id = "chatCollapse" class = "transition-all duration-500 left-0">
        <Chatroom opened = {chatOpen} onChange = {switchChat}/>
      </div>
      <div id = "scoreCollapse" class = "transition-all duration-500 absolute right-0  w-0">
        <Score opened = {scoreOpen} onChange = {switchScore}/>
      </div>
    </div>
  );
}