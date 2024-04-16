import { useCallback, useEffect, useState } from 'react';
import styles from '../Emoji/Emoji.module.css';
import giphyLogo from '../../../assets/giphy.png';

export const Giphy = ({ sendGif, setShowGifs }) => {

  const [ gifList, setGifList ] = useState([]);
  const [ gifSearch, setGifSearch ] = useState('');

  const { REACT_APP_GIPHY_API_KEY: giphykey } = process.env;

  const fetchGiphy = useCallback(
    async () => {
      const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphykey}`)
      const giphys = await res.json();
      setGifList(giphys.data);
    }, []
  )

  const searchGiphy = useCallback(
    async () => {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphykey}&q=${encodeURI(gifSearch)}`);
      const giphys = await res.json();
      setGifList(giphys.data);
    }, [ gifSearch ]
  )

  useEffect(() => {
    fetchGiphy();
  }, [])

  useEffect(() => {
    console.log(gifSearch);
    if(gifSearch.length > 2) {
      searchGiphy();
    } else if(gifSearch.length===0) {
      fetchGiphy();
    }
  }, [ gifSearch ])

  return (
    <>
      <div
        className={styles.emojibg}
        onClick={() => setShowGifs(false)}
      />
      <div className={styles.emojibox}>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Search Giphy" 
            value={gifSearch}
            onChange={e => setGifSearch(e.target.value)}
          />
        </div>
        <div className={styles.emojiinner}>
          {gifList?.map(gif => 
            <img 
              src={gif.images.downsized.url}
              className={styles.gif}
              onClick={() => sendGif(gif.images.downsized.url)}
            />
          )}
        </div>
        <img 
          className={styles.giphyattr}
          src={giphyLogo} 
        />
      </div>
    </>
  )

}