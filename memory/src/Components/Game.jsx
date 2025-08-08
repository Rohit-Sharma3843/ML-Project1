import React, { useContext, useState, useEffect } from "react";
import { cont } from "../App";
import "./Game.css";
import { PlayerCont } from "./Players";
import { ordercont } from "../App";
const Game = () => {
  let [player1, player2, update1, update2] = useContext(PlayerCont);
  const [order, change] = useContext(ordercont);
  if (player1 == "") {
    player1 = "Player1";
  }
  if (player2 == "") {
    player2 = "Player2";
  }
  const [theme] = useContext(cont);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: player1, score: 0, active: true },
    { id: 2, name: player2, score: 0, active: false },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  useEffect(() => {
    initializeGame();
  }, [theme]);

  const initializeGame = () => {
    const url = `../../images/${theme}/`;
    const imagePairs = [];
    for (let i = 1; i <= (order * order) / 2; i++) {
      imagePairs.push(`${url}${i}.png`);
      imagePairs.push(`${url}${i}.png`);
    }

    const shuffledCards = imagePairs
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setPlayers([
      { id: 1, name: player1, score: 0, active: true },
      { id: 2, name: player2, score: 0, active: false },
    ]);
    setCurrentPlayer(0);
    setGameComplete(false);
  };

  const switchPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
    setPlayers(
      players.map((player, index) => ({
        ...player,
        active: index === (currentPlayer + 1) % players.length,
      }))
    );
  };

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (
      clickedCard.flipped ||
      clickedCard.matched ||
      flippedCards.length === 2 ||
      gameComplete
    ) {
      return;
    }

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((card) => card.id === firstId);
      const secondCard = newCards.find((card) => card.id === secondId);

      if (firstCard.image === secondCard.image) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayer].score += 1;
        setPlayers(updatedPlayers);

        setMatchedCards([...matchedCards, firstId, secondId]);
        if (matchedCards.length + 2 === cards.length) {
          setGameComplete(true);
        }

        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
          switchPlayer();
        }, 1000);
      }
    }
  };

  return (
    <div className="game-container ">
      <div className="game-info">
        <div className="players-score">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`player ${player.active ? "active-player" : ""}`}
            >
              <h3>{player.name}</h3>
              <p>Score: {player.score}</p>
              {player.active && (
                <div className="turn-indicator">Current Turn</div>
              )}
            </div>
          ))}
        </div>

        <button onClick={initializeGame} className="reset-button">
          Reset Game
        </button>

        {gameComplete && (
          <div className="game-complete">
            <h2>Game Over!</h2>
            <p>
              {players[0].score > players[1].score
                ? `${players[0].name} wins!`
                : players[1].score > players[0].score
                ? `${players[1].name} wins!`
                : "It's a tie!"}
            </p>
            <p>
              Scores: {players[0].name} - {players[0].score}, {players[1].name}{" "}
              - {players[1].score}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${order}, 1fr)`,
          gridTemplateRows: `repeat(${order}, 1fr)`,
          gap: "5px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${
              card.matched ? "matched" : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">
                <img src={card.image} alt="Card content" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
