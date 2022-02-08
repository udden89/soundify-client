import React from 'react'
import styles from './MostPlayed.module.css'

const MostPlayed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p>Most played list in Sweden! Give it a go!</p>
      </div>

      <figure className={styles.figure}>
        <img
          className={styles.img}
          src='https://www.gofinland.org/wp-content/uploads/2019/08/music-in-finland.jpg'
          alt=''
        />
        <div className={styles.play}>
          <i className='fas fa-play'></i>
        </div>
      </figure>
    </div>
  )
}

export default MostPlayed
