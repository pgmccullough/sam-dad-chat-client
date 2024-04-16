import { useState } from "react";
import styles from './Connect.module.css';

export const Connect = ({ setUsername }) => {
  
  const [ namestate, setNamestate ] = useState(localStorage.username || "");

  return (
    <div className={styles.fakebody}>
      <div className={styles.box}>
        <h1 className={styles.h1}>Sammy Chat</h1>
        <input 
          className={styles.input}
          value={namestate} 
          placeholder="Username"
          onChange={(e) => setNamestate(e.target.value)}
        /><br />
        <button 
          className={styles.button}
          onClick={() => {
            setUsername(namestate);
            localStorage.username = namestate;
          }}
        >CONNECT</button>
      </div>
    </div>
  )
}