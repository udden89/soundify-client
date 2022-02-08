import React from 'react'
import styles from './ShuffleBtn.module.css'

const ShuffleBtn = ({ shufflePlaylist }) => {
  const shuffleList = () => {
    shufflePlaylist({ random: true, index: 0 })
  }

  return (
    <div className={styles.shufflebtn} onClick={shuffleList}>
      <i className='fas fa-random'></i>
    </div>
  )
}

export default ShuffleBtn
