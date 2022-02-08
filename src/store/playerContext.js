import React, { useState } from 'react'

export const PlayerContext = React.createContext({
  player: false,
  album: [],
  playlist: {},
  overlay: false,
  songPlaylist: false,
  currentSongPlaying: '',
  youtubePlayer: {},
  startPlaying: () => {},
  stopPlaying: () => {},
  setPlaylist: () => {},
  setOverlay: () => {},
  setSongPlaylists: () => {},
  setCurrentSongPlaying: () => {},
  setYTplayer: () => {},
})

const PlayerCtx = (props) => {
  const [playing, setplaying] = useState(false)
  const [playlist, setplaylist] = useState({})
  const [overlay, setoverlay] = useState(false)
  const [songPlaylist, setsongPlaylist] = useState(false)
  const [currentSongPlaying, setCurrentSongPlaying] = useState('')
  const [ytPlayer, setytPlayer] = useState({})

  const startPlayingHandler = () => {
    setplaying(true)
  }
  const stopPlayingHandler = () => {
    setplaying(false)
  }
  const setPlaylistHandler = (data) => {
    if (data.random) {
      let tempPlaylist = {
        songs: [...data.songs],
        index: data.index,
      }
      var m = tempPlaylist.songs.length,
        t,
        i
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)
        // And swap it with the current element.
        t = tempPlaylist.songs[m]
        tempPlaylist.songs[m] = tempPlaylist.songs[i]
        tempPlaylist.songs[i] = t
      }
      setplaylist(tempPlaylist)
      return
    }
    setplaylist(data)
  }

  const setOverlay = (data) => {
    setoverlay(data)
  }

  const setSongPlaylistHandler = () => {
    setsongPlaylist(!songPlaylist)
  }

  const setCurrentSongPlayingHandler = (data) => {
    setCurrentSongPlaying(data)
  }

  const setYTPlayer = (data) => {
    setytPlayer(data)
  }

  return (
    <PlayerContext.Provider
      value={{
        player: playing,
        playlist: playlist,
        overlay: overlay,
        songPlaylist: songPlaylist,
        currentSongPlaying: currentSongPlaying,
        ytPlayer: ytPlayer,
        startPlaying: startPlayingHandler,
        stopPlaying: stopPlayingHandler,
        setPlaylist: setPlaylistHandler,
        setOverlay: setOverlay,
        setSongPlaylists: setSongPlaylistHandler,
        setCurrentSongPlaying: setCurrentSongPlayingHandler,
        setYTplayer: setYTPlayer,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerCtx
