import { useEffect, useState } from 'react';
import io from "socket.io-client";
import { Connect } from './components/Connect/Connect';
import { Users } from './components/Users/Users';
import { Chat } from './components/Chat/Chat';
import { Form } from './components/Form/Form';

import styles from './App.module.css';

const socket = io.connect(process.env.REACT_APP_WS_URI);


export const App = () => {
  const [ textarea, setTextarea ] = useState('');
  const [ convo, setConvo ] = useState([]);
  const [ username, setUsername ] = useState(localStorage.username);
  const [ onlineUsers, setOnlineUsers ] = useState({});

  useEffect(() => {
    if(username) socket.emit('socketId', username);
  }, [ username ])

  socket.on('message', (res) => {
    setConvo(res)
  });

  socket.on('socketId', (res) => {
    setOnlineUsers(res)
  });

  return username
    ?(
      <>
        <div className={styles.app}>
          <div className={styles.chatForm}>
            <Chat convo={convo} />
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
