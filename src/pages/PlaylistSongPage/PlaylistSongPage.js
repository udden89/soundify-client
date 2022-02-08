import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { SongList } from '../../components'
import styles from './PlaylistSongPage.module.css'
import useAuth from '../../hooks/useAuth'

const PlaylistSongPage = () => {
  const [playlist, setPlaylist] = useState([])
  const [loading, setloading] = useState(true)

  const auth = useAuth()
  let param = useParams()

  useEffect(() => {
    setloading(true)
    if (!auth.user) return

    let playlists = auth.user.playlists
    for (let list of playlists) {
      if (list._id === param.id) setPlaylist(list)
    }
    setloading(false)
  }, [auth.user])

  return (
    <>
      {
        <div className={styles.container}>
          {/* <h1 className={styles.header}>{playlist.playlist_name}</h1> */}
          {!loading && playlist.songs?.length > 0 ? (
            <SongList
              songs={playlist.songs.slice(0, playlist.songs.length)}
              header={playlist.playlist_name}
              playlist={true}
            />
          ) : (
            <h1 className={styles.noSongs}>No songs here!</h1>
          )}
        </div>
      }
    </>
  )
}

export default PlaylistSongPage
