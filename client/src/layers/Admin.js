import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const {socket, user} = useContext(AuthContext);
  
  const startGame = () => {
    socket.emit("start game");
  };

  const endGame = () => {
    socket.emit("end game");
  };

  const freezeBoard = () => {
    socket.emit("freeze board");
  };

  const unfreezeBoard = () => {
    socket.emit("unfreeze board");
  };

  return (
    <div>
      <button onClick = {freezeBoard}> Freeze Board </button>
      <button onClick = {unfreezeBoard}> Unfreeze Board </button>
      <button onClick = {startGame}> Start Game </button>
      <button onClick = {endGame}> End Game </button>
      admin
    </div>
  );
}