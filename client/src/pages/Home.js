import { useContext, useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";
import Admin from "../layers/Admin";
import Lead from "../layers/Admin";


import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const {user} = useContext(AuthContext);
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

  const roleDisplay = (() => {
    switch (user.role){
      case "ADMIN":
        return(
          <>
            <Admin />
            <Member />
          </>
        )
        break;
      case "LEAD":
        return(
          <>
            <Lead />
            <Member />
          </>
        );
        break;
      case "MEMBER":
        return(
          <Member />
        );
        break;
      default:
        return "default";
    }
  })();

  return (
    <div id = "app" class = "flex flex-col h-screen relative">
      <h1 class="text-center text-2xl">FCS ORIENTING 2021</h1>
      <div id = "messageBar" class = "index-ce"></div>  
      <div id = "topBar" class="flex justify-between">
        <button onClick = {() => switchChat(true)} class="btn">Chatroom</button>
        <button onClick = {() => switchScore(true)} class="btn">Scoreboard</button>
      </div>

      {roleDisplay}
      <div id = "chat8Score" class = "flex-grow relative">
        <button class = "relative top-0 right-0 z-50 btn-x" onClick = {() => {
          if (chatOpen)
            switchChat(false);
          if (scoreOpen)
            switchScore(false);
        }}>×</button>
        <div id = "chatCollapse" class = "transition-all duration-500 absolute left-0 w-0 h-full bottom-0">
          <Chatroom opened = {chatOpen} onChange = {switchChat}/>
        </div>
        <div id = "scoreCollapse" class = "transition-all duration-500 absolute right-0 w-0 h-full bottom-0">
          <Score opened = {scoreOpen} onChange = {switchScore}/>
        </div>
      </div>
    </div>
  );
}