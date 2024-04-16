import { useRef } from 'react';
import styles from './Form.module.css';

export const Form = ({ textarea, setTextarea, socket, username }) => {

  const textareaRef = useRef(null);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const submitMessage = () => {
      socket.emit('message', {username, textarea});
      setTextarea('');
  }

  const enterSubmit = (e) => {
    if(e.code==="Enter" && !e.shiftKey) submitMessage();
  }
  
  return (
    <section className={styles.formParent}>
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
          :<></>
            // :<div
          //   className={styles.icons}
          // >
          //   <button className={styles.imageicon} />
          //   <button className={styles.gificon}>GIF</button>
          //   <button className={styles.emojiicon} />
          // </div>
      }
    </section>
  )
}