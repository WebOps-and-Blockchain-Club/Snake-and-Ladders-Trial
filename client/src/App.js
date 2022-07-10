import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Room from "./Room/Room";
import GameSpace from "./GameSpace/GameSpace";
import { BoardCell } from "./shared/data";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io("http://localhost:9000");
function App() {
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [diceValue, setDiceValue] = useState(0);
  const [boardCell, setBoardCell] = useState(BoardCell);
  const [userActive, setUserActive] = useState(false);
  const [gameStarted, setGamestarted] = useState(false);
  const DiceRoll = () => Math.floor(Math.random() * 6) + 1;
  const handleGameStart = () => {
    if (socket) {
      socket.on("start_game", (data) => {
        setPlayerNumber(data.symbol);
        setUserActive(data.start);
        setGamestarted(true);
      });
    }
  };
  const connect = () => {
    socket.on("connect", () => {
      console.log("Connected to The Server");
    });
  };
  useEffect(() => {
    connect();
    handleGameStart();
  }, []);

  return (
    <>
      {joinedRoom ? (
        <GameSpace
          gameStarted={gameStarted}
          diceValue={diceValue}
          playerNumber={playerNumber}
          boardCell={boardCell}
          DiceRoll={DiceRoll}
          userActive={userActive}
          setDiceValue={setDiceValue}
        />
      ) : (
        <Room
          socket={socket}
          roomId={roomId}
          setJoinedRoom={setJoinedRoom}
          setRoomId={setRoomId}
        />
      )}
    </>
  );
}

export default App;
