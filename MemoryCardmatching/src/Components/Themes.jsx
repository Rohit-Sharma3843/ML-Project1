import React, { createContext, useContext, useState } from "react";
import img1 from "../../images/flag.png";
import img2 from "../../images/jet.png";
import img3 from "../../images/coding.png";
import img5 from "../../images/space.png";
import img4 from "../../images/animal.png";
import { NavLink } from "react-router-dom";
import { cont } from "../App";
const Themes = (props) => {
  const [theme, setTheme] = useContext(cont);
  const [mode, change] = props.variables;
  return (
    <div className="flex flex-col py-3">
      <h1
        className={
          mode === "dark"
            ? " text-gray-700 text-4xl font-bold text-center pt-4 w-[40vw] mx-[30vw] flex flex-col gap-4 p-3"
            : "w-[40vw] mx-[30vw] text-4xl font-bold text-center pt-4 flex flex-col gap-4 p-3 text-white"
        }
      >
        Select theme
      </h1>
      <div
        className={
          mode === "dark"
            ? " text-gray-700 pt-4 w-[40vw] mx-[30vw] flex flex-col gap-4 p-3"
            : "w-[40vw] mx-[30vw] pt-4 flex flex-col gap-4 p-3 text-white"
        }
      >
        <NavLink
          to="/players"
          onClick={() => {
            setTheme("Flags");
          }}
        >
          <div
            className={
              mode === "dark"
                ? "flex justify-around items-center bg-gray-200 rounded-2xl"
                : "flex justify-around items-center bg-violet-700 rounded-2xl"
            }
          >
            <img className="w-[60px]" src={img1} alt="" />
            <span className="text-3xl font-extrabold">Flags</span>
          </div>
        </NavLink>
        <NavLink
          to="/players"
          onClick={() => {
            setTheme("Defence");
          }}
        >
          <div
            className={
              mode === "dark"
                ? "flex justify-around items-center bg-gray-200 rounded-2xl"
                : "flex justify-around items-center bg-violet-700 rounded-2xl"
            }
          >
            <img className="w-[60px]" src={img2} alt="" />
            <span className="text-3xl font-extrabold">Defence</span>
          </div>
        </NavLink>
        <NavLink
          to="/players"
          onClick={() => {
            setTheme("Coding");
          }}
        >
          <div
            className={
              mode === "dark"
                ? "flex justify-around items-center bg-gray-200 rounded-2xl"
                : "flex justify-around items-center bg-violet-700 rounded-2xl"
            }
          >
            <img className="w-[60px]" src={img3} alt="" />
            <span className="text-3xl font-extrabold">Programming</span>
          </div>
        </NavLink>
        <NavLink
          to="/players"
          onClick={() => {
            setTheme("Animals");
          }}
        >
          <div
            className={
              mode === "dark"
                ? "flex justify-around items-center bg-gray-200 rounded-2xl"
                : "flex justify-around items-center bg-violet-700 rounded-2xl"
            }
          >
            <img className="w-[60px]" src={img4} alt="" />
            <span className="text-3xl font-extrabold">Animals</span>
          </div>
        </NavLink>
        <NavLink
          to="/players"
          onClick={() => {
            setTheme("Space");
          }}
        >
          <div
            className={
              mode === "dark"
                ? "flex justify-around items-center bg-gray-200 rounded-2xl"
                : "flex justify-around items-center bg-violet-700 rounded-2xl"
            }
          >
            <img className="w-[60px]" src={img5} alt="" />
            <span className="text-3xl font-extrabold">Space</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Themes;
export { cont };
