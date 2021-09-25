import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  socket: null,
  user: null,
  isFetching: false,
  error: false,
  gamestatus: {
    in_game: false, 
    board_freeze: false,
    freeze_time: null,
  },
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value={{
        socket: state.socket,
        user: state.user, 
        isFetching: state.isFetching, 
        error: state.error, 
        gamestatus: state.gamestatus,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}