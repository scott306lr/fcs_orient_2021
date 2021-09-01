import { createContext } from "react";
import AuthReducer from "./AuthReudcer";

const INITIAL_STATE = {
  user:null,
  isFetching:false,
  error:false,
}

export const AuthContex = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthContext, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value={{
        user:state.user, 
        isFetching: state.isFetching, 
        error: state.error, 
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}