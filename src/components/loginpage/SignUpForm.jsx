import React from "react";
import { useState } from "react";
import useFirebase from "../../utils/useFirebase";
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { validateEmail, attemptLogin, createUser } = useFirebase();
  const [message, setMessage] = useState("");
  function handleEmailChange(event){
    setEmail(event.target.value);
  }
  function handlePasswordChange(event){
    setPassword(event.target.value);
  }
  function handleConfirmChange(event){
    setConfirm(event.target.value);
  }
  async function onSubmit(event){
    event.preventDefault();
    if (password.length < 5){
      setMessage("Password is too short");
      return;
    }
    if (password !== confirm){
      setMessage("Passwords to not match");
      return;
    }
    const emailUsed = await validateEmail(email);
    if (emailUsed){
      setMessage("Email is in use.");
      return;
    }
    await createUser(email, false, password);
    const loginSuccess = await attemptLogin(email, password);
    console.log("your in (signup)")
  }




  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <h3>
            Email
          </h3>
          <input type="email" onChange={handleEmailChange} value={email}/>
        </div>
        <div>
          <h3>
            Password
          </h3>
          <input type="password" onChange={handlePasswordChange} value={password}/>
        </div>
        <div>
          <h3>
            Confirm Password
          </h3>
          <input type="password" onChange={handleConfirmChange} value={confirm}/>
        </div>
        <button type="submit">Sign up</button>
        <h4>{message}</h4>

      </form>


    </div>
  );
};

export default SignUpForm;
