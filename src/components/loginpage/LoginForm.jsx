import React from "react";
import { useState } from "react";
import useFirebase from "../../utils/useFirebase";
import GoogleButton from "./GoogleButton";

const LoginForm = ({ swap }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { attemptLogin } = useFirebase();

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const loginSuccess = await attemptLogin(email, password);
    if (!loginSuccess) {
      setMessage("Invalid login details");
    }
    console.log("YOUR IN");
  }

  function handleEmailChange(event) {
    console.log(email);
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    console.log(password);
    setPassword(event.target.value);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="text-black w-[16vw] h-[6vh] mb-2 mt-4 pl-2"
            type="email"
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>

        <div>
          <input
            className="text-black w-[16vw] h-[6vh] border-2 mb-2 pl-2"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded mb-2"
          type="submit"
        >
          Log in
        </button>
        <div className="flex justify-center align-center items-center">
          <GoogleButton />
        </div>
        <div>
          <button className="mt-2" onClick={swap}>
            <small>Sign up?</small>
          </button>
        </div>
        <h4>{message}</h4>
      </form>
    </div>
  );
};

export default LoginForm;
