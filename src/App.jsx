import { createContext, useState } from "react";
import "./App.css";
import Login from "./components/loginpage/Login";
import Home from "./components/mainpage/Home";

export const UserContext = createContext();
export const PageContext = createContext();

function App() {
  const [user, setUser] = useState({ loggedIn: false, email: "" });
  const [page, setPage] = useState("home");
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <PageContext.Provider value={{ page, setPage }}>
          <Login />
          <Home />
        </PageContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
