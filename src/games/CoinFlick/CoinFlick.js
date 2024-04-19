import { useEffect, useState } from 'react';
import styles from './CoinFlick.module.css';

export const CoinFlick = ({ onlineUsers }) => {

  const [ meterStop, setMeterStop ] = useState(false);
  const [ meterHeight, setMeterHeight ] = useState({dir: "up", height: 0});

  useEffect(() => {
    if(meterStop) return;
    const meterFun = setInterval(() => {
      setMeterHeight((curStatus) => {
        if(curStatus.dir==="up" && curStatus.height < 100) {
          return {...curStatus, height: curStatus.height + 4};
        } else if(curStatus.dir==="up" && curStatus.height >= 100) {
          return {dir: "down" , height: curStatus.height - 4};
        } else if(curStatus.dir==="down" && curStatus.height > 0) {
          return {...curStatus, height: curStatus.height - 4};
        } else if(curStatus.dir==="down" && curStatus.height <= 0) {
          return {dir: "up" , height: curStatus.height + 4};
        }
      })
    }, 15);

    return () => clearInterval(meterFun);
  }, [ meterStop ])

  return (
    <div className={styles.container}>
      <div className={styles.coinBox}>
        {Object.values(onlineUsers).map(user => 
          <div className={styles.coin}>
            {user[0]}
          </div>
        )}
      </div>
      <div className={styles.powermeter} onClick={() => setMeterStop(true)}>
        <div 
          className={styles.powermeterInner}
          style={{height: meterHeight.height+'%'}}
        />
      </div>
    </div>
  )
}