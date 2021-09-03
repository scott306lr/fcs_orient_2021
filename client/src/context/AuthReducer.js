const AuthReducer = (state, action) => {
  switch(action.type){
    case "LOGIN_START":
      return{
        socket: null,
        user: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return{
        socket: state.socket,
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return{
        socket: null,
        user: null,
        isFetching: false,
        error: action.payload,
      };

    case "SOCKET_CONNECT":
      return{
        socket: action.payload,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      };
    
      default: 
        return state;
  }
};

export default AuthReducer;