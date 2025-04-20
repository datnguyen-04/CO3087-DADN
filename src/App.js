import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Service from "./components/Service";
import { useState } from "react";
import Config from "./components/Config";
import User from "./components/User";
import "reactjs-popup/dist/index.css";
function App() {
  const [show, setShow] = useState("home");
  return (
    <div className="grid grid-cols-12 min-h-[800px] modal">
      <Sidebar show={show} setShow={setShow} />
      {show === "home" ? <Main /> : show === "config" ? <Config /> : <User />}
      {show === "home" ? <Service /> : <></>}
    </div>
  );
}

export default App;
