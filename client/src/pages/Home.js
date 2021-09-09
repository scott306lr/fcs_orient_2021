import { useContext, useEffect, useState } from "react";
import {GSUpdate} from "../context/AuthActions"
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";
import Score from "../layers/Scores";
import Admin from "../layers/Admin";
import Lead from "../layers/Lead";


import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const {socket, user, gamestatus, dispatch} = useContext(AuthContext);
  const [chatOpen, setChat] = useState(false);
  const [scoreOpen, setScore] = useState(false);

  useEffect(() => {
    socket.on("status update", (game_status) => {
      dispatch(GSUpdate(game_status));
    })
  }, [socket]);

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
            {gamestatus.in_game ? <Member /> : "Game hasen't started"}
          </>
        )

      case "LEAD":
        return(
          <>
            <Lead />
            {gamestatus.in_game ? <Member /> : "Game hasen't started"}
          </>
        );

      case "MEMBER":
        return(
          <>
            gamestatus.in_game ? <Member /> : "Game isn't started"
          </>
        );

      default:
        return "default";
    }
  })();

  return (
    <div id = "app" class = "bg-cusblue-100 flex flex-col h-screen relative">
      <h1 class="text-center text-3xl m-2">FCS ORIENTING 2021</h1>
      <div id = "messageBar" class = "index-ce"></div>  
      <div id = "topBar" class="flex justify-between">
        <button onClick = {() => {
          if (chatOpen)
            switchChat(false);
          else {
            switchChat(true);
            switchScore(false);
          }
        }} class="btn">Chatroom</button>
        <button onClick = {() => {
          if (scoreOpen)
            switchScore(false);
          else {
            switchScore(true);
            switchChat(false);
          }
        }} class="btn">Scoreboard</button>
      </div>
{/* "relative top-0 right-0 z-50 m-3 btn-x text-lg" */}
      <div id = "chat8Score" class = "flex-grow relative">
        <button class = {`${chatOpen | scoreOpen ? "relative top-0 right-0 z-50 m-3 btn-x text-lg" : "invisible"}`}  onClick = {() => {
          if (chatOpen)
            switchChat(false);
          if (scoreOpen)
            switchScore(false);
        }}>×</button>
        <div id = "chatCollapse" class = "transition-all duration-500 absolute left-0 w-0 h-full bottom-0 z-10">
          <Chatroom opened = {chatOpen} onChange = {switchChat}/>
        </div>
        <div id = "scoreCollapse" class = "transition-all duration-500 absolute right-0 w-0 h-full bottom-0 z-10">
          <Score opened = {scoreOpen} onChange = {switchScore}/>
        </div>
      </div>

      {roleDisplay}

    </div>
  );
}