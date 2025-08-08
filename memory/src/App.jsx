import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Nav from "./Components/Nav";
import Intro from "./Components/Intro";
import Game from "./Components/Game";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import Themes from "./Components/Themes";
import Players from "./Components/Players";
const cont = createContext();
const PlayerCont = createContext();
const ordercont = createContext();
function App() {
  const [order, modify] = useState(6);
  const [player1, update1] = useState("Player 1");
  const [player2, update2] = useState("Player 2");
  const [mode, change] = useState("light");
  const [theme, setTheme] = useState("default");
  function alter() {
    if (mode == "light") {
      change("dark");
    } else {
      change("light");
    }
  }
  const one = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Nav value={false} variables={[mode, alter]} />
          <Intro variables={[mode, alter]} />
        </div>
      ),
    },
    {
      path: "/game",
      element: (
        <div>
          <Nav value={false} variables={[mode, alter]} />
          <Game />
        </div>
      ),
    },
    {
      path: "/theme",
      element: (
        <div>
          <Nav value={true} variables={[mode, alter]} />
          <Themes variables={[mode, alter]} />
        </div>
      ),
    },
    {
      path: "/players",
      element: (
        <div>
          <Nav value={true} variables={[mode, alter]} />
          <Players mode={mode} />
        </div>
      ),
    },
  ]);
  return (
    <cont.Provider value={[theme, setTheme]}>
      <PlayerCont.Provider value={[player1, player2, update1, update2]}>
        <ordercont.Provider value={[order, modify]}>
          <div
            className={
              mode === "light"
                ? `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 box-border w-[100%] pb-6`
                : `bg-gradient-to-br from-gray-300 via-pink-400 to-sky-400 box-border w-[100%] pb-6`
            }
          >
            <RouterProvider router={one} />
          </div>
        </ordercont.Provider>
      </PlayerCont.Provider>
    </cont.Provider>
  );
}

export default App;
export { cont };
export { PlayerCont };
export { ordercont };
