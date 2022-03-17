import { useContext, useEffect, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { useParams  } from "react-router";
import { useCookies } from 'react-cookie';

export default function Login() {
  const [cookies, setCookie] = useCookies(['rid']);
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
    } else if (cookies?.rid){
      loginCall(
        cookies.rid,
        dispatch
      );
    }
  }, []);

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
    </div>
  );
}