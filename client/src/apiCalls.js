import {LoginStart, LoginSuccess, LoginFailure, SocketConnect} from "./context/AuthActions"
import { io } from "socket.io-client";
import axios from "axios";

export const loginCall = async (rid, dispatch) => {
  dispatch(LoginStart(rid));
  try{
    const res = await axios.post("/backend/auth/login", {id: rid})

    // const socket = io("ws://127.0.0.1:8900");
    const socket = io("/");
    dispatch(SocketConnect(socket));

    // join team and redirect
    socket.emit("join team", res.data.teamId);
    dispatch(LoginSuccess(res.data));

  }catch(err){
    dispatch(LoginFailure(err.toString()));
    return;
  }
}