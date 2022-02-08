import React, { useContext } from 'react'
import styles from './SongListItem.module.css'
import { PlayerContext } from '../../store/playerContext'

const PlayBtn = ({ songs, index }) => {
  const player = useContext(PlayerContext)

  const setPlaylistHandler = (data) => {
    player.setPlaylist({
      songs: songs,
      index: data.index,
    })
  }

  return (
    <figure
      className={styles.figure}
      onClick={() => setPlaylistHandler({ index: index })}
    >
      <div className={styles.play}>
        <i className='fas fa-play'></i>
      </div>
    </figure>
  )
}

export default PlayBtn
