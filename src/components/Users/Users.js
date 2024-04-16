import styles from './Users.module.css';

export const Users = ({ onlineUsers }) => {
  return (
    <aside className={styles.users}>
      <h2>{Object.values(onlineUsers).length} user{(Object.values(onlineUsers).length > 1)&&'s'} online</h2>
      <ul className={styles.ul}>
        {Object.values(onlineUsers).map(user => <li className={styles.li}>{user}</li>)}
      </ul>
    </aside>
  )
}