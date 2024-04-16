import { useEffect, useCallback, useState } from 'react';
import styles from './Emoji.module.css';

export const Emoji = ({ setShowEmojis, setTextarea }) => {
  const [ emojiList, setEmojiList ] = useState([]);
  const [ emojiSearch, setEmojiSearch ] = useState('');
  
  const { REACT_APP_EMOJI_API_KEY: emojikey } = process.env;

  const getAllEmojis = useCallback(() => {
    (async() => {
      const res = await fetch(`https://emoji-api.com/emojis?access_key=${emojikey}`);
      const allEmojis = await res.json();
      setEmojiList(allEmojis);
    })()
  }, [])

  const searchEmojis = useCallback(() => {
    (async() => {
      const res = await fetch(`https://emoji-api.com/emojis?search=${emojiSearch}&access_key=${emojikey}`);
      const allEmojis = await res.json();
      setEmojiList(allEmojis);
    })()
  }, [ emojiSearch ])

  useEffect(() => {
    getAllEmojis();
  }, []);

  useEffect(() => {
    if(!emojiSearch) return getAllEmojis();
    searchEmojis();
  }, [ emojiSearch ]);

  return (
    <>
      <div
        className={styles.emojibg}
        onClick={() => setShowEmojis(false)}
      />
      <div className={styles.emojibox}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search emojis" 
            value={emojiSearch}
            onChange={(e) => setEmojiSearch(e.target.value)}
          />
        </div>
        <div className={styles.emojiinner}>
          {emojiList?.map(({ character }) => 
            <div 
              className={styles.emoji}
              onClick={() => {setTextarea(prev => prev+character)}}
            >
              {character}
            </div>
          )}
        </div>
      </div>
    </>
  )
}