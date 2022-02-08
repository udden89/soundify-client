import styles from './Sidebar.module.css'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Profile from '../profile/Profile'

const Sidebar = ({ hideSidebar, animation }) => {
  let navigate = useNavigate()
  const ctx = useAuth()

  const handleClick = (page) => {
    navigate(`/${page}`)
    hideSidebar()
  }

  const handleLogout = () => {
    ctx.logoutHandler()
    navigate('/login')
    hideSidebar()
  }

  return (
    <>
      <div
        className={styles.overlay}
        onClick={hideSidebar}
        style={animation ? { width: '100%' } : { width: '0%' }}
      ></div>
      <div
        className={styles.sidebar}
        style={animation ? { width: '200px' } : { width: '0px' }}
      >
        <div className={styles.header}>
          <Profile />
        </div>

        <div className={styles.listContainer}>
          <ul className={styles.list}>
            <li className={styles.listItem} onClick={() => handleClick('')}>
              {' '}
              <i className={`fas fa-home ${styles.symbol}`}></i>
              HOME
            </li>
            <li
              className={styles.listItem}
              onClick={() => handleClick('myplaylists')}
            >
              <i className={`fas fa-list-ul ${styles.symbol}`}></i>
              PLAYLIST
            </li>
            <li
              className={styles.listItem}
              onClick={() => handleClick('search')}
            >
              <i className={`fas fa-search ${styles.symbol}`}></i>
              SEARCH
            </li>
            <li className={styles.listItem} onClick={handleLogout}>
              <i className={`fas fa-sign-out-alt ${styles.symbol}`}></i>
              LOGOUT
            </li>
          </ul>
        </div>

        <div className={styles.socialBar}>
          <div className={styles.profilePic}>
            <i className='fab fa-facebook-f'></i>
          </div>
          <div className={styles.profilePic}>
            <i className='fab fa-instagram'></i>
          </div>
          <div className={styles.profilePic}>
            <i className='fab fa-twitter'></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
