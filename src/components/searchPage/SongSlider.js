import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './SongSlider.module.css'
import SongListItem from '../songlist/SongListItem'
import { PlayerContext } from '../../store/playerContext'
import PlayBtn from '../songlist/PlayBtn'

const SongSlider = ({ songs, header }) => {
  const songsArray = songs
  const searchTerm = header.substring(
    header.indexOf('"') + 1,
    header.lastIndexOf('"')
  )
  let navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/artist/${query}`, { replace: true })
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=songs&name=${query}`, { replace: true })
  }

  return (
    <>
      <div className={s.songSliderContainer}>
        <h1>{header}</h1>
        <div className={s.cardsContainer}>
          {songsArray.map((song, index) => {
            return (
              <div className={s.songCard} key={index}>
                <h2 className={s.songTitle}>
                  {song.name.substring(0, 20)}{' '}
                  {song.name.length > 20 ? '...' : ''}
                </h2>
                <PlayBtn songs={songs} index={index} />
              </div>
            )
          })}
          <p
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              handleClickToViewMore(searchTerm)
            }}
          >
            View more
          </p>
        </div>
      </div>
    </>
  )
}

export default SongSlider
