import { useContext, useEffect, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { useParams  } from "react-router";

export default function Login() {
  const params = useParams();
  const rid = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      rid,
      dispatch
    );
  };

  useEffect(() => {
    params?.rid && 
    loginCall(
      params.rid,
      dispatch
    );
  }, [])

  return (
    <div>
      <form className="loginBox" onSubmit={handleClick}>
        <input
          placeholder="RID"
          type="password"
          required
          minLength="6"
          className="loginInput"
          ref={rid}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? (
            "Loading..."
          ) : (
            "Log In"
          )}
        </button>

      </form>
            
      {error ? error : ""}

      <a href="http://localhost:3000/login/613468e49020fa6032cae900"> UD </a>
      <a href="http://localhost:3000/login/613468e49020fa6032cae901"> LR </a>
      <a href="http://localhost:3000/login/613468e49020fa6032cae902"> WJ </a>
    </div>
  );
}