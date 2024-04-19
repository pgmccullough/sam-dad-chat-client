import { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { Connect } from './components/Connect/Connect';
import { Users } from './components/Users/Users';
import { Chat } from './components/Chat/Chat';
import { Form } from './components/Form/Form';
import alert from './assets/audio/default-alert.mp3';

import styles from './App.module.css';

const socket = io.connect(process.env.REACT_APP_WS_URI);


export const App = () => {
  const [ textarea, setTextarea ] = useState('');
  const [ convo, setConvo ] = useState([]);
  const [ username, setUsername ] = useState(localStorage.username);
  const [ onlineUsers, setOnlineUsers ] = useState({});
  const [ missedMessages, setMissedMessages ] = useState(0);
  const [ interactionCheck, setInteractionCheck ] = useState(false);
  const [ userTyping, setUserTyping ] = useState(false);

  const audioEle = useRef(null);

  useEffect(() => {
    if(username) socket.emit('socketId', username);
  }, [ username ])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if(!document.hidden) {
        document.title = 'SammyChat';
        setMissedMessages(0);
      }
    };
    document.addEventListener('click', () => setInteractionCheck(true));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', () => setInteractionCheck(true));
    };
  }, []);

  socket.on('message', (res) => {
    setUserTyping(false);
    if(res.length > 30) res = res.slice(res.length-30);
    if(document.hidden) {
      if(audioEle.current && interactionCheck) {
        audioEle.current.play();
      }
      const newCount = missedMessages + 1;
      setMissedMessages(newCount);
      document.title = `(${newCount}) SammyChat`;
    }
    setConvo(res);
  });

  socket.on('socketId', (res) => {
    setOnlineUsers(res)
  });

  return username
    ?(
      <>
        <audio 
          src={alert}
          ref={audioEle}
        />
        <div className={styles.app}>
          <div className={styles.chatForm}>
            <Chat 
              convo={convo}
              onlineUsers={onlineUsers}
              setConvo={setConvo}
              socket={socket}
              userTyping={userTyping}
              setUserTyping={setUserTyping}
            />
            <Form
              textarea={textarea}
              setTextarea={setTextarea}
              socket={socket}
              username={username}
            />
          </div>
          <Users onlineUsers={onlineUsers} />
        </div>
      </>
    )
    : <Connect 
        setUsername={setUsername}
      />
}
