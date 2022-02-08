import React, { useState } from 'react'
import styles from './PlaylistModal.module.css'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'

const PlaylistModal = ({ setModalHandler, deleteList }) => {
  const [name, setname] = useState('')
  const auth = useAuth()
  let doesTheNameExist = false

  const addPlaylist = async () => {
    playlistNameCheck(name)
    if (doesTheNameExist === true) {
      return toast.error('Playlist already exists', {
        autoClose: 2500,
        hideProgressBar: true,
      })
    } else {
      const result = fetch('/api/playlist/createplaylist', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ playlist_name: name }),
      })
        .then((data) => data.json())
        .then((data) => {
          auth.setUserHandler(data)
        })

      toast.success('Playlist added!', {
        autoClose: 2500,
        hideProgressBar: true,
      })
      setModalHandler()
    }
  }

  const playlistNameCheck = async (playlist_name) => {
    let userPlaylists = auth.user.playlists
    userPlaylists.forEach((playlist) => {
      if (playlist.playlist_name === playlist_name) {
        return (doesTheNameExist = true)
      }
    })
  }

  const deletePlaylist = async () => {
    let res = await fetch(`/api/playlist/deleteplaylist/${deleteList.id}`, {
      method: 'DELETE',
    })
    let resp = await res.json()
    auth.updateUserPlaylist(resp.id)
    setModalHandler()
    toast.info('Playlist deleted', {
      autoClose: 2500,
      hideProgressBar: true,
      theme: 'dark',
    })
  }

  const DeleteList = () => {
    return (
      <div
        className={styles.form}
        style={{ height: '10rem', gridTemplateRows: 'auto' }}
      >
        <label className={styles.label}>Confirm delete</label>
        <div className={styles.btnContainer}>
          <button className={styles.delete} onClick={deletePlaylist}>
            Confirm
          </button>
          <button className={styles.cancel} onClick={() => setModalHandler()}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => setModalHandler()}></div>
      {!deleteList.delete && (
        <div className={styles.form}>
          <label className={styles.label}>New playlist</label>
          <input
            className={`${styles.input} ${styles.inputFocus}`}
            type='text'
            placeholder='enter name'
            value={name}
            onChange={(event) => setname(event.target.value)}
          />
          <button className={styles.button} onClick={addPlaylist}>
            Confirm
          </button>
        </div>
      )}
      {deleteList.delete && <DeleteList />}
    </>
  )
}

export default PlaylistModal
