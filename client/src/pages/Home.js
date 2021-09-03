import { useState } from "react";
import Member from "../layers/Member";
import Chatroom from "../layers/Chatroom";

export default function Home() {

  const chat = (
    <Chatroom />
  );

  return (
    <div>
      <h1>FCS ORIENTING 2021</h1>
      <div id = "topBar">
        <button onClick = {() => openChat()}>Chatroom</button>
        <button onClick = {() => openScore()}>Scoreboard</button>
      </div>
      <Member />
      {chat}
    </div>
  );
}