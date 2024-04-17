import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../utils/dateFormat';
import styles from './Chat.module.css';

export const Chat = ({ convo, setConvo, socket }) => {

  const [ showMsgOptions, setShowMsgOptions ] = useState(null);
  const [ userTyping, setUserTyping ] = useState(false);
  const scrollField = useRef(null);


  useEffect(() => {
    if(scrollField.current) {
      scrollField.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [convo] );

  const msgOptions = (e, id) => {
    e.preventDefault();
    setShowMsgOptions(id);
  }

  const deleteMessage = (id) => {
    setConvo(prevConvo => {
      const filtered = prevConvo.filter(conv => conv.id !== id);
      socket.emit('updateConvo', filtered); 
      return filtered;
    })
  }

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  useEffect(() => {
    const handleTyping = () => {
      setUserTyping(true);
      debouncedSetUserTyping(false);
    };

    const debouncedSetUserTyping = debounce(() => {
      setUserTyping(false);
    }, 1000);

    socket.on('typing', handleTyping);

    return () => {
      socket.off('typing', handleTyping);
    };
  }, []);

  const Typing = () => {
    return (
      <div className={`${styles.bubble} ${styles.typing}`}>
        <div className={`${styles.dot} ${styles.one}`} />
        <div className={`${styles.dot} ${styles.two}`} />
        <div className={`${styles.dot} ${styles.three}`} />
      </div>
    )
  }

  return (
    <main 
      className={styles.chat}
    >
      {convo.map(({date, id, textarea, username}, i) => 
        <div key={id} className={`${styles.convocontainer} ${username===localStorage.username?styles.self:''}`}>
          {username !== convo[i-1]?.username 
            && <div className={`${styles.label}`}>{username}</div>
          }
          <article 
            key={id}
            className={`${styles.bubble} ${username===localStorage.username?styles.self:''}`}
            ref={i===convo.length-1 ? scrollField : null}
            onContextMenu={username===localStorage.username?(e) => msgOptions(e,id):null}
            dangerouslySetInnerHTML={{__html: textarea}}
          />
          {showMsgOptions === id &&
              <>
                <div 
                  className={styles.modalbg} 
                  onClick={() => setShowMsgOptions(null)}
                  onContextMenu={() => setShowMsgOptions(null)}
                />
                <div className={styles.editModal}>
                  <ul>
                    <date className={styles.date}>{formatDate(date)}</date>
                    <li>Edit</li>
                    <li onClick={() => deleteMessage(id)}>Delete</li>
                  </ul>
                </div>
              </>
            }
        </div>
      )}
      {userTyping && <Typing />}
    </main>
  );
}
