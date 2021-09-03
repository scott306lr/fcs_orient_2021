import {LoginStart, LoginSuccess, LoginFailure, SocketConnect} from "./context/AuthActions"
import { io, Socket } from "socket.io-client";
import axios from "axios"


export const loginCall = async (rid, dispatch) => {
  // dispatch({ type: "LOGIN_START" });
  // try {
  //   const res = await axios.post("/auth/login", userCredential)
  //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  // } catch (err) {
  //   dispatch({ type: "LOGIN_FAILURE", payload: err });
  // }

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