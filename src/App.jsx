import { createContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/mainpage/Home";

export const UserContext = createContext();
export const PageContext = createContext();

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    email: "",
    username: "",
  });
  const [page, setPage] = useState("home");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { username, email } = JSON.parse(loggedInUser);
      setUser({ loggedIn: true, username, email });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <PageContext.Provider value={{ page, setPage }}>
          <div className="w-screen h-screen flex justify-center items-center align-center">
            <Home />
          </div>
        </PageContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
