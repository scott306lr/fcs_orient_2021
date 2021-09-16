import { useContext, useEffect, useState } from "react";
import {GSUpdate} from "../context/AuthActions"
import Member from "../layers/Member";
import Score from "../layers/Scores";
import Admin from "../layers/Admin";
import Lead from "../layers/Lead";
import Announce from "../components/Announce";
import NavBubble from "../components/NavBubble";
// import Example from "../test/Example";


import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const {socket, user, gamestatus, dispatch} = useContext(AuthContext);
  const [chatOpen, setChat] = useState(false);
  const [scoreOpen, setScore] = useState(false);

  useEffect(() => {
    socket.on("status update", (game_status) => {
      dispatch(GSUpdate(game_status));
    })
  }, [socket, dispatch]);

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
            {gamestatus.in_game ? <Member /> : "Game isn't started"}
          </>
        );

      default:
        return "default";
    }
  })();

  return (
    <div id = "app" className="fixed bg-cusblue-100 h-full w-full">
      <div className="h-screen w-screen z-10">
        <h1 className="text-center text-3xl m-2">FCS ORIENTING 2021</h1>
        <div id = "chatCollapse" className = "transition-all duration-500 absolute left-0 w-0 h-full bottom-0">
          {/* <Chatroom opened = {chatOpen} onChange = {switchChat}/> */}
        </div>
        <div id = "scoreCollapse" className = "transition-all duration-500 absolute right-0 w-0 h-full bottom-0">
          <Score opened = {scoreOpen} onChange = {switchScore}/>
        </div>

        
        <div id = "topBar" className="flex justify-between">
          <button onClick = {() => {
            if (chatOpen)
              switchChat(false);
            else {
              switchChat(true);
              switchScore(false);
            }
          }} className="btn"> Chatroom </button>
          
          <button onClick = {() => {
            if (scoreOpen)
              switchScore(false);
            else {
              switchScore(true);
              switchChat(false);
            }
          }} className="btn"> Scoreboard </button>
        </div>

        <Announce />
        {roleDisplay}

        <NavBubble/>
      </div>

      <button className = {`fixed right-0 top-0 m-3 btn-x text-lg ${(chatOpen || scoreOpen) ? "" : "invisible"}`}  onClick = {() => {
        switchChat(false);
        switchScore(false);
      }}>×</button>

      

    </div>
  );
}