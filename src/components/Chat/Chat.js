import { Fragment, useEffect, useRef } from 'react';
import styles from './Chat.module.css';

export const Chat = ({ convo }) => {

  const scrollField = useRef(null);

  useEffect(() => {
    if(scrollField.current) {
      scrollField.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [convo] );

  return (
    <main 
      className={styles.chat}
    >
      {convo.map(({date, id, textarea, username}, i) => 
        <Fragment key={id}>
          {username !== convo[i-1]?.username 
            && <div className={`${styles.label} ${username===localStorage.username?styles.self:''}`}>{username}</div>
          }
          <article 
            key={id}
            className={`${styles.bubble} ${username===localStorage.username?styles.self:''}`}
            ref={i===convo.length-1 ? scrollField : null}
          >
            {textarea}
          </article>
        </Fragment>
      )}
    </main>
  );
}
