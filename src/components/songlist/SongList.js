import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { PlayerContext } from '../../store/playerContext'
import ShuffleBtn from '../buttons/ShuffleBtn'
import SongListItem from './SongListItem'
import styles from './SongList.module.css'

const SongList = ({ songs, header, artist, playlist }) => {
  const player = useContext(PlayerContext)
  let navigate = useNavigate()

  const setPlaylistHandler = (data) => {
    player.setPlaylist({
      songs: songs,
      index: data.index,
      random: data.random,
    })
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=songs&name=${query}`)
  }

  return (
    <div className={styles.list}>
      {header && <h1 className={styles.header}>{header}</h1>}
      <ShuffleBtn shufflePlaylist={setPlaylistHandler} />
      {songs.map((song, index) => (
        <SongListItem
          key={index}
          index={index}
          song={song}
          artist={artist}
          setPlaylist={setPlaylistHandler}
          playlist={playlist}
        />
      ))}
      {artist && (
        <p
          style={{ textDecoration: 'underline', color: 'black' }}
          onClick={() => {
            handleClickToViewMore(artist)
          }}
        >
          View more
        </p>
      )}
    </div>
  )
}

export default SongList
