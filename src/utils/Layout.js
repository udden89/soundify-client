import React, { useContext, useState } from 'react'
import { YoutubePlayer, Sidebar, Header } from '../components'
import { PlayerContext } from '../store/playerContext'

const Layout = (props) => {
  const [sidebar, setsidebar] = useState(false)
  const player = useContext(PlayerContext)

  const showSidebar = () => {
    setsidebar(!sidebar)
  }

  return (
    <div className='layout'>
      <Header showSidebar={showSidebar} />
      <Sidebar hideSidebar={showSidebar} animation={sidebar} />
      {player && <YoutubePlayer />}
      {player.overlay && (
        <div className='overlay' onClick={() => player.setOverlay(false)}></div>
      )}
      <main className='main'>{props.children}</main>
    </div>
  )
}

export default Layout
