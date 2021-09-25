export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const SocketConnect = (socket) => ({
  type: "SOCKET_CONNECT",
  payload: socket,
});

export const GSUpdate = (game_status) => ({
  type: "GS_UPDATE",
  payload: game_status,
});

export const FCUpdate = (unfreeze_count) => ({
  type: "FC_UPDATE",
  payload: unfreeze_count,
});