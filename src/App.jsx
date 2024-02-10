import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import {useState} from 'react';
import Log from './components/Log.jsx';
import { WINNING_COMBINATION } from './Winning_combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS={
     X:'Player 1',
     O:'Player 2' ,
  };

const INTIAL_GAME_BOARD=[
  [null, null ,null],
  [null, null ,null],
  [null, null ,null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
      currentPlayer='O'
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INTIAL_GAME_BOARD.map((array)=>[...array])] ;
  for(const turn of gameTurns){
    const {square ,player}=turn;
    const {row ,col}=square;
  
    gameBoard[row][col] =player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATION){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol=== thirdSquareSymbol){
       winner =players[firstSquareSymbol];
    }
  }
  return winner;

}



function App() {
  const [players ,setPlayers] =useState(PLAYERS);
  const[gameTurns, setGameTurns]=useState([]);
  


  const activePlayer=deriveActivePlayer(gameTurns);
  
  const gameBoard=deriveGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,players);
  const hasDraw =(gameTurns.length===9 && !winner); 



  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{

      const currentPlayer=deriveActivePlayer(prevTurns);
  
      const updatedTurns =[
        {square:{row:rowIndex ,col:colIndex}, player : currentPlayer}, 
        ...prevTurns,
      ];
      return updatedTurns;

    });
  }
    function handleRestart(){
      setGameTurns([]);
    }

    function handleplayerNameChange(symbol ,newName){
      setPlayers(prevPlayers=>{
        return{
          ...prevPlayers,
          [symbol]:newName
        }
      })
    }
  

  return (
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
        intialName={PLAYERS.X} 
        symbol="X" 
        isActive={activePlayer ==='X'} 
        onChangeName={handleplayerNameChange}
        />
        <Player 
        intialName={PLAYERS.O} 
        symbol="O" 
        sActive={activePlayer ==='O'} 
        onChangeName={handleplayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && (
      <GameOver winner={winner} onRestart={handleRestart}/>
      )}
     <GameBoard onSelectSquare={handleSelectSquare} 
                // activePlayerSymbol={activePlayer}
                board={gameBoard}
                />
    </div>
   <Log turns={gameTurns}/>
  </main>
  )
}

export default App
