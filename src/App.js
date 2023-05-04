import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  // const [user, setUser] = useState(null);
  const [{ user},dispatch ]= useStateValue();
  // const user = useStateValue();
  console.log(dispatch)
  return (
    <div className="app">
      {!user ? (
        <>
        {/* <h1>Login</h1> */}
        <Login > 
        
        </Login>
        </>
      ) : (
        <div className="app__container">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              {/* <Route
              path="/app"
              element={
                <>
                  <Sidebar />
                  <Chat />
                </>
              }
            /> */}
              <Route>
                <Route path="/rooms/:roomId" element={<Chat />}></Route>
                {/* <Route path="/" element={<></>}></Route> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
