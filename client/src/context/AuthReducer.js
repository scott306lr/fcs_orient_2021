const AuthReducer = (state, action) => {
  switch(action.type){
    case "LOGIN_START":
      return{
        socket: null,
        user: null,
        isFetching: true,
        error: false,
        gamestatus: state.gamestatus,
      };

    case "LOGIN_SUCCESS":
      return{
        socket: state.socket,
        user: action.payload,
        isFetching: false,
        error: false,
        gamestatus: state.gamestatus,
      };

    case "LOGIN_FAILURE":
      return{
        socket: null,
        user: null,
        isFetching: false,
        error: action.payload,
        gamestatus: state.gamestatus,
      };

    case "SOCKET_CONNECT":
      return{
        socket: action.payload,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        gamestatus: state.gamestatus,
      };
    
    case "GS_UPDATE":
      return{
        socket: state.socket,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        gamestatus: action.payload,
      };

    case "FC_UPDATE":
      return{
        socket: state.socket,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        gamestatus: state.gamestatus,
      };
    
    default: 
      return state;
  }
};

export default AuthReducer;