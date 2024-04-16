import styles from './Users.module.css';

export const Users = ({ onlineUsers }) => {
  return (
    <aside className={styles.users}>
      {
        (Object.values(onlineUsers).length - 1)
          ? <>
              <h2>{Object.values(onlineUsers).length} users online</h2>
              <ul>
                {Object.values(onlineUsers).map(user => <li>{user}</li>)}
              </ul>
            </>
          : `You're the only one here`
      }
    </aside>
  )
}