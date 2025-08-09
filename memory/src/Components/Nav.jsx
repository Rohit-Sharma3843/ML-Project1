import React, { useState } from "react";
import img1 from "/images/brain.png";
import img2 from "/images/play.png";
import img3 from "/images/info.png";
import { NavLink } from "react-router-dom";
import img4 from "/images/night.png";
import img5 from "/images/light.png";
const Nav = (props) => {
  const [mode, alter] = props.variables;
  return (
    <div className=" outside w-[100vw] p-2 flex justify-evenly items-center bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div>
        <div className="flex justify-center items-center gap-3">
          <div className="p-1 bg-white rounded-2xl hover:rotate-y-180 transition-all ease-in-out duration-400">
            <img className="h-[70px]" src={img1} alt="" />
          </div>
          <div className="flex flex-col gap-1 text-white">
            <h3
              className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent
"
            >
              Memory Master
            </h3>
            <span>Flip and Match</span>
          </div>
        </div>
      </div>
      <div className="w-[60vw] buttons flex items-center justify-evenly">
        <NavLink to="/" className="group">
          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <div className="p-1 m-0 rounded-full group-hover:scale-105 transition-all duration-150 bg-white">
              <img className="w-[50px]" src={img3} alt="" />
            </div>
            <p className=" w-[100px] text-center group-hover:font-bold box-border transition-all duration-150">
              About Game
            </p>
          </div>
        </NavLink>
        <NavLink to="/theme" className="group">
          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <div className="p-1 m-0 rounded-full group-hover:scale-105 transition-all duration-150 bg-white">
              <img className="w-[50px]" src={img2} alt="" />
            </div>
            <p className=" w-[100px] text-center group-hover:font-bold box-border transition-all duration-150">
              Start Game
            </p>
          </div>
        </NavLink>
        <div
          onClick={alter}
          className="flex box-border w-[200px] text-white group flex-col items-center justify-center"
        >
          <div className="box-border w-[60px] p-1  m-0 rounded-full group-hover:scale-105 transition-all duration-150 bg-white">
            <img src={mode == "dark" ? img4 : img5} alt="" />
          </div>
          <p className="text-center group-hover:font-bold box-border transition-all duration-150">
            Switch to {mode} mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
