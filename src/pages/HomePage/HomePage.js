import { HeroImg, MostPlayed, Carousel } from '../../components'
import styles from './HomePage.module.css'
import React, { useState, useEffect } from 'react'

const HomePage = () => {
  const [artistTop, setArtistTop] = useState([])
  const [albumTop, setAlbumTop] = useState([])

  useEffect(() => {
    fetchRandomArtists()
    fetchRandomAlbums()
  }, [])

  const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const fetchRandomArtists = async () => {
    let artists = ['Ed Sheeran', 'Dua Lipa', 'Queen', 'Metallica', 'Coldplay']
    let artist = getRandomValue(artists)

    let res = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/artists/' + artist
    )
    res = await res.json()
    setArtistTop(res.content)
  }

  const fetchRandomAlbums = async () => {
    let albums = [
      'Greatest Hits',
      'Nevermind',
      'Back to Black',
      'AM',
      'Dark Side of the Moon',
      '30',
    ]
    let album = getRandomValue(albums)

    let res = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/albums/' + album
    )
    res = await res.json()
    setAlbumTop(res.content)
  }

  return (
    <>
      <div className={styles.homepage}>
        <HeroImg
          imgUrl={
            'https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg?size=626&ext=jpg'
          }
          size={'big'}
          caption={'Landing page'}
        />

        <MostPlayed />
        {artistTop && (
          <Carousel title={'Artists to check out'} list={artistTop} />
        )}
        {albumTop && <Carousel title={'Albums to check out'} list={albumTop} />}
      </div>
    </>
  )
}

export default HomePage
