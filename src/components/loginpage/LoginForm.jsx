import React from "react";
import { useState } from "react";
import useFirebase from "../../utils/useFirebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { attemptLogin } = useFirebase();

  async function onSubmit(event){
    event.preventDefault();
    setMessage("");
    const loginSuccess = await attemptLogin(email, password);
    if (!loginSuccess){
      setMessage("Invalid login details");
    }
    console.log("YOUR IN")
  }
  
  function handleEmailChange(event){
    console.log(email);
    setEmail(event.target.value);
  }

  function handlePasswordChange(event){
    console.log(password);
    setPassword(event.target.value);
  }

  return (
    <div className="border-2">
      <form onSubmit={onSubmit}>
        <div >
          <h3>
            Email
          </h3>
          <input type="email" onChange={handleEmailChange}/>
        </div>

        <div >
          <h3>
            Password
          </h3>
          <input type="password" onChange={handlePasswordChange}/>
        </div>
        <button type="submit" >
          Login
        </button>
        <h4>
          {message}
        </h4>
      </form>

    </div>
  );
};

export default LoginForm;
