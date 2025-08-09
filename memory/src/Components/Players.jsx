import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { PlayerCont } from "../App";
import { ordercont } from "../App";
import "./Nav.css";
const Players = (props) => {
  const [player1, player2, update1, update2] = useContext(PlayerCont);
  const [order, change] = useContext(ordercont);
  const {
    register,
    handleSubmit,
    WATCH,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();
  return (
    <div className="">
      <form
        className={
          props.mode == "dark"
            ? "text-xl  form_box rounded-2xl font-semibold text-gray-800 mx-[30vw] p-4 bg-gradient-to-b from-[#16a34a] via-[#4ade80] to-[#bbf7d0] gap-3 justify-center my-[5vw] flex flex-col items-center"
            : "text-xl form_box rounded-2xl font-semibold text-white mx-[30vw] p-4 bg-gradient-to-r from-[#0f172a]  to-[#334155] gap-3 justify-center my-[5vw] flex flex-col items-center"
        }
      >
        <div className="flex details  items-center justify-center m-[auto]">
          <label>Player1's Name : </label>
          <input
            className="input p-1 border-2 rounded-sm"
            defaultValue="Player1"
            placeholder="Player1 name"
            type="text"
            {...register("p1", {
              minLength: { value: 1, message: "Minimum length should be 1" },
              maxLength: {
                value: 10,
                message: "Maximum length of player name can't be more than 10",
              },
            })}
            onChange={(e) => update1(e.target.value)}
          />
        </div>
        <div className="flex details items-center justify-center m-[auto]">
          <label>Player2's Name : </label>
          <input
            className="input  p-1 border-2 rounded-sm"
            placeholder="Player1 name"
            defaultValue="Player2"
            type="text"
            {...register("p2", {
              minLength: { value: 1, message: "Minimum length should be 1" },
              maxLength: {
                value: 10,
                message: "Maximum length of player name can't be more than 10",
              },
            })}
            onChange={(e) => update2(e.target.value)}
          />
        </div>
        <div className="details">
          <label htmlFor="order">Select order of grid : </label>
          <br />
          <input onClick={() => change(6)} type="radio" id="66" name="order" />
          <label htmlFor="66"> 6 x 6</label>
          <br />
          <input onClick={() => change(8)} type="radio" name="order" id="88" />
          <label htmlFor="88"> 8 x 8</label>
          {console.log(order)}
        </div>
        <NavLink to="/game">
          <input type="submit" className="bg-red-300 px-3 py-1 rounded-md" />
        </NavLink>
      </form>
    </div>
  );
};

export default Players;
export { PlayerCont };
