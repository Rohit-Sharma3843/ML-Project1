import React from "react";
import img from "../../images/brain.png";
const Intro = (props) => {
  const [mode, alter] = props.variables;
  return (
    <div
      className={
        mode == "light"
          ? `w-[40vw] intro_box my-[100px] text-white rounded-2xl mx-[30vw] bg-[#26252528] border-1 border-gray-400 text-xl p-3`
          : `w-[40vw] intro_box my-[100px] rounded-2xl mx-[30vw] bg-[#26252528] border-1 border-gray-400 text-xl p-3`
      }
    >
      <div className="flex p-3 items-center justify-center gap-4">
        <img className="w-[100px]" src={img} alt="" />
        <h1 className="text-3xl bg-gradient-to-l from-blue-700 via-yellow-500 to-green-500 text-transparent bg-clip-text font-bold">
          Memory Master - Flip & Match
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          The Memory Game is a fun and interactive card-matching game that
          challenges players to test and improve their memory skills. The
          objective is simple:
        </p>
        <p>Flip two cards at a time and try to find matching pairs.</p>
        <p>
          All cards are initially placed face down. On each turn, the player
          flips two cards:
        </p>
        <ul className="list-disc px-7">
          <li>If the cards match, they remain face up.</li>
          <li>If they don't match, they flip back after a short delay.</li>
        </ul>
        <p>
          The goal is to match all pairs using the fewest possible moves. It's a
          great way to boost concentration and short-term memory while having
          fun.
        </p>
      </div>
    </div>
  );
};

export default Intro;
