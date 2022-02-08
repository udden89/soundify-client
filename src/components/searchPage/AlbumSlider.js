import React from 'react'
import { useNavigate } from "react-router-dom"
import { getThumbnailUrl } from '../utils/utils'
import s from './AlbumSlider.module.css'

const AlbumSlider = ({ albums, header }) => {
  const albumsArray = albums
  const searchTerm = header.substring(
    header.indexOf('"') + 1,
    header.lastIndexOf('"')
  )
  let navigate = useNavigate()

  const handleClick = (album) => {
    navigate(`/artist/${album.artist.toLowerCase()}/album/${album.browseId}`)
  }
  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=albums&name=${query}`)
  }

  return (
    <>
      <div className={s.albumSliderContainer}>
        <div className={s.header}>
          <h1>{header}</h1>
          <p
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              handleClickToViewMore(searchTerm)
            }}
          >
            View more
          </p></div>
        {albumsArray && <div className={s.cardsContainer}>
          {albumsArray.map((album, index) => {
            return (

              <div className={s.albumCard} key={index} onClick={() => handleClick(album)} >
                <img src={getThumbnailUrl(album)} alt="" />
                <h2 className={s.albumTitle} key={album.name + index}>{album.name}</h2>
              </div>)
          })}
        </div>}
      </div>
    </>
  )
}

export default AlbumSlider
