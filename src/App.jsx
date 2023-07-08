import { createContext, useState } from "react";
import "./App.css";
import Login from "./components/loginpage/Login";
import Home from "./components/mainpage/Home";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false, email: "" });
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
        <Home />
      </UserContext.Provider>
    </>
  );
}

export default App;
