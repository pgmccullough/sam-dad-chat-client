import { useState } from "react";

export const Connect = ({ setUsername }) => {
  
  const [ namestate, setNamestate ] = useState(localStorage.username || "");

  return (
    <>
      <input 
        value={namestate} 
        placeholder="Username"
        onChange={(e) => setNamestate(e.target.value)}
      />
      <button 
        onClick={() => {
          setUsername(namestate);
          localStorage.username = namestate;
        }}
      >CONNECT</button>
    </>
  )
}