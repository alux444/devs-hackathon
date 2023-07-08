import React from "react";
import { useState } from "react";
import useFirebase from "../../utils/useFirebase";
import GoogleButton from "./GoogleButton";
const SignUpForm = ({ swap }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { validateEmail, attemptLogin, createUser } = useFirebase();
  const [message, setMessage] = useState("");
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmChange(event) {
    setConfirm(event.target.value);
  }
  async function onSubmit(event) {
    event.preventDefault();
    if (password.length < 5) {
      setMessage("Password is too short");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    const emailUsed = await validateEmail(email);
    if (emailUsed) {
      setMessage("Email is in use.");
      return;
    }
    await createUser(email, false, password);
    const loginSuccess = await attemptLogin(email, password);
  }

  return (
    <form className="" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <div>
        <input
          className="text-black w-[16vw] h-[6vh] border-2 mb-2 mt-2 pl-2"
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          className="text-black w-[16vw] h-[6vh] border-2 mb-2 pl-2"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Password"
        />
      </div>
      <div>
        <input
          className="text-black w-[16vw] h-[6vh] border-2 mb-2 pl-2"
          type="password"
          onChange={handleConfirmChange}
          value={confirm}
          placeholder="Re-enter password"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded mb-2" type="submit">
        Sign up
      </button>
      <div className="flex justify-center align-center items-center mb-4">
        <GoogleButton />
      </div>
      <div>
        <button className="mt-2"onClick={swap}>
          <small>Login?</small>
        </button>
      </div>
      <h4>{message}</h4>
    </form>
  );
};

export default SignUpForm;
