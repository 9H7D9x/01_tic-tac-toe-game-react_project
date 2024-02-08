import React from 'react';
import { useState } from 'react';

export default function Player ({intialName,symbol})  {
    const[isEditing , setIsEditing]=useState(false);
    const[playerName , setPlayerName]=useState(intialName);

    function handleEditing(){
       setIsEditing((editing)=>!editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editPlayerName=(<span className="player-name">{playerName}</span>)


    if(isEditing){
        editPlayerName=(<input type="text" required value={playerName} onChange={handleChange}/>)
    }
  return (
    <li >
    <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditing}> {isEditing? "Save":"Edit"} </button>
  </li> 
  
  )
}
