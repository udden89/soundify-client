import useAuth from '../../hooks/useAuth'
import styles from './Profile.module.css'

const Profile = () => {
  const auth = useAuth()

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <i className='fas fa-user'></i>
      </div>
      <div className={styles.name}>{auth.user?.user_name}</div>
    </div>
  )
}

export default Profile
