import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CarouselItem.module.css'

const CarouselItem = ({ imgUrl, item }) => {
  let navigate = useNavigate()

  const itemHandler = () => {
    switch (item.type.toLowerCase()) {
      case 'album': {
        navigate(`/artist/${item.name.toLowerCase()}/album/${item.browseId}`)
        break
      }
      case 'artist': {
        navigate(`/artist/${item.browseId}`)
        break
      }
      case 'ep': {
        navigate(`/artist/${item.name.toLowerCase()}/album/${item.browseId}`)
        break
      }
    }
  }

  return (
    <figure className={styles.figure} onClick={itemHandler}>
      <img className={styles.img} src={imgUrl} alt='' />
    </figure>
  )
}

export default CarouselItem
