import { useContext, useEffect, useState } from "react";
import {GSUpdate} from "../context/AuthActions"
import Member from "../layers/Member";
import Admin from "../layers/Admin";
import Lead from "../layers/Lead";
import Announce from "../components/Announce";
import ChatBubble from "../layers/ChatBubble";
import ScoreBubble from "../layers/ScoreBubble";
// import Example from "../test/Example";


import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const {socket, user, gamestatus, dispatch} = useContext(AuthContext);
  const [bubbleOpen, setBubbleOpen] = useState(false);
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
    <div id = "app" className="bg-cusblue-100 h-screen w-screen">
      
      <div className="flex space-x-2 sticky top-0 z-50">
        <ChatBubble isOpen={bubbleOpen} setIsOpen={setBubbleOpen} />
        <ScoreBubble isOpen={bubbleOpen} setIsOpen={setBubbleOpen} />  
      </div>
      
      <div className="flex flex-col h-full w-full">
        <div className="z-100 py-8"/>
        <h1 className="text-center text-3xl py-5">FCS ORIENTING 2021</h1>
        <Announce />
        {roleDisplay}
      </div>

      <button className = {`fixed right-0 top-0 m-3 btn-x text-lg ${(chatOpen || scoreOpen) ? "" : "invisible"}`}  onClick = {() => {
        switchChat(false);
        switchScore(false);
      }}>×</button>

      

    </div>
  );
}