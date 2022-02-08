import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ArtistSlider.module.css'
import { getThumbnailUrl } from '../utils/utils'

const ArtistSlider = ({ artists, header }) => {
  const artsistsArray = artists

  const searchTerm = header.substring(
    header.indexOf('"') + 1,
    header.lastIndexOf('"')
  )
  let navigate = useNavigate()

  const handleClick = (query) => {
    navigate(`/artist/${query}`)
  }

  const handleClickToViewMore = (query) => {
    navigate(`/search/show-more?query=artists&name=${query}`)
  }


  return (
    <>
      <div className={s.artistSliderContainer}>

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

        <div className={s.cardsContainer}>
          {artsistsArray.map((ele, index) => {
            return (
              <div
                className={s.artistCard}
                key={index}
                onClick={() => handleClick(ele.browseId)}
              >
                <img src={getThumbnailUrl(ele)} alt="" />
                <h2 className={s.artistTitle} key={index}>
                  {ele.name}
                </h2>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default ArtistSlider
