import styles from './Playlist.module.css'
import React, { useEffect, useState } from 'react'
import PlaylistItem from './PlaylistItem'
import useAuth from '../../hooks/useAuth'
import PlaylistModal from './PlaylistModal'

const Playlists = () => {
  const auth = useAuth()

  const [showModal, setshowModal] = useState(false)
  const [deleteList, setDeleteList] = useState({})
  const [playlists, setplaylists] = useState([])

  useEffect(() => {
    if (!auth.user) return
    setplaylists(auth.user.playlists)
  }, [auth.user])

  const setModalHandler = () => {
    setshowModal((prevModal) => !prevModal)
  }
  const setDeleteListHandler = (data) => {
    setDeleteList(data)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My Playlists</h1>
      {playlists.map((playlist, index) => {
        return (
          <PlaylistItem
            key={index}
            playlist={playlist}
            create={false}
            setModalHandler={setModalHandler}
            setDeleteListHandler={setDeleteListHandler}
          />
        )
      })}
      <PlaylistItem
        create={true}
        setModalHandler={setModalHandler}
        setDeleteListHandler={setDeleteListHandler}
      />
      {showModal && (
        <PlaylistModal
          setModalHandler={setModalHandler}
          deleteList={deleteList}
        />
      )}
    </div>
  )
}

export default Playlists
