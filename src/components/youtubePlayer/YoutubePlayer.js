import React, { useEffect, useState, useRef, useContext } from 'react'
import styles from './YoutubePlayer.module.css'
import YouTube from 'react-youtube'
import { PlayerContext } from '../../store/playerContext'

const YoutubePlayer = () => {
  const context = useContext(PlayerContext)

  const progressBar = useRef(null)

  const [playing, setplaying] = useState(false)
  const [player, setplayer] = useState(null)
  const [hide, sethide] = useState(false)
  const [endTime, setendTime] = useState('0:00')
  const [startTime, setstartTime] = useState('0:00')
  const [doneProgress, setdoneProgress] = useState('')

  const [song, setsong] = useState(null)
  const [index, setindex] = useState(0)
  const [playlist, setplaylist] = useState([])

  let checkTime

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    if (!context.playlist.songs) return
    const { songs, index } = context.playlist

    setindex(index)
    setplaylist(songs)
    setsong(songs[index])
  }, [context.playlist])

  const setTimes = () => {
    clearInterval(checkTime)
    checkTime = setInterval(() => {
      if (player.getCurrentTime() === null) return

      setstartTime(
        getTime(player.getCurrentTime()) ||
          player.getCurrentTime() === undefined
      )
      setdoneProgress(
        (player.getCurrentTime() / player.getDuration()) * 100 + '%'
      )
    }, 500)
  }

  const setCurrentSong = (data) => {
    context.setCurrentSongPlaying(data)
  }

  const onPlayerReady = (event) => {
    event.target.pauseVideo()
    setplayer(event.target)
    context.setYTplayer(event.target)
  }

  const onChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setCurrentSong('')
      setplaying(false)
      return nextSong()
    }
    if (event.data === window.YT.PlayerState.PAUSED) {
      setCurrentSong('')
      setplaying(false)
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      setCurrentSong(song.videoId)
      setplaying(true)
    }
    setTimes()
    setendTime(getTime(event.target.getDuration()))
  }

  //Change to next song
  const nextSong = () => {
    if (index + 1 >= playlist.length) {
      setindex((prevIndex) => prevIndex - (playlist.length - 1))
      player.loadVideoById(playlist[0].videoId)
      setsong(playlist[0])
      return
    }

    player.loadVideoById(playlist[index + 1].videoId)
    setsong(playlist[index + 1])
    setindex((prevIndex) => prevIndex + 1)
  }

  //Change to prev song
  const prevSong = () => {
    if (index - 1 < 0) {
      setindex((prevIndex) => prevIndex + (playlist.length - 1))
      player.loadVideoById(playlist[playlist.length - 1].videoId)
      setsong(playlist[playlist.length - 1])
      return
    }

    player.loadVideoById(playlist[index - 1].videoId)
    setsong(playlist[index - 1])
    setindex((prevIndex) => prevIndex - 1)
  }

  //Sets the time for the progress bar
  const getTime = (secondsTotal) => {
    var totalSec = secondsTotal
    var minutes = parseInt(totalSec / 60) % 60
    var seconds = Math.ceil(totalSec % 60)

    return (
      (minutes < 1 ? '0' : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  //Pause the player
  const pausePlayer = () => {
    player.pauseVideo()
  }

  //Start the player
  const startPlayer = () => {
    player.playVideo()
  }

  //Change time on song with progress bar
  function changedSongTime(e) {
    let coordStart = progressBar.current.getBoundingClientRect().left
    let coordEnd = e.pageX
    let percent = (coordEnd - coordStart) / progressBar.current.offsetWidth

    return player.getDuration() * percent
  }

  const changeTime = (e) => {
    player.seekTo(changedSongTime(e), true)
  }

  const hideOrShow = () => {
    sethide(!hide)
  }
  const hidecss = () => {
    let css = {}
    if (hide) {
      css = {
        top: 'calc(100vh - 15px)',
        height: '16px',
        padding: '6px 5px',
        border: 'none',
        alignSelf: 'center',
        justifySelf: 'center',
      }
    }
    return css
  }

  const hideContent = () => {
    let css = {}
    if (hide) {
      css = {
        display: 'none',
      }
    }
    return css
  }

  return (
    <>
      {song ? (
        <div className={styles.playerContainer} style={hidecss()}>
          <YouTube
            videoId={song.videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onChange}
          />

          <div className={styles.hide} onClick={hideOrShow}>
            {!hide && <i className='fas fa-chevron-down'></i>}
            {hide && <i className='fas fa-chevron-up'></i>}
          </div>
          <div className={styles.songContent} style={hideContent()}>
            <div className={styles.songContainer}>
              <img
                className={styles.img}
                src={
                  song.thumbnails?.url
                    ? song.thumbnails?.url
                    : song.thumbnails[0]?.url
                }
                alt=''
              />

              <div className={styles.name}>
                <p className={styles.artistName}>
                  {song.artist?.name?.substring(0, 20)}
                </p>
                <p className={styles.songName}>{song?.name.substring(0, 20)}</p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.next}>
                <i className='fas fa-step-backward' onClick={prevSong}></i>
              </button>

              {playing && (
                <button className={styles.next} onClick={pausePlayer}>
                  <i className='fas fa-pause'></i>
                </button>
              )}
              {!playing && (
                <button className={styles.next} onClick={startPlayer}>
                  <i className='fas fa-play'></i>
                </button>
              )}

              <button className={styles.next} onClick={nextSong}>
                <i className='fas fa-step-forward'></i>
              </button>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <p>{startTime}</p>
            <div
              className={styles.progressBar}
              ref={progressBar}
              onClick={changeTime}
            >
              <div
                className={styles.progressBarDone}
                style={{ width: doneProgress }}
              ></div>
            </div>
            <p>{endTime}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default YoutubePlayer
