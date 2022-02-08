import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { HeroImg, SongList, Carousel } from '../../components'
import styles from './ArtistPage.module.css'
import MusicAPIContext from '../../store/musicAPI-context'

import { removeNullFromArray } from '../../components/utils/utils'
import { toast } from 'react-toastify'

const ArtistPage = () => {
  const param = useParams()
  const navigate = useNavigate()
  const musicAPI = useContext(MusicAPIContext)

  const [artist, setArtist] = useState('')
  const [viewMore, setViewMore] = useState(false)
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])


  useEffect(() => {
    const fetchArtist = async () => {

      let res = await musicAPI.search("artist", `${param.id}`)

      const artists = res
      if (artists.error) {
        toast.error(artists.error, {
          autoClose: 3000,
          hideProgressBar: true,
        })
        navigate(-1)
      }

      const songArray = artists?.products['songs']?.content

      setArtist(artists)
      setAlbums(artists.products['albums']?.content)
      setSongs(await fetchMoreDetaliedSongs(songArray))

      //If artist obj from API does not have any songs
      if (songArray?.length <= 0) {
        setSongs(await fetchMoreSongs(artists.name))
      }
    }

    const fetchMoreSongs = async (name) => {

      const res = await musicAPI.search("videos", name.toLowerCase())
      const moreSongs = res.content

      //Returns array with songs
      return moreSongs
    }

    fetchArtist()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id])

  async function fetchMoreDetaliedSongs(songArray) {
    let newSongArr = await Promise.all(
      songArray.map(async (song) => {
        let result = await musicAPI.search("song", song.videoId)
        return result
      })
    )
    return removeNullFromArray(newSongArr)
  }



  return (
    <>
      {artist && (
        <div className={styles.artistpage}>
          <HeroImg
            imgUrl={artist.thumbnails[0].url}
            caption={artist.name}
            url={window.location.href}
          />

          <section className={styles.description}>
            <h1 style={{ paddingBottom: '1rem' }}>About {artist.name}</h1>
            <p
              className={styles.text}
              style={{ height: viewMore ? 'auto' : null }}
            >
              {artist.description ? artist.description : 'No available info'}
            </p>
            <button
              className={styles.button}
              onClick={() => setViewMore(!viewMore)}
            >
              {viewMore ? 'View less' : 'View more'}
            </button>
          </section>

          {songs.length > 0 && (
            <section className={styles.songs}>
              <SongList songs={songs} header={`Songs by  ${artist.name}`} />
            </section>
          )}
          {albums && <Carousel title={'albums'} list={albums} />}
        </div>
      )}
    </>
  )
}

export default ArtistPage
