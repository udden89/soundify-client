import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carousel.module.css'
import './Carousel.css'
import CarouselItem from './carouselItem/CarouselItem'

const Carousel = ({ title, list }) => {
  const setSlidesToShow = () => {
    if (list.length > 5) return 5
    return list.length
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: setSlidesToShow(),
    swipeToSlide: list.length < 5 ? false : true,
    arrows: false,
  }

  const ItemSlider = () => {
    return (
      <Slider {...settings} className={styles.carousel}>
        {list &&
          list.map((item, index) => (
            <CarouselItem
              key={index}
              imgUrl={
                item.thumbnails[0]
                  ? item.thumbnails[0].url
                  : item.thumbnails.url
              }
              item={item}
            />
          ))}
      </Slider>
    )
  }

  return (
    <div className={styles.carousel}>
      <h1 style={{ color: 'black' }}>{title}</h1>
      {list ? <ItemSlider /> : ''}
    </div>
  )
}

export default Carousel
