import { useContext, useEffect } from "react";
import {GSUpdate} from "../context/AuthActions"
import Member from "../layers/Member";
import Admin from "../layers/Admin";
import Lead from "../layers/Lead";
import Announce from "../components/Announce";
// import Example from "../test/Example";


import { AuthContext } from "../context/AuthContext";
import Topbar from "../topbar/Topbar";

export default function Home() {
  const {socket, user, gamestatus, dispatch} = useContext(AuthContext);

  useEffect(() => {
    socket.on("status update", (game_status) => {
      dispatch(GSUpdate(game_status));
    })
  }, [socket, dispatch]);


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
    <div id = "app" className=" bg-cusblue-100 flex flex-col h-screen w-screen overflow-y-auto">
      <Topbar/>
      <div className="flex flex-col h-full w-full">
        {/* <div className="flex z-100 py-8"/> */}
        <h1 className="text-center text-3xl py-5 w-full">FCS ORIENTING 2021</h1>
        <Announce />
        {roleDisplay}
      </div>
    </div>
  );
}