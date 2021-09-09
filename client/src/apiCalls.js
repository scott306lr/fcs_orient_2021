import {LoginStart, LoginSuccess, LoginFailure, SocketConnect} from "./context/AuthActions"
import { io } from "socket.io-client";
import axios from "axios";

export const loginCall = async (rid, dispatch) => {
  dispatch(LoginStart(rid));
  try{
    const res = await axios.post("/auth/login", {id: rid})
    //console.log(res);

    // open client socket
    const socket = io("ws://localhost:8900");
    dispatch(SocketConnect(socket));

    // join team and redirect
    socket.emit("join team", res.data.teamId);
    dispatch(LoginSuccess(res.data));

  }catch(err){
    dispatch(LoginFailure(err.toString()));
    return;
  }

  

  // const user = {
  //   name: "UDCHEN",
  //   rid: "AABBCCDD",
  //   role: "ADMIN",
  //   teamId: "3",
  // };

  // dispatch(LoginStart());
  // setTimeout( function(){
  //   const socket = io("ws://localhost:8900");
  //   dispatch(SocketConnect(socket));

  //   socket.emit("join team", user.team);
  //   dispatch(LoginSuccess(user));
  // }, 1000);
}