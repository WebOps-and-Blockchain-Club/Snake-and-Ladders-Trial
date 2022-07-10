import { useEffect, useState } from "react";
import Room from "./Room/Room";
import GameSpace from "./GameSpace/GameSpace";
import {
  BoardCell,
} from "./shared/data";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [diceValue, setDiceValue] = useState(0);
  const [boardCell, setBoardCell] = useState(BoardCell);
  const DiceRoll = () => Math.floor(Math.random() * 6) + 1;

  return (
    <>
      {joinedRoom ? (
        <GameSpace
          diceValue={diceValue}
          boardCell={boardCell}
          DiceRoll={DiceRoll}
          setDiceValue={setDiceValue}
        />
      ) : (
        <Room
          roomId={roomId}
          setJoinedRoom={setJoinedRoom}
          setRoomId={setRoomId}
        />
      )}
    </>
  );
}

export default App;
