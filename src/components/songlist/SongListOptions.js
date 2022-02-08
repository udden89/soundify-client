import React, { useState, useEffect, useContext } from 'react'
import { PlayerContext } from '../../store/playerContext'
import styles from './SongListOption.module.css'
import SongListModal from './SonglistModal'

const SongListOption = (props) => {
  const [modal, setmodal] = useState(false)
  const modalOverlay = useContext(PlayerContext)

  useEffect(() => {
    if (modalOverlay.overlay === false) {
      setmodal(false)
    }
  }, [modalOverlay.overlay])

  const setModalHandler = () => {
    modalOverlay.setOverlay(true)
    setmodal(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <i className='fas fa-ellipsis-v' onClick={setModalHandler}></i>
      </div>
      {modal && (
        <SongListModal
          song={props.song}
          playlist={props.playlist}
          index={props.index}
        />
      )}
    </div>
  )
}

export default SongListOption
