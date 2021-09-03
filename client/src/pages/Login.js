
import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const rid = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { rid: rid.current.value },
      dispatch
    );
  };

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