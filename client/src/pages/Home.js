import { useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";
import Admin from "../layers/Admin"

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
      <Admin />
      <h1 class="text-center text-2xl">FCS ORIENTING 2021</h1>
      <div id = "topBar" class="flex justify-between">
        <button onClick = {() => switchChat(true)} class="btn">Chatroom</button>
        <button onClick = {() => switchScore(true)} class="btn">Scoreboard</button>
      </div>
      <button onClick = {() => {
        if (chatOpen)
          switchChat(false);
        if (scoreOpen)
          switchScore(false);
      }}>
        X
      </button>
      <Member />
      <div id = "chatCollapse" class = "transition-all duration-500 absolute left-0 w-0 h-1/2 bottom-0">
        <Chatroom opened = {chatOpen} onChange = {switchChat}/>
      </div>
      <div id = "scoreCollapse" class = "transition-all duration-500 absolute right-0 w-0 h-1/2 bottom-0">
        <Score opened = {scoreOpen} onChange = {switchScore}/>
      </div>
    </div>
  );
}