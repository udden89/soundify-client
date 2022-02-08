import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { HeroImg, SongList } from '../../components'
import { getThumbnailUrl, removeNullFromArray } from '../../components/utils/utils'
import styles from './ArtistPage.module.css'

const AlbumPage = () => {
  const param = useParams()
  const navigate = useNavigate()

  const [album, setAlbum] = useState(null)
  const [albumSongs, setalbumSongs] = useState([])

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(
        `https://yt-music-api.herokuapp.com/api/yt/album/${param.browseId}`
      )
      const newAlbum = await response.json()
      if (newAlbum?.error) {
        navigate(-1)
      }
      setAlbum(newAlbum)
      setalbumSongs(await fetchMoreDetaliedSongs(newAlbum.tracks))
    }

    fetchAlbum()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id])

  async function fetchMoreDetaliedSongs(songArray) {
    let newSongArr = await Promise.all(
      songArray.map(async (song) => {
        let url =
          'https://yt-music-api.herokuapp.com/api/yt/song/' + song.videoId
        let result = await fetch(url)
        return result.json()
      })
    )
    return removeNullFromArray(newSongArr)
  }

  return (
    <>
      {album && (
        <div className={styles.artistpage}>
          <HeroImg
            imgUrl={getThumbnailUrl(album)}
            caption={album.title}
            url={window.location.href}
          />
          <section className={styles.songs}>
            <SongList
              header={album.title}
              songs={albumSongs.slice(0, albumSongs.length)}
            />
          </section>
        </div>
      )}
    </>
  )
}

export default AlbumPage
