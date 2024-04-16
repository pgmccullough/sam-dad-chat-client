import { useRef, useState } from 'react';
import styles from './Form.module.css';
import { Emoji } from './Emoji/Emoji';
import { Giphy } from './Giphy/Giphy';

export const Form = ({ textarea, setTextarea, socket, username }) => {

  const [ showEmojis, setShowEmojis ] = useState(false);
  const [ showGifs, setShowGifs ] = useState(false);
  const textareaRef = useRef(null);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const submitMessage = () => {
    if(!textarea.trim()) return;
      socket.emit('message', {username, textarea});
      setTextarea('');
  }

  const enterSubmit = (e) => {
    if(e.code==="Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  }

  const sendGif = (gif) => {
    socket.emit('message', {username, textarea: `<img src="${gif}" width="200px">`});
    setShowGifs(false);
  }
  
  return (
    <section className={styles.formParent}>
      {showGifs 
        && <Giphy
          setShowGifs={setShowGifs}
          sendGif={sendGif}
        />
      }
      {showEmojis 
        && <Emoji
          setShowEmojis={setShowEmojis}
          setTextarea={setTextarea}
        />
      }
      <textarea
        ref={textareaRef}
        value={textarea}
        onChange={(e) => {
          setTextarea(e.target.value);
          handleTextareaInput()
        }}
        onKeyDown={enterSubmit}
        className={styles.textarea}
      />
      {textarea
        ?<button
            className={styles.button}
            onClick={submitMessage} />
          :<div
            className={styles.icons}
          >
            {/* <button className={styles.imageicon} /> */}
            <button 
              className={styles.gificon}
              onClick={() => setShowGifs(!showGifs)}
            >GIF</button>
            <button 
              className={styles.emojiicon}
              onClick={() => setShowEmojis(!showEmojis)}
            />
          </div>
      }
    </section>
  )
}