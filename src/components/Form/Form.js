import { useRef, useState } from 'react';
import styles from './Form.module.css';
import { Emoji } from './Emoji/Emoji';
import { Giphy } from './Giphy/Giphy';
import { readAndCompressImage } from 'browser-image-resizer';

export const Form = ({ textarea, setTextarea, socket, username }) => {

  const [ showEmojis, setShowEmojis ] = useState(false);
  const [ showGifs, setShowGifs ] = useState(false);
  
  const textareaRef = useRef(null);
  const fileSelect = useRef(null);

  const safeImageExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp',
    'tiff', 'tif', 'webp', 'svg'
  ]

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
    socket.emit('typing', username);
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

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if(!file) return;
    const extension = file.name.split('.').pop().toLowerCase();
    if(!safeImageExtensions.includes(extension)) return 'not valid image';
    try {
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64String = event.target.result;
        socket.emit('message', {username, textarea: `<img src="${base64String}" width="200px">`});
      };
      let resizedImage = await readAndCompressImage(file, {maxWidth: 600});
      reader.readAsDataURL(resizedImage);
    } catch (error) {
      console.error(error);
      throw(error);
    }
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
            <input 
              className={styles.hiddeninput}
              type="file"
              ref={fileSelect}
              onChange={handleFileChange}
            />
            <button 
              className={styles.imageicon}
              onClick={() => fileSelect.current.click()}  
            />
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