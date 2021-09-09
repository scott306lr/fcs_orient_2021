import { useContext, useEffect, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { useParams  } from "react-router";
import { useCookies } from 'react-cookie';

export default function Login() {
  const [cookies, setCookie] = useCookies(['login']);
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
    if (params?.rid){
      setCookie('rid', params.rid, { path: '/' });
      loginCall(
        params.rid,
        dispatch
      );
    }
    else if (cookies?.rid){
      loginCall(
        cookies.rid,
        dispatch
      );
    }
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