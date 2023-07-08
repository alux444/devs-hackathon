import React, { useContext, useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import { UserContext } from "../../App";

const Login = ({ open, close }) => {
  const [login, setLogin] = useState(true);
  const modalRef = useRef(null);
  const { user } = useContext(UserContext);
  useOutsideClick(modalRef, close);

  useEffect(() => {
    if (user.loggedIn) {
      close();
    }
  }, [user]);

  const alternate = () => {
    setLogin(!login);
  };

  return (
    <Modal open={open}>
      <div className="w-[100%] h-[100%] items-center align-center justify-center flex">
        <div
          ref={modalRef}
          className="border-2 border-solid border-white p-[25px] text-center items-center bg-[black]"
        >
          {" "}
          {login ? (
            <LoginForm swap={alternate} />
          ) : (
            <SignUpForm swap={alternate} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Login;
