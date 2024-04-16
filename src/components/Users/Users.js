import { useState } from 'react';
import styles from './Users.module.css';

export const Users = ({ onlineUsers }) => {

  const [ mobileExpand, setMobileExpand ] = useState(false);

  return (
    <aside className={`${styles.users} ${mobileExpand?styles.expanded:''}`}>
      <div 
        className={styles.mobilex}
        onClick={() => setMobileExpand(!mobileExpand)}
      >+</div>
      <div 
        className={styles.mobiletab}
        onClick={() => setMobileExpand(!mobileExpand)}
      >
        {Object.values(onlineUsers).length}
      </div>
      <h2>{Object.values(onlineUsers).length} user{(Object.values(onlineUsers).length > 1)&&'s'} online</h2>
      <ul className={styles.ul}>
        {Object.values(onlineUsers).map((user, i) => <li className={styles.li} key={i}>{user}</li>)}
      </ul>
    </aside>
  )
}