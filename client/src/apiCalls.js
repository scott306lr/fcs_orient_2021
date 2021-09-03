import {LoginStart, LoginSuccess, LoginFailure, SocketConnect} from "./context/AuthActions"
import { io, Socket } from "socket.io-client";



export const loginCall = async (rid, dispatch) => {
  // dispatch(LoginStart(rid));
  // try{
  //   const res = await axios.post("/auth/login", rid)
  // }catch(err){
  //   dispatch(LoginFailure(err.toString()));
  //   return;
  // }

  // // open client socket
  // const socket = io("ws://localhost:8900");
  // dispatch(SocketConnect(socket));

  // // join team and redirect
  // socket.emit("join team", res.data.team);
  // dispatch(LoginSuccess(res.data));

  const user = {
    name: "UDCHEN",
    rid: "AABBCCDD",
    role: "ADMIN",
    team: "3",
  };

  dispatch(LoginStart());
  setTimeout( function(){
    const socket = io("ws://localhost:8900");
    dispatch(SocketConnect(socket));

    socket.emit("join team", user.team);
    dispatch(LoginSuccess(user));
  }, 1000);
}