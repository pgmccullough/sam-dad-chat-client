import React from 'react';
import styles from './Chat.module.css';

export const Chat = ({ convo }) => 
  <main className={styles.chat}>
    {convo.map(({date, id, textarea, username}, i) => 
      <React.Fragment key={id}>
        {username !== convo[i-1]?.username 
          && <div className={`${styles.label} ${username===localStorage.username?styles.self:''}`}>{username}</div>
        }
        <article 
          key={id}
          className={`${styles.bubble} ${username===localStorage.username?styles.self:''}`}
        >
          {textarea}
        </article>
      </React.Fragment>
    )}
  </main>
